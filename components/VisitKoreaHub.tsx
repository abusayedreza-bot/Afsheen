
import React, { useState, useMemo } from 'react';
import { SEOUL_SPOTS, KOREA_SPOTS, DOMESTIC_SPOTS } from '../constants';
import { ExperienceCard } from './ExperienceCard';

const CATEGORIES = [
  { id: 'all', label: 'All Heritage' },
  { id: 'Seoul', label: 'Seoul Capital' },
  { id: 'Korea', label: 'National Heritage' },
  { id: 'Domestic', label: 'Local Wonders' }
];

export const VisitKoreaHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allSpots = useMemo(() => [...SEOUL_SPOTS, ...KOREA_SPOTS, ...DOMESTIC_SPOTS], []);
  
  const filteredSpots = useMemo(() => {
    let result = activeCategory === 'all' 
      ? allSpots 
      : allSpots.filter(spot => spot.category === activeCategory);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(spot => 
        spot.title.toLowerCase().includes(query) || 
        spot.tags.some(tag => tag.toLowerCase().includes(query)) ||
        spot.description.toLowerCase().includes(query)
      );
    }
    return result;
  }, [activeCategory, searchQuery, allSpots]);

  return (
    <div className="min-h-screen bg-brand-navy pt-32 pb-24 animate-fade-in-up">
      {/* Hero Section */}
      <section className="px-6 md:px-24 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/10 pb-16">
            <div className="max-w-3xl">
              <span className="text-brand-gold font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Official Discovery Portal</span>
              <h1 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter leading-tight mb-8">
                Visit <span className="text-brand-cyan">Korea</span>.
              </h1>
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                Explore the definitive collection of South Korea's most prestigious landmarks. From centuries-old palaces to hidden ecological treasures, discover your next elite journey.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-4xl font-display font-bold text-brand-cyan">5,000+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Years of History</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-right">
                <p className="text-4xl font-display font-bold text-brand-gold">UNESCO</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Certified Sites</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Navigation */}
      <section className="sticky top-24 z-40 bg-brand-navy/95 backdrop-blur-xl border-b border-white/5 py-6 mb-16 px-6 md:px-24 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full lg:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                  ${activeCategory === cat.id 
                    ? 'bg-brand-cyan text-brand-navy shadow-[0_0_20px_rgba(0,240,255,0.3)]' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/5'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96">
            <input 
              type="text" 
              placeholder="Search by name, tag, or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-6 py-2 text-sm text-white focus:ring-1 focus:ring-brand-cyan outline-none transition-all pr-12"
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">search</span>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <section className="px-6 md:px-24 mb-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-gray-500">
           <p className="text-[10px] font-black uppercase tracking-widest">Showing {filteredSpots.length} results</p>
           {searchQuery && (
             <button onClick={() => setSearchQuery('')} className="text-[10px] font-black uppercase tracking-widest text-brand-gold hover:text-white transition-colors">Clear Search</button>
           )}
        </div>
      </section>

      {/* Spots Grid */}
      <section className="px-6 md:px-24 min-h-[40vh]">
        <div className="max-w-7xl mx-auto space-y-16">
          {filteredSpots.length > 0 ? (
            filteredSpots.map((spot, idx) => (
              <ExperienceCard key={spot.id} experience={spot} index={idx + 1} />
            ))
          ) : (
            <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[4rem]">
              <span className="material-symbols-outlined text-6xl text-gray-700 mb-6">explore_off</span>
              <h3 className="text-2xl font-display font-bold text-white mb-2">No locations found</h3>
              <p className="text-gray-500 font-light">Try adjusting your search query or filter category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Informational Callout */}
      <section className="mt-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto p-16 rounded-[4rem] bg-gradient-to-br from-[#0F172A] to-brand-navy border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <span className="text-[200px] font-display font-black tracking-tighter text-brand-gold">KR</span>
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-white mb-6">Need More Discovery?</h2>
              <p className="text-gray-400 font-light leading-relaxed mb-10">
                Our AI Super-Brain has access to the entire database of Korea Tourism Organization (KTO). If you can't find a specific spot here, ask our assistant for hidden local secrets.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-brand-cyan">verified</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Official Data</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-brand-cyan">update</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Real-time Info</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="h-20 px-16 bg-white text-brand-navy font-black uppercase tracking-[0.2em] rounded-3xl hover:bg-brand-gold transition-all shadow-2xl active:scale-95">
                Consult With AI Brain
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
