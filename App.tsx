
import React, { useState, useEffect } from 'react';
import { JOURNEYS, GOURMET, CULTURE, STAYS, STATS_DATA, TRUSTED_PLATFORMS, APP_BENEFITS, SEOUL_SPOTS, KOREA_SPOTS, DOMESTIC_SPOTS } from './constants';
import { ExperienceCard } from './components/ExperienceCard';
import { AIAssistant } from './components/AIAssistant';
import { ConsultingHub } from './components/ConsultingHub';
import { TravelMap } from './components/TravelMap';
import { VisitKoreaHub } from './components/VisitKoreaHub';
import { ContactPage } from './components/ContactPage';

export type PageView = 'home' | 'journeys' | 'gourmet' | 'culture' | 'stays' | 'seoul' | 'korea' | 'domestic' | 'contact' | 'consulting' | 'map' | 'visitkorea';

const App: React.FC = () => {
  const [view, setView] = useState<PageView>('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderHome = () => (
    <div className="animate-fade-in-up">
      {/* 1. ATTENTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] scale-105"
          style={{ 
            backgroundImage: `linear-gradient(rgba(5, 11, 23, 0.6), rgba(5, 11, 23, 0.9)), url("https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&q=80&w=2000")`
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <span className="text-brand-gold font-black uppercase tracking-[0.4em] text-[11px] mb-8 block">Authorized Luxury Concierge</span>
          <h1 className="text-white text-5xl md:text-8xl font-display font-bold leading-[1.1] tracking-tighter mb-10">
            Afsheen Enterprise. <br />
            <span className="logo-gradient-text italic font-normal">Build your dream with us.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-2xl font-light max-w-2xl mx-auto mb-14 leading-relaxed">
            Harness the power of our AI Super-Brain. Expert consulting for history, logistics, and real-time interactive mapping across the Korean peninsula.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => setView('visitkorea')} className="h-16 px-14 bg-brand-gold text-brand-navy font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] active:scale-95">
              Visit Korea Guide
            </button>
            <button onClick={() => setView('map')} className="h-16 px-14 border border-brand-cyan/40 text-brand-cyan font-black uppercase tracking-widest rounded-2xl hover:bg-brand-cyan/10 transition-all active:scale-95">
              Interactive Map
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTEREST */}
      <section className="py-24 px-6 md:px-24 bg-white text-charcoal text-center">
         <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-12">Universal Travel Support</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {[
              { icon: 'hotel', label: 'Luxury Stays' },
              { icon: 'mosque', label: 'Halal & Prayer' },
              { icon: 'restaurant', label: '24h Dining' },
              { icon: 'local_hospital', label: 'Medical' },
              { icon: 'local_police', label: 'Security' },
              { icon: 'map', label: 'Hidden Gems' }
            ].map((item) => (
              <div key={item.label} className="p-6 rounded-3xl bg-gray-50 hover:bg-brand-navy hover:text-white transition-all cursor-pointer group">
                <span className="material-symbols-outlined text-4xl mb-3 block text-brand-gold group-hover:text-brand-cyan">{item.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
         </div>
      </section>
    </div>
  );

  const renderCategoryPage = (title: string, data: any[], statsKey: string, heroImg: string, tagline: string) => (
    <div className="animate-fade-in-up">
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(5, 11, 23, 0.7), rgba(5, 11, 23, 0.9)), url("${heroImg}")` }} />
        <div className="relative z-10 text-center px-6">
          <span className="text-brand-gold font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">{tagline}</span>
          <h1 className="text-white text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8">{title}</h1>
          <div className="w-24 h-px bg-brand-cyan mx-auto" />
        </div>
      </section>
      
      <div className="bg-white py-12 px-6 md:px-24 border-b border-gray-100 text-brand-navy">
        <div className="max-w-7xl mx-auto flex justify-center gap-16 md:gap-32">
          {STATS_DATA[statsKey].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-5xl font-display font-bold text-brand-navy mb-1">{s.value}</p>
              <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="py-24 px-6 md:px-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto space-y-16">
          {data.map((exp, idx) => (
            <ExperienceCard key={exp.id} experience={exp} index={idx + 1} />
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-navy text-white selection:bg-brand-cyan/20">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 flex items-center justify-between ${isScrolled || view !== 'home' ? 'bg-brand-navy/95 backdrop-blur-xl border-b border-white/10 shadow-xl' : 'bg-transparent'}`}>
        <div className="flex items-center gap-8">
           <button onClick={() => setView('home')} className="text-[14px] font-display font-bold tracking-tight text-white hover:text-brand-cyan transition-colors">AFSHEEN ENTERPRISE</button>
           <nav className="hidden lg:flex items-center gap-8">
             {[
               { id: 'visitkorea', label: 'Visit Korea' },
               { id: 'map', label: 'Travel Map' },
               { id: 'consulting', label: 'Consulting' },
               { id: 'seoul', label: 'Seoul' },
               { id: 'domestic', label: '구석구석' }
             ].map((item) => (
               <button key={item.id} onClick={() => setView(item.id as PageView)} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors hover:text-brand-cyan ${view === item.id ? 'text-brand-cyan' : 'text-white/60'}`}>
                 {item.label}
               </button>
             ))}
           </nav>
        </div>
        
        <button onClick={() => setView('contact')} className="h-12 px-8 border border-brand-gold/30 hover:border-brand-cyan hover:text-brand-cyan transition-all rounded-full text-white text-[10px] font-black uppercase tracking-widest active:scale-95">
          Inquire Now
        </button>
      </header>

      <main>
        {view === 'home' && renderHome()}
        {view === 'visitkorea' && <VisitKoreaHub />}
        {view === 'map' && <TravelMap />}
        {view === 'consulting' && <ConsultingHub setView={setView} />}
        {view === 'domestic' && renderCategoryPage('대한민국 구석구석', DOMESTIC_SPOTS, 'domestic', 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=2000', 'Official Korean Local Insights')}
        {view === 'korea' && renderCategoryPage('Visit Korea', KOREA_SPOTS, 'korea', 'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&q=80&w=2000', 'Explore the National Heritage')}
        {view === 'seoul' && renderCategoryPage('Visit Seoul', SEOUL_SPOTS, 'seoul', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2000', 'Official Seoul City Guide')}
        {view === 'journeys' && renderCategoryPage('Curated Journeys', JOURNEYS, 'journeys', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000', 'Official & Localized Discovery')}
        {view === 'contact' && <ContactPage setView={setView} />}
      </main>

      {view !== 'consulting' && view !== 'map' && (
        <footer className="bg-brand-navy border-t border-white/10 py-24 px-6 md:px-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20 mb-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="max-w-xs text-gray-500 text-sm leading-relaxed font-light">Afsheen Enterprise: Building your dream Korean journey with unparalleled luxury and official expertise.</p>
                <div className="pt-4 space-y-2 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Contact Us</p>
                  <p className="text-white text-xs font-bold">CEO: REZA ABU SAYED</p>
                  <p className="text-gray-400 text-[10px] leading-relaxed max-w-xs">
                    Address: 30-7 SEOLMUNDONG, ILSANDONG-GU, GOYANG-SI, GYEONGGI-DO
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-16 md:gap-32">
              <div>
                <h4 className="font-black text-[10px] uppercase tracking-widest text-brand-gold mb-6">Explore</h4>
                <ul className="space-y-3 text-sm text-gray-500 font-light">
                  <li><button onClick={() => setView('visitkorea')} className="hover:text-brand-cyan transition-colors">Visit Korea</button></li>
                  <li><button onClick={() => setView('map')} className="hover:text-brand-cyan transition-colors">Travel Map</button></li>
                  <li><button onClick={() => setView('consulting')} className="hover:text-brand-cyan transition-colors">Consulting Hub</button></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-[9px] font-black tracking-widest text-gray-600 text-center uppercase">
            © 2024 AFSHEEN ENTERPRISE. ALL RIGHTS RESERVED.
          </div>
        </footer>
      )}

      <AIAssistant />
    </div>
  );
};

export default App;
