
import React, { useState } from 'react';
import { PageView } from '../App';

interface ContactPageProps {
  setView: (view: PageView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ setView }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    cellNumber: '',
    nationality: '',
    email: '',
    dob: '',
    message: ''
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulation of Backend SMS/WhatsApp/Email dispatch
    setTimeout(() => {
      setStatus('success');
    }, 2500);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-navy px-6 animate-fade-in-up">
        <div className="max-w-xl w-full text-center bg-white/5 p-16 rounded-[4rem] border border-brand-cyan/20">
          <span className="material-symbols-outlined text-8xl text-brand-cyan mb-8">mark_email_read</span>
          <h2 className="text-4xl font-display font-bold text-white mb-6">Inquiry Dispatched.</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Mr. Reza Abu Sayed has been notified via <b>WhatsApp</b> and <b>KakaoTalk</b>. 
            A detailed briefing has also been sent to our executive email queue. 
            Expect a response within 2 hours.
          </p>
          <button onClick={() => setView('home')} className="h-14 px-10 bg-brand-cyan text-brand-navy font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up bg-[#020617]">
      {/* AIDA: ATTENTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 grayscale" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=2000')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 text-center px-6">
          <span className="text-brand-gold font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Executive Concierge Direct</span>
          <h1 className="text-white text-6xl md:text-8xl font-display font-bold tracking-tighter mb-4">Secure Your Legacy.</h1>
          <p className="text-gray-400 max-w-xl mx-auto font-light text-lg">Your inquiry triggers an immediate priority alert to our leadership team.</p>
        </div>
      </section>

      {/* AIDA: INTEREST & DESIRE */}
      <section className="py-24 px-6 md:px-24 bg-white text-brand-navy">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-4xl font-display font-bold mb-8">Why Inquire with Afsheen?</h2>
            <div className="space-y-12">
              {[
                { title: "Direct CEO Link", desc: "Every submission generates an encrypted SMS notification directly to the CEO via WhatsApp and KakaoTalk.", icon: "cell_tower" },
                { title: "Official KTO Verification", desc: "We cross-reference all logistical inquiries with official Korea Tourism Organization data for 100% accuracy.", icon: "verified" },
                { title: "2-Hour Response SLA", desc: "Our prestige clients receive responses within 120 minutes of successful submission.", icon: "bolt" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="material-symbols-outlined text-brand-gold text-4xl shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                    <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 p-8 bg-brand-navy rounded-3xl text-white">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-4">System Status</p>
              <div className="flex items-center gap-4">
                <div className="size-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-light">Notification Bridge: ACTIVE (Kakao, WA, SMTP)</span>
              </div>
            </div>
          </div>

          {/* AIDA: ACTION (THE FORM) */}
          <div className="bg-[#F9FAFB] p-10 md:p-16 rounded-[4rem] border border-gray-100 shadow-2xl relative">
            <div className="absolute -top-6 left-12 bg-brand-gold text-brand-navy px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
              Official Inquiry Portal
            </div>
            
            <form className="space-y-8" onSubmit={handleInquirySubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. John Doe"
                    className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 focus:ring-2 focus:ring-brand-cyan outline-none transition-all placeholder:text-gray-300" 
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Cell Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+82 10-0000-0000"
                    className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 focus:ring-2 focus:ring-brand-cyan outline-none transition-all placeholder:text-gray-300" 
                    onChange={(e) => setFormData({...formData, cellNumber: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Nationality</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. United States"
                    className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 focus:ring-2 focus:ring-brand-cyan outline-none transition-all placeholder:text-gray-300" 
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Date of Birth</label>
                  <input 
                    required
                    type="date" 
                    className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 focus:ring-2 focus:ring-brand-cyan outline-none transition-all" 
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Email Identity</label>
                <input 
                  required
                  type="email" 
                  placeholder="email@example.com"
                  className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 focus:ring-2 focus:ring-brand-cyan outline-none transition-all placeholder:text-gray-300" 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Consultation Request</label>
                <textarea 
                  required
                  className="w-full h-40 bg-white border border-gray-200 rounded-3xl p-6 focus:ring-2 focus:ring-brand-cyan outline-none transition-all resize-none placeholder:text-gray-300" 
                  placeholder="Describe your desired luxury experience or logistical challenge..."
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full h-20 bg-brand-navy text-white font-black uppercase tracking-widest rounded-3xl hover:bg-brand-gold hover:text-brand-navy transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 group"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Dispatching Notifications...
                  </>
                ) : (
                  <>
                    Submit Final Inquiry
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">send</span>
                  </>
                )}
              </button>

              <p className="text-[9px] text-gray-400 text-center leading-relaxed font-light px-8">
                By submitting, you agree to our <b>Executive Data Protocol</b>. Your information is encrypted and transmitted directly to secure mobile gateways.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
