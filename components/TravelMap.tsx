
import React, { useState, useEffect, useRef } from 'react';
import { searchMapPlaces } from '../geminiService';

declare const L: any;

interface MapResult {
  text: string;
  mapLinks: { title: string; uri: string }[];
}

interface PlaceMarker {
  name: string;
  lat: number;
  lng: number;
}

const CATEGORIES = [
  { id: 'hotels', label: 'Accommodations', icon: 'hotel', query: 'Luxury Hotels, Motels, Resorts, Camping spots in South Korea' },
  { id: 'halal', label: 'Halal & Prayer', icon: 'mosque', query: 'Halal restaurants, Muslim prayer mosque in South Korea' },
  { id: 'food', label: 'Dining & 24h', icon: 'restaurant', query: '24 hours restaurants, Korean traditional food, best cafes in South Korea' },
  { id: 'medical', label: 'Health & Clinic', icon: 'local_hospital', query: 'Medical centers, clinics, emergency hospitals in South Korea' },
  { id: 'security', label: 'Police & Safety', icon: 'local_police', query: 'Police station, safety centers in South Korea' },
  { id: 'tourist', label: 'Tourist Spots', icon: 'map', query: 'Top tourist attractions, hidden gems, landmarks in South Korea' },
];

const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'KO', label: '한국어' },
  { code: 'AR', label: 'العربية' },
  { code: 'ZH', label: '中文' },
  { code: 'BN', label: 'Bengali' },
  { code: 'HI', label: 'Hindi' },
  { code: 'UR', label: 'Urdu' },
  { code: 'RU', label: 'Russian' },
  { code: 'DE', label: 'German' },
  { code: 'FR', label: 'France' },
  { code: 'VI', label: 'Vietnamese' },
  { code: 'TH', label: 'Thai' },
  { code: 'KM', label: 'Cambodia' },
  { code: 'MS', label: 'Malaysian' },
  { code: 'TL', label: 'Philippine' },
  { code: 'ID', label: 'Indonesian' },
  { code: 'JA', label: 'Japanese' },
  { code: 'IT', label: 'Italian' },
  { code: 'ES', label: 'Spanish' },
  { code: 'PT', label: 'Portuguese' },
  { code: 'TR', label: 'Turkish' },
  { code: 'NL', label: 'Dutch' },
  { code: 'PL', label: 'Polish' },
  { code: 'SV', label: 'Swedish' },
  { code: 'EL', label: 'Greek' },
  { code: 'HU', label: 'Hungarian' },
  { code: 'CS', label: 'Czech' },
  { code: 'FI', label: 'Finnish' },
  { code: 'NO', label: 'Norwegian' },
  { code: 'DA', label: 'Danish' },
  { code: 'RO', label: 'Romanian' },
  { code: 'HE', label: 'Hebrew' },
];

