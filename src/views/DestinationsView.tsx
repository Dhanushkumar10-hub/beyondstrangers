import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { DEMO_DESTINATIONS, DEMO_TRIPS } from '../data/mockData';
import { Trip, Destination } from '../types';

interface DestinationsViewProps {
  onSelectTrip: (trip: Trip) => void;
  destinations?: Destination[];
  trips?: Trip[];
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({ 
  onSelectTrip,
  destinations = DEMO_DESTINATIONS,
  trips = DEMO_TRIPS
}) => {
  return (
    <div className="bg-white text-[#0A0A0A] pt-24 pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
            OUR GEOGRAPHIES
          </div>
          <h1 className="text-[clamp(36px,4.5vw,58px)] font-bold font-serif-editorial text-[#0A0A0A] tracking-tight leading-tight">
            Destinations Across India
          </h1>
          <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed">
            From the tea-clad ridge lines of Kerala to the monsoon waterfalls of the East and heritage ruins of the Deccan Plateau.
          </p>
        </div>

        {/* Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {destinations.map((dest) => {
            const matchingTrip = trips.find(t => t.destination.toLowerCase().includes(dest.name.toLowerCase()));

            return (
              <div
                key={dest.id}
                onClick={() => matchingTrip && onSelectTrip(matchingTrip)}
                className={`group ${matchingTrip ? 'cursor-pointer' : 'cursor-default'} bg-white border border-[#E5E5E5] hover:border-[#0A0A0A] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F7F5]">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  <div className="absolute top-4 left-4 bg-white/95 text-[#0A0A0A] px-2.5 py-1 text-xs font-mono uppercase tracking-widest border border-[#E5E5E5] font-semibold">
                    {dest.stateCountry || dest.region}
                  </div>

                  {dest.activeTripsCount > 0 && (
                    <div className="absolute bottom-4 left-4 bg-white/95 text-[#333333] text-xs font-medium tracking-wider px-2.5 py-1 border border-[#E5E5E5]">
                      {dest.activeTripsCount} PLANNED CHAPTERS
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between bg-white">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-[#666666] uppercase tracking-wider font-medium">
                      {dest.subtitle}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#0A0A0A]">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-[#555555] font-light leading-relaxed line-clamp-2">
                      {dest.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F0F0EE] flex items-center justify-between">
                    <span className="text-xs text-[#666666] font-mono">
                      Elevation: {dest.altitude || 'Variable'}
                    </span>
                    {matchingTrip ? (
                      <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] tracking-wider uppercase flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        <span>EXPLORE CHAPTER</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-xs text-[#888888] uppercase font-mono font-medium">CURATING</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
