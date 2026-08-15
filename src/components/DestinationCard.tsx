import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  onSelectDestination: (destName: string) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelectDestination
}) => {
  return (
    <div
      id={`dest-card-${destination.id}`}
      onClick={() => onSelectDestination(destination.name)}
      className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-stone-800"
    >
      <img
        src={destination.image}
        alt={destination.name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="bg-stone-900/80 backdrop-blur-md text-stone-300 text-[11px] font-bold px-3 py-1 rounded-full border border-stone-800 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            {destination.region}
          </span>
          <span className="bg-emerald-950/90 text-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-800">
            {destination.activeTripsCount} Demo Trips
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-stone-100 group-hover:text-emerald-400 transition-colors">
            {destination.name}
          </h3>
          <p className="text-xs text-stone-300 mt-1 font-medium">{destination.stateCountry}</p>
          <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
            {destination.shortDescription}
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Explore Trips</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