export const TravelMap: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('EN');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MapResult | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersGroupRef = useRef<any>(null);

  useEffect(() => {
    // Initial Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => {
          console.warn("Geolocation denied", err);
          // Default to Seoul if denied
          setLocation({ lat: 37.5665, lng: 126.9780 });
        }
      );
    } else {
      setLocation({ lat: 37.5665, lng: 126.9780 });
    }
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !location || mapRef.current) return;

    // Initialize Leaflet Map
    mapRef.current = L.map(mapContainerRef.current).setView([location.lat, location.lng], 13);
    
    // Use CartoDB Dark Matter tiles to match brand identity
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(mapRef.current);

    markersGroupRef.current = L.layerGroup().addTo(mapRef.current);
    
    // Add current location marker
    L.circleMarker([location.lat, location.lng], {
      color: '#00F0FF',
      fillColor: '#00F0FF',
      fillOpacity: 0.5,
      radius: 8
    }).addTo(mapRef.current).bindPopup('Your Location');

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [location]);

  const parseMarkersFromText = (text: string): PlaceMarker[] => {
    // Looks for [LOC: Name | Lat, Lng]
    const regex = /\[LOC:\s*([^|\]]+)\s*\|\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*\]/g;
    const markers: PlaceMarker[] = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      markers.push({
        name: match[1].trim(),
        lat: parseFloat(match[2]),
        lng: parseFloat(match[3])
      });
    }
    return markers;
  };

  const updateMapMarkers = (markers: PlaceMarker[]) => {
    if (!mapRef.current || !markersGroupRef.current) return;
    
    markersGroupRef.current.clearLayers();
    
    if (markers.length === 0) return;

    const bounds = L.latLngBounds([]);
    
    markers.forEach(m => {
      const marker = L.marker([m.lat, m.lng], {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: #D4AF37; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #050B17; box-shadow: 0 0 10px #D4AF37;"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        })
      }).addTo(markersGroupRef.current)
        .bindPopup(`<b style="color: #00F0FF;">${m.name}</b>`);
      
      bounds.extend([m.lat, m.lng]);
    });

    mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  };

  const handleSearch = async (customQuery?: string) => {
    const finalQuery = customQuery || query;
    if (!finalQuery.trim()) return;

    setLoading(true);
    setResults(null);
    
    const data = await searchMapPlaces(finalQuery, location?.lat, location?.lng);
    setResults(data);
    
    const markers = parseMarkersFromText(data.text);
    updateMapMarkers(markers);
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-navy pt-24 flex flex-col animate-fade-in-up overflow-hidden">
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-100px)]">
        
        {/* Sidebar - Categories & Search */}
        <div className="w-full md:w-96 bg-brand-navy border-r border-white/10 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar shadow-2xl z-10">
          <div className="space-y-4">
             <h2 className="text-2xl font-display font-bold text-white tracking-tight">Travel <span className="text-brand-cyan">Navigator</span></h2>
             <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Afsheen Enterprise Hub</p>
          </div>

          {/* Language Selector - One Box Scrollable */}
          <div className="space-y-2">
            <h3 className="text-[10px] text-brand-gold uppercase font-black tracking-[0.2em]">Select Language</h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2 max-h-32 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-3 gap-1.5">
                {LANGUAGES.map(l => (
                  <button 
                    key={l.code} 
                    onClick={() => setSelectedLang(l.code)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all group
                      ${selectedLang === l.code 
                        ? 'bg-brand-cyan text-brand-navy border-brand-cyan shadow-[0_0_10px_rgba(0,240,255,0.3)]' 
                        : 'border-white/5 text-gray-500 hover:border-white/20 hover:bg-white/5'}`}
                  >
                    <span className="text-[10px] font-black tracking-tighter uppercase">{l.code}</span>
                    <span className={`text-[8px] truncate max-w-full font-bold opacity-60 group-hover:opacity-100`}>
                      {l.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Search Box */}
          <div className="relative">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search (e.g. Halal in Busan)..."
              className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-5 text-sm outline-none focus:ring-1 focus:ring-brand-cyan text-white transition-all pr-12"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={() => handleSearch()}
              className="absolute right-2 top-2 bottom-2 w-10 bg-brand-cyan text-brand-navy rounded-xl flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <span className="material-symbols-outlined text-lg">search</span>
            </button>
          </div>

          {/* Category List */}
          <div className="space-y-2">
            <h3 className="text-[10px] text-brand-gold uppercase font-black tracking-[0.2em] mb-4">Quick Filters</h3>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => handleSearch(cat.query)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-brand-cyan/10 hover:border-brand-cyan/30 border border-transparent transition-all group"
              >
                <span className="material-symbols-outlined text-brand-cyan group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-sm text-gray-300 font-light group-hover:text-white">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto p-4 rounded-2xl bg-brand-gold/5 border border-brand-gold/20">
            <p className="text-[9px] text-brand-gold font-bold uppercase tracking-widest mb-1">AI Integrated Mapping</p>
            <p className="text-[10px] text-gray-500 leading-relaxed">Search in any language. Our AI fetches coordinates for live visualization.</p>
          </div>
        </div>

        {/* Main Content Area - Split Map and Info */}
        <div className="flex-1 flex flex-col relative">
          
          {/* Real Leaflet Map Container */}
          <div ref={mapContainerRef} className="flex-1 w-full bg-[#020617] relative z-0" />

          {/* Overlay Search Results (Bottom Drawer style) */}
          {results && (
            <div className="absolute bottom-6 left-6 right-6 max-h-[40%] bg-brand-navy/95 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-20 animate-fade-in-up">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="size-8 bg-brand-cyan rounded-full flex items-center justify-center text-brand-navy">
                      <span className="material-symbols-outlined text-sm">list</span>
                   </div>
                   <h3 className="text-lg font-display font-bold">Search Insights</h3>
                </div>
                <button onClick={() => setResults(null)} className="text-gray-500 hover:text-white">
                   <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar flex flex-col md:flex-row gap-8">
                 <div className="flex-1 prose prose-invert prose-sm">
                   {/* Clean output removing the logic tags for display */}
                   {results.text.replace(/\[LOC:[^\]]+\]/g, '').split('\n').map((line, i) => (
                     <p key={i} className="mb-2">{line}</p>
                   ))}
                 </div>
                 
                 {results.mapLinks && results.mapLinks.length > 0 && (
                   <div className="w-full md:w-64 space-y-2">
                     <p className="text-[10px] text-brand-gold font-black uppercase tracking-widest mb-3">Sync Local Apps</p>
                     {results.mapLinks.map((link, idx) => (
                       <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-brand-cyan/20 transition-all">
                          <p className="text-[11px] font-bold mb-2 truncate">{link.title}</p>
                          <div className="flex gap-2">
                             <a 
                               href={`https://map.naver.com/v5/search/${encodeURIComponent(link.title)}`}
                               target="_blank" rel="noreferrer"
                               className="px-3 py-1 bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-widest rounded-lg border border-green-500/20"
                             >Naver</a>
                             <a 
                               href={`https://map.kakao.com/link/search/${encodeURIComponent(link.title)}`}
                               target="_blank" rel="noreferrer"
                               className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-[8px] font-black uppercase tracking-widest rounded-lg border border-yellow-500/20"
                             >Kakao</a>
                          </div>
                       </div>
                     ))}
                   </div>
                 )}
              </div>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 z-30 bg-brand-navy/50 backdrop-blur-sm flex items-center justify-center">
               <div className="p-10 bg-brand-navy rounded-[3rem] border border-brand-cyan/20 text-center shadow-2xl">
                  <div className="size-16 border-4 border-brand-cyan/20 border-t-brand-cyan rounded-full animate-spin mx-auto mb-6" />
                  <p className="text-brand-cyan font-black uppercase tracking-widest text-xs">Consulting Super-Brain...</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
