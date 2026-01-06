
import React, { useState, useRef, useEffect } from 'react';
import { getTravelRecommendation } from '../geminiService';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// Audio Helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'KO', name: '한국어' },
  { code: 'AR', name: 'العربية' },
  { code: 'BN', name: 'Bengali' },
  { code: 'HI', name: 'Hindi' },
  { code: 'UR', name: 'Urdu' },
  { code: 'RU', name: 'Russian' },
  { code: 'DE', name: 'German' },
  { code: 'FR', name: 'French' },
  { code: 'VI', name: 'Vietnamese' },
  { code: 'TH', name: 'Thai' },
  { code: 'JA', name: 'Japanese' },
  { code: 'ID', name: 'Indonesian' }
];

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [input, setInput] = useState('');
  const [selectedVoiceLang, setSelectedVoiceLang] = useState('EN');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Welcome to Afsheen Enterprise. I am your specialized digital concierge. How may I assist you in building your dream journey through Korea today?" }
  ]);
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<any>(null);
  const audioContextsRef = useRef<{ input?: AudioContext, output?: AudioContext }>({});
  const nextStartTimeRef = useRef(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const stopVoice = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (audioContextsRef.current.input) {
      audioContextsRef.current.input.close();
      audioContextsRef.current.input = undefined;
    }
    if (audioContextsRef.current.output) {
      audioContextsRef.current.output.close();
      audioContextsRef.current.output = undefined;
    }
    activeSourcesRef.current.forEach(s => s.stop());
    activeSourcesRef.current.clear();
    setIsVoiceActive(false);
  };

  const startVoice = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextsRef.current = { input: inCtx, output: outCtx };
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: `You are a luxury concierge for Afsheen Enterprise. Respond primarily in ${LANGUAGES.find(l => l.code === selectedVoiceLang)?.name || 'English'}. Be polite, helpful, and provide travel advice about South Korea.`,
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsVoiceActive(true);
            const source = inCtx.createMediaStreamSource(stream);
            const scriptProcessor = inCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(audioData), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outCtx.destination);
              source.addEventListener('ended', () => activeSourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              activeSourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(s => s.stop());
              activeSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            // Handle Transcriptions for the UI
            if (message.serverContent?.inputTranscription) {
               // We could append these live, but for simplicity we wait for turn complete or just show transcription as an AI hint
            }
          },
          onerror: (e) => {
            console.error('Live API Error:', e);
            stopVoice();
          },
          onclose: () => {
            stopVoice();
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start voice:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    const response = await getTravelRecommendation(userMessage);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[450px] h-[600px] bg-brand-navy rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,240,255,0.1)] border border-brand-cyan/20 overflow-hidden flex flex-col animate-fade-in-up">
          {/* Header */}
          <div className="bg-[#020617] text-white p-7 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="size-10 bg-brand-gold rounded-full flex items-center justify-center shadow-lg border border-white/20">
                <span className="material-symbols-outlined text-brand-navy text-lg">flight_takeoff</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-base tracking-tight">Afsheen Concierge</h4>
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full animate-pulse ${isVoiceActive ? 'bg-red-500' : 'bg-brand-cyan'}`} />
                  <span className="text-[10px] opacity-70 uppercase tracking-widest font-black">
                    {isVoiceActive ? 'Live Voice Active' : 'Online Specialist'}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={() => { stopVoice(); setIsOpen(false); }} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Voice Settings Overlay */}
          {!isVoiceActive && (
            <div className="bg-white/5 px-7 py-3 flex items-center justify-between border-b border-white/5">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Voice Language</label>
              <select 
                value={selectedVoiceLang}
                onChange={(e) => setSelectedVoiceLang(e.target.value)}
                className="bg-transparent border-none text-[10px] text-brand-cyan font-bold outline-none cursor-pointer"
              >
                {LANGUAGES.map(l => <option key={l.code} value={l.code} className="bg-brand-navy">{l.name}</option>)}
              </select>
            </div>
          )}

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-7 space-y-6 custom-scrollbar bg-brand-navy/50 relative ${isVoiceActive ? 'opacity-30 blur-sm pointer-events-none' : ''}`}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed shadow-xl
                  ${msg.role === 'user' 
                    ? 'bg-brand-gold text-brand-navy rounded-tr-none font-bold' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none font-light'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none flex gap-2">
                  <div className="size-2 bg-brand-cyan/50 rounded-full animate-bounce" />
                  <div className="size-2 bg-brand-cyan/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="size-2 bg-brand-cyan/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Visualization Overlay */}
          {isVoiceActive && (
            <div className="absolute inset-x-0 top-32 bottom-24 flex flex-col items-center justify-center z-10 p-10 text-center animate-fade-in-up">
              <div className="size-32 rounded-full border-4 border-brand-cyan/20 flex items-center justify-center relative mb-8">
                 <div className="absolute inset-0 rounded-full border-4 border-brand-cyan animate-ping opacity-20" />
                 <span className="material-symbols-outlined text-5xl text-brand-cyan animate-pulse">mic</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Listening...</h3>
              <p className="text-sm text-gray-400 font-light mb-8">Speak naturally to our executive concierge in your preferred language.</p>
              <button 
                onClick={stopVoice}
                className="px-8 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-xl"
              >
                End Voice Session
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-6 bg-[#020617] border-t border-white/10">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inquire or use Voice command..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan outline-none transition-all"
                  disabled={isVoiceActive}
                />
              </div>
              <button 
                type="button"
                onClick={isVoiceActive ? stopVoice : startVoice}
                className={`size-12 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-95
                  ${isVoiceActive ? 'bg-red-500 text-white' : 'bg-brand-navy border border-white/10 text-brand-cyan hover:border-brand-cyan/50'}`}
              >
                <span className="material-symbols-outlined">{isVoiceActive ? 'mic_off' : 'mic'}</span>
              </button>
              <button 
                type="submit" 
                disabled={loading || isVoiceActive}
                className="size-12 bg-brand-cyan text-brand-navy rounded-2xl flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 shadow-xl"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`size-18 rounded-full flex items-center justify-center text-brand-navy shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-4 border-white/10
          ${isOpen ? 'bg-white' : 'bg-brand-cyan'}`}
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'close' : 'airplane_ticket'}
        </span>
      </button>
    </div>
  );
};
