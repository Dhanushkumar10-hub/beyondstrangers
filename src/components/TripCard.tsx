import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onSelectTrip: (trip: Trip) => void;
  onBookNow: (trip: Trip) => void;
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
  const isFewSpots = spotsLeft <= 4 && spotsLeft > 0;

  return (
    <div
      id={`trip-card-${trip.id}`}
      onClick={() => onSelectTrip(trip)}
      className="group cursor-pointer bg-white border border-[#E5E5E5] hover:border-[#0A0A0A] transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Large Cinematic Photography */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F7F5]">
        <img
          src={trip.heroImage}
          alt={trip.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Minimal Tags */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-white/95 text-[#0A0A0A] text-xs sm:text-sm font-semibold tracking-widest px-3 py-1.5 uppercase border border-[#E5E5E5]/60 shadow-xs">
            {trip.destination.toUpperCase()}
          </span>
          {trip.trending && (
            <span className="bg-[#0A0A0A] text-white text-xs font-bold tracking-widest px-2.5 py-1.5 uppercase">
              POPULAR
            </span>
          )}
        </div>

        {/* Save/Bookmark */}
        {onToggleSave && (
          <button
            id={`btn-save-trip-${trip.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(trip.id);
            }}
            className={`absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white border border-[#E5E5E5] transition-colors ${
              isSaved ? 'text-[#0A0A0A]' : 'text-[#666666] hover:text-[#0A0A0A]'
            }`}
            aria-label="Save trip"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Spots Left Minimal Pill */}
        {isFewSpots && (
          <div className="absolute bottom-4 left-4 bg-white/95 text-[#333333] text-xs sm:text-sm font-medium tracking-wider px-3 py-1.5 border border-[#E5E5E5]">
            ONLY {spotsLeft} SPOTS LEFT
          </div>
        )}
      </div>

      {/* Editorial Content Area */}
      <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between bg-white space-y-6">
        <div className="space-y-3">
          {/* Chapter / Location Heading */}
          <div className="text-sm font-mono tracking-[0.18em] text-[#666666] uppercase font-medium">
            {trip.chapterBadge || `CHAPTER • ${trip.destination}`}
          </div>

          <h3
            id={`trip-title-${trip.id}`}
            className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#0A0A0A] group-hover:text-[#333333] transition-colors leading-snug"
          >
            {trip.title}
          </h3>

          <p className="text-base sm:text-[17px] text-[#555555] font-light line-clamp-2 leading-relaxed">
            {trip.description}
          </p>
        </div>

        {/* Date, Duration & Price Breakdown */}
        <div className="pt-5 border-t border-[#F0F0EE] space-y-5">
          <div className="flex items-center justify-between text-base sm:text-[17px] text-[#555555]">
            <span className="font-mono uppercase tracking-wider text-[15px] text-[#444444] font-medium">{trip.dates}</span>
            <span className="font-semibold text-[#222222]">{trip.durationDays} DAYS</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#777777] block font-medium">FROM</span>
              <div className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] font-serif-editorial">
                {trip.currency}{trip.price.toLocaleString('en-IN')}
                <span className="text-sm sm:text-base font-sans font-normal text-[#666666] ml-1.5">/ person</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#0A0A0A] tracking-wider uppercase group-hover:translate-x-1.5 transition-transform">
              <span>EXPLORE</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
