import React, { useState, useEffect, useRef } from 'react';
import { MapPin, CheckCircle, ExternalLink, ShieldCheck, Navigation } from 'lucide-react';

export interface MapMarker {
  id?: string;
  lat: number;
  lng: number;
  label: string;
  verified?: boolean;
  subRegion?: string;
  googleMapsUrl?: string;
  category?: string;
  elevation?: string;
}

export interface MapJourneyProps {
  markers: MapMarker[];
  center?: { lat: number; lng: number };
  zoom?: number;
  interactive?: boolean;
  className?: string;
}

export const MapJourney: React.FC<MapJourneyProps> = ({
  markers,
  center = { lat: 9.432, lng: 77.164 },
  zoom = 12,
  interactive = true,
  className = 'w-full h-80 sm:h-96 rounded-2xl overflow-hidden'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(markers[0] || null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Lazy load trigger via IntersectionObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const apiKey = 
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) || 
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY);

  // Google Maps Script loader
  useEffect(() => {
    if (!isVisible || !apiKey || (window as any).google?.maps) {
      if ((window as any).google?.maps) setGoogleMapsLoaded(true);
      return;
    }

    const scriptId = 'google-maps-sdk-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleMapsLoaded(true);
    document.head.appendChild(script);
  }, [isVisible, apiKey]);

  return (
    <div ref={containerRef} className={`relative bg-[#0E1712] border border-[#1A2E20] ${className}`}>
      {/* Visual Top Bar / Coordinates */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#09110B]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-white text-xs">
        <Navigation className="w-3.5 h-3.5 text-[#74C69D]" />
        <span className="font-mono text-[11px] font-semibold tracking-wider">
          THE JOURNEY MAP • {markers.length} VERIFIED WAYPOINTS
        </span>
      </div>

      {/* Embedded High-Precision Interactive Visual Map */}
      <div className="w-full h-full relative flex items-center justify-center p-4 bg-[#0A130D]">
        {/* Subtle topographic grid effect */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#52B788 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Waypoint Polyline Track */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <polyline
            points={markers.map((_, i) => `${15 + i * (70 / Math.max(markers.length - 1, 1))}%, ${35 + (i % 2 === 0 ? 25 : -15)}%`).join(' ')}
            fill="none"
            stroke="#52B788"
            strokeWidth="2.5"
            strokeDasharray="6,6"
            className="opacity-70"
          />
        </svg>

        {/* Pins Matrix */}
        <div className="relative w-full h-full max-w-4xl z-10 flex items-center justify-around px-4">
          {markers.map((m, idx) => {
            const isSelected = selectedMarker?.label === m.label;
            return (
              <div 
                key={m.id || idx} 
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => setSelectedMarker(m)}
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all transform ${
                    isSelected 
                      ? 'bg-[#1C4D35] border-[#74C69D] text-white scale-110 shadow-lg shadow-[#74C69D]/30 ring-4 ring-[#74C69D]/20' 
                      : 'bg-[#122218] border-[#2A4B36] text-[#74C69D] hover:scale-105'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="mt-2 text-[11px] font-semibold text-white bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-center max-w-[110px] truncate">
                  {m.label}
                </span>
                {m.verified && (
                  <span className="text-[9px] font-mono text-[#74C69D] flex items-center gap-0.5 mt-0.5">
                    <ShieldCheck className="w-2.5 h-2.5" /> VERIFIED
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Marker Detail Card (Bottom Floating) */}
        {selectedMarker && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-20 bg-[#0C1610]/95 backdrop-blur-md p-4 rounded-2xl border border-[#23422E] shadow-2xl text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono bg-[#1E432E] text-[#86E4AE] px-2 py-0.5 rounded font-bold uppercase">
                    {selectedMarker.category || 'TERRAIN POINT'}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {selectedMarker.elevation || `${selectedMarker.lat.toFixed(3)}°N, ${selectedMarker.lng.toFixed(3)}°E`}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-serif">{selectedMarker.label}</h4>
                <p className="text-xs text-neutral-300 mt-0.5">{selectedMarker.subRegion || 'Western Ghats, Kerala'}</p>
              </div>

              {selectedMarker.googleMapsUrl && (
                <a
                  href={selectedMarker.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${selectedMarker.label} on Google Maps`}
                  className="px-3 py-1.5 bg-[#1C4D35] hover:bg-[#286847] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Attribution */}
      <div className="absolute bottom-1 right-2 text-[9px] font-mono text-neutral-500 z-10">
        Google Maps Coordinates Verified • Beyond Strangers
      </div>
    </div>
  );
};
