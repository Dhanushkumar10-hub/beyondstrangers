import React from 'react';
import { Calendar, Clock, MapPin, Tag, ShieldCheck, ArrowRight, Eye } from 'lucide-react';

export interface QuickFactsProps {
  destination: string;
  dates: string;
  duration: string;
  price: string;
  age?: string;
  onViewDetails: () => void;
  onJoin?: () => void;
}

export const QuickFacts: React.FC<QuickFactsProps> = ({
  destination,
  dates,
  duration,
  price,
  age = 'NO AGE RESTRICTION',
  onViewDetails,
  onJoin
}) => {
  return (
    <section 
      aria-label="Trip Quick Overview"
      className="w-full bg-white border-b border-neutral-200 shadow-sm relative z-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* Desktop / Tablet Horizontal Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 items-center">
          
          {/* Destination */}
          <div className="border-r border-neutral-100 pr-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
              DESTINATION
            </span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#1C4D35] shrink-0" />
              <span className="font-bold text-neutral-900 text-xs sm:text-sm truncate">
                {destination}
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="border-r border-neutral-100 pr-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
              DATES
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#1C4D35] shrink-0" />
              <span className="font-semibold text-neutral-800 text-xs truncate">
                {dates}
              </span>
            </div>
          </div>

          {/* Duration */}
          <div className="border-r border-neutral-100 pr-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
              DURATION
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#1C4D35] shrink-0" />
              <span className="font-semibold text-neutral-800 text-xs">
                {duration}
              </span>
            </div>
          </div>

          {/* All-Inclusive Price */}
          <div className="border-r border-neutral-100 pr-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
              PRICE / SEAT
            </span>
            <div className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#1C4D35] shrink-0" />
              <span className="font-bold text-[#1C4D35] text-xs sm:text-sm font-serif">
                {price}
              </span>
            </div>
          </div>

          {/* Age / Policy */}
          <div className="border-r border-neutral-100 pr-2 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
              ADMISSION
            </span>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
              <span className="font-medium text-[#2D6A4F] text-[11px] truncate">
                {age}
              </span>
            </div>
          </div>

          {/* Interactive CTAs */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1 flex items-center justify-end gap-2 pt-1 md:pt-0">
            <button
              type="button"
              onClick={onViewDetails}
              aria-label="View full trip details and itinerary"
              className="w-full md:w-auto px-3.5 py-2 border border-neutral-300 hover:border-neutral-800 text-neutral-800 hover:text-black rounded-lg text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            >
              <Eye className="w-3 h-3" />
              <span>VIEW FULL TRIP</span>
            </button>
            {onJoin && (
              <button
                type="button"
                onClick={onJoin}
                aria-label="Join this journey directly"
                className="hidden lg:flex px-3.5 py-2 bg-[#080808] hover:bg-neutral-900 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              >
                <span>JOIN</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
