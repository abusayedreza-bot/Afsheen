
import React, { useState, useRef, useEffect } from 'react';
import { getExpertConsultation } from '../geminiService';
import { PageView } from '../App';

interface ConsultingHubProps {
  setView: (view: PageView) => void;
}

const SUGGESTIONS = [
  "How to get from Incheon to Busan by KTX? Show prices and booking links.",
  "What is the best time to visit Jeju for hiking? Detail the climate.",
  "Compare 5-star vs Hanok stay pricing in Seoul.",
  "Give me a detailed history of the Joseon Dynasty Gyeongbokgung palace.",
  "Rent a car in Korea: Guide for international drivers and top sites.",
  "Which ferry goes from Busan to Tsushima/Fukuoka? Prices & sites."
];

export const ConsultingHub: React.FC<ConsultingHubProps> = ({ setView }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { 
      role: 'ai', 
      text: "# Welcome to the Afsheen Super-Brain\n\nI am your unified intelligence portal for South Korean heritage, logistics, and prestige travel. \n\nI have integrated search grounding and reasoning capabilities to provide you with:\n\n*   **Logistics:** Precise ticket pricing and direct booking links.\n*   **History:** Deep dives into Korean biography and ancient architecture.\n*   **Planning:** Optimized timelines for every region.\n\nHow can I build your dream today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const onSend = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await getExpertConsultation(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-navy pt-24 flex flex-col items-center animate-fade-in-up">
      <div className="w-full max-w-6xl px-6 flex flex-col h-[calc(100vh-120px)]">
        
        {/* Header Branding */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter">
              AI <span className="text-brand-cyan">Consulting Hub</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-black">Powered by Afsheen Super-Brain (V3.0 Pro)</p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-black uppercase tracking-widest">
            <span className="text-brand-gold">Search Grounding: Active</span>
            <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-white/5 rounded-[2.5rem] border border-white/10 p-8 space-y-8 custom-scrollbar mb-6 backdrop-blur-md"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] md:max-w-[75%] p-6 rounded-[2rem] text-sm md:text-base leading-relaxed shadow-2xl
                ${msg.role === 'user' 
                  ? 'bg-brand-gold text-brand-navy rounded-tr-none font-bold' 
                  : 'bg-[#0F172A] border border-brand-cyan/10 text-gray-200 rounded-tl-none font-light'}`}
              >
                {/* Simplified markdown simulation for common headers/lists */}
                <div className="prose prose-invert max-w-none prose-sm">
                  {msg.text.split('\n').map((line, li) => {
                    if (line.startsWith('# ')) return <h1 key={li} className="text-2xl font-bold mb-4 text-brand-cyan">{line.replace('# ', '')}</h1>;
                    if (line.startsWith('## ')) return <h2 key={li} className="text-xl font-bold mb-3 text-brand-gold">{line.replace('## ', '')}</h2>;
                    if (line.startsWith('* ')) return <li key={li} className="ml-4 mb-1 list-disc">{line.replace('* ', '')}</li>;
                    return <p key={li} className="mb-2">{line}</p>;
                  })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#0F172A] border border-brand-cyan/20 p-6 rounded-[2rem] rounded-tl-none flex flex-col gap-4 min-w-[200px]">
                <div className="flex gap-2">
                  <div className="size-2 bg-brand-cyan rounded-full animate-bounce" />
                  <div className="size-2 bg-brand-cyan rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="size-2 bg-brand-cyan rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest animate-pulse">Consulting Super-Brain Data Streams...</p>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {SUGGESTIONS.map((s, idx) => (
            <button 
              key={idx}
              onClick={() => onSend(s)}
              className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-white/5 border border-white/10 rounded-full text-brand-cyan hover:bg-brand-cyan hover:text-brand-navy transition-all active:scale-95"
            >
              {s.length > 40 ? s.substring(0, 40) + '...' : s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); onSend(input); }}
          className="relative mb-10"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Query history, logistics, or real-time ticket information..."
            className="w-full h-20 bg-white/5 border border-white/10 rounded-[2.5rem] px-10 text-white focus:ring-2 focus:ring-brand-cyan outline-none transition-all pr-32 font-light"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-4 top-4 bottom-4 px-8 bg-brand-cyan text-brand-navy rounded-[2rem] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
          >
            Ask AI
          </button>
        </form>
      </div>
    </div>
  );
};
