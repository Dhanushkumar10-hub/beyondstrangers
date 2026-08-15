import React from 'react';
import { Trip } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Tag, 
  Check, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  Compass
} from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

export interface TripDetailsProps {
  trip: Trip;
  onJoin: (trip: Trip) => void;
  onClose?: () => void;
}

export const TripDetails: React.FC<TripDetailsProps> = ({
  trip,
  onJoin,
  onClose
}) => {
  return (
    <div className="bg-white rounded-3xl border border-[#D5D1D7] overflow-hidden shadow-xl max-w-4xl mx-auto my-6 text-[#080808]">
      {/* Top Media Header with Accessible Overlay */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-900">
        <img
          src={trip.heroImage}
          alt={`Landscape of ${trip.title} in ${trip.destination}`}
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest bg-[#D4CADF] text-[#080808] px-2.5 py-0.5 rounded uppercase">
              {trip.chapterTitle || 'THE STRANGER SOCIETY'}
            </span>
            <span className="text-xs text-neutral-300 font-mono">
              {trip.spotsTaken}/{trip.totalSpots} SPOTS FILLED
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            {trip.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 flex items-center gap-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#D4CADF]" />
            <span>{trip.destination}</span>
          </p>
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="bg-[#D4D1D7]/25 border-y border-[#D6D1D7] px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-0.5">DATES</span>
          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#080808]">
            <Calendar className="w-4 h-4 text-[#080808]" />
            <span>{trip.startDate} — {trip.endDate}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-0.5">DURATION</span>
          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#080808]">
            <Clock className="w-4 h-4 text-[#080808]" />
            <span>{trip.durationNights}N / {trip.durationDays}D</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-0.5">ALL-INCLUSIVE</span>
          <div className="flex items-center gap-1.5 font-bold text-base sm:text-lg font-serif text-[#080808]">
            <Tag className="w-4 h-4 text-[#080808]" />
            <span>₹{trip.price.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-0.5">COHORT SIZE</span>
          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#080808]">
            <Users className="w-4 h-4 text-[#080808]" />
            <span>12–16 Travellers</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Overview */}
        <div>
          <h3 className="text-lg font-serif font-bold text-[#080808] mb-2">
            The Journey Overview
          </h3>
          <p className="text-sm text-[#2B2B2B] leading-relaxed">
            {trip.overview}
          </p>
        </div>

        {/* Inclusions & Highlights */}
        <div>
          <h3 className="text-lg font-serif font-bold text-[#080808] mb-3">
            What Is Included
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {trip.inclusions.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-2 bg-[#D5D1D7]/30 border border-[#D6D1D7] p-3 rounded-xl text-xs text-[#080808]"
              >
                <div className="w-4 h-4 rounded-full bg-[#080808] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary Preview */}
        {trip.itinerary && trip.itinerary.length > 0 && (
          <div>
            <h3 className="text-lg font-serif font-bold text-[#080808] mb-3">
              Daily Itinerary Breakdown
            </h3>
            <div className="space-y-3">
              {trip.itinerary.map((day, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-[#D5D1D7] p-4 rounded-2xl"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold bg-[#D4CADF] text-[#080808] px-2 py-0.5 rounded">
                      DAY {day.day}
                    </span>
                    <h4 className="text-sm font-bold text-[#080808]">
                      {day.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#2B2B2B] mt-1 leading-relaxed">
                    {day.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to action footer */}
        <div className="pt-6 border-t border-[#D5D1D7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">ADMISSION</span>
            <span className="text-xs font-semibold text-[#080808] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {trip.ageRestriction || 'NO AGE RESTRICTION'}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onClose && (
              <SecondaryButton onClick={onClose} fullWidth={false} size="md">
                Back to Trips
              </SecondaryButton>
            )}
            <PrimaryButton onClick={() => onJoin(trip)} size="md">
              JOIN THIS JOURNEY
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
