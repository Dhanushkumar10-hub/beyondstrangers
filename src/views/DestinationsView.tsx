import React from 'react';
import { Destination, Trip } from '../types';
import { MapPin, ArrowRight, Mountain, Sparkles } from 'lucide-react';
import { TripHighlightBadge } from '../components/TripHighlightBadge';

interface DestinationsViewProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  trips: Trip[];
  onSelectTrip: (trip: Trip) => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  destinations,
  onSelectDestination,
  trips,
  onSelectTrip
}) => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF] text-[#202622]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8C3A5] border border-[#A8BFA3]/50 text-[#202622] text-xs font-mono font-bold">
            <Mountain className="w-3.5 h-3.5 text-[#183A2A]" />
            <span>WESTERN GHATS & HILLS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#183A2A]">
            Destinations We Explore
          </h1>
          <p className="text-xs sm:text-sm text-[#202622]/80 font-medium">
            Hidden trails, high peaks, and misty plantation estates across South India.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {destinations.map((dest) => {
            const destTrips = trips.filter(t => t.destination.toLowerCase().includes(dest.name.toLowerCase()));

            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest)}
                className="group cursor-pointer rounded-2xl bg-[#F7F5EF] border border-[#A8BFA3] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Image Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#D8C3A5]">
                  <img
                    src={dest.heroImage}
                    alt={`${dest.name} landscape in Tamil Nadu`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202622]/60 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="bg-[#183A2A] text-[#F7F5EF] text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {dest.state}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="text-xl font-serif font-bold text-[#F7F5EF] leading-none">
                      {dest.name}
                    </div>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-[#202622]/80 font-medium line-clamp-2">
                      {dest.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {dest.highlights.slice(0, 3).map((hl, i) => (
                        <TripHighlightBadge key={i} size="sm" highlight={hl} />
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#A8BFA3]/40 flex items-center justify-between text-xs font-mono font-bold text-[#183A2A] group-hover:text-[#2F6B45]">
                    <span>{destTrips.length} Active {destTrips.length === 1 ? 'Chapter' : 'Chapters'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
