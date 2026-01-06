
import React from 'react';
import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  return (
    <div className="group relative bg-[#0F172A] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl hover:shadow-brand-cyan/10 transition-all duration-700 hover:-translate-y-2">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image Half */}
        <div className="relative w-full lg:w-1/2 h-80 lg:h-auto overflow-hidden">
          <img 
            src={experience.image} 
            alt={experience.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-brand-navy/40 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute top-8 left-8 size-12 bg-brand-navy text-brand-gold font-black flex items-center justify-center rounded-full border border-brand-gold/30 shadow-2xl z-10">
            {index < 10 ? `0${index}` : index}
          </div>
        </div>

        {/* Content Half */}
        <div className="w-full lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-brand-navy/50 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-brand-cyan font-black uppercase tracking-[0.3em] text-[10px] block">
              {experience.category} • PRESTIGE {experience.score}
            </span>
            <div className="flex gap-2">
              {experience.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[8px] text-gray-500 border border-white/5">#{tag}</span>
              ))}
            </div>
          </div>
          
          <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4 leading-tight group-hover:text-brand-gold transition-colors">
            {experience.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light italic">
            {experience.tagline}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 border-t border-white/5 pt-8">
            {experience.history && (
              <div className="col-span-1">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">history_edu</span>
                  Legacy
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-4">{experience.history}</p>
              </div>
            )}
            {experience.discover && experience.discover.length > 0 && (
              <div className="col-span-1">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">auto_awesome</span>
                  Highlights
                </h4>
                <ul className="space-y-2">
                  {experience.discover.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] text-gray-300">
                      <span className="size-1 bg-brand-cyan rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {experience.entryFee && (
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-cyan/20 transition-colors">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1">Access Pass</h4>
                <p className="text-white text-xs font-bold">{experience.entryFee}</p>
              </div>
            )}
            {experience.requirements && (
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-cyan/20 transition-colors">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1">Entry Guide</h4>
                <p className="text-white text-xs leading-tight">{experience.requirements}</p>
              </div>
            )}
          </div>

          {experience.restrictions && (
            <div className="mb-8 flex items-start gap-3 p-3 bg-red-500/5 rounded-xl border border-red-500/10">
              <span className="material-symbols-outlined text-red-400 text-sm">warning</span>
              <p className="text-[10px] text-red-400/80 leading-relaxed uppercase tracking-wider font-black">{experience.restrictions}</p>
            </div>
          )}
          
          <button className="group/btn flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-brand-gold transition-colors">
            Secure This Journey
            <span className="material-symbols-outlined text-brand-cyan transition-transform group-hover/btn:translate-x-2">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
