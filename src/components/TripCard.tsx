import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { Trip } from '../types';
import { TripHighlightBadge } from './TripHighlightBadge';

interface TripCardProps {
  trip: Trip;
  onSelectTrip: (trip: Trip) => void;
  onBookNow?: (trip: Trip) => void;
  isSaved?: boolean;
  onToggleSave?: (tripId: string) => void;
}

export const TripCard: React.FC<TripCardProps> = ({
  trip,
  onSelectTrip,
  onBookNow,
  isSaved = false,
  onToggleSave
}) => {
  const spotsLeft = trip.totalSpots - trip.spotsTaken;

  return (
    <div
      id={`trip-card-${trip.id}`}
      className="group relative bg-[#F7F5EF] rounded-2xl border border-[#A8BFA3] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Media Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#D8C3A5]">
        <img
          src={trip.heroImage}
          alt={`${trip.title} in ${trip.destination}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#202622]/60 via-transparent to-transparent" />

        {/* Top Destination Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#183A2A] text-[#F7F5EF] text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
            {trip.destination}
          </span>
        </div>

        {/* Save Bookmark Button */}
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(trip.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
              isSaved
                ? 'bg-[#2F6B45] text-white'
                : 'bg-[#183A2A]/70 text-[#F7F5EF] hover:bg-[#183A2A]'
            }`}
            aria-label="Save trip"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        )}

        {/* Price Overlay on Image */}
        <div className="absolute bottom-3 right-3 bg-[#D8C3A5] text-[#202622] px-2.5 py-0.5 rounded-md font-mono text-xs font-bold shadow-sm">
          ₹{trip.price.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Badges Bar */}
          <div className="flex flex-wrap gap-1.5">
            <TripHighlightBadge size="sm" duration={`${trip.durationDays}D / ${trip.durationNights}N`} />
            <TripHighlightBadge size="sm" seatsLeft={spotsLeft} />
            {trip.difficulty && (
              <TripHighlightBadge size="sm" highlight={trip.difficulty} />
            )}
          </div>

          <h3 className="text-lg font-serif font-bold text-[#202622] group-hover:text-[#183A2A] transition-colors leading-snug">
            {trip.title}
          </h3>

          <p className="text-xs text-[#202622]/75 line-clamp-2 leading-relaxed">
            {trip.overview}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-[#A8BFA3]/40 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelectTrip(trip)}
            className="text-xs font-mono font-bold text-[#183A2A] hover:text-[#2F6B45] flex items-center gap-1 transition-colors"
          >
            <span>VIEW DETAILS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => (onBookNow ? onBookNow(trip) : onSelectTrip(trip))}
            className="btn-primary text-[11px] py-1.5 px-4"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};
