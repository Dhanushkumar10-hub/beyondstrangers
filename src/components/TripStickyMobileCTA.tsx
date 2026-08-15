import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

export interface TripStickyMobileCTAProps {
  price: string;
  tripTitle: string;
  onJoin: () => void;
}

export const TripStickyMobileCTA: React.FC<TripStickyMobileCTAProps> = ({
  price,
  tripTitle,
  onJoin
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div 
      role="region"
      aria-label="Trip Booking Sticky Action"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A120D]/95 backdrop-blur-lg border-t border-white/10 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-2xl transition-all"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Price & Title Indicator */}
        <div className="flex-1 min-w-0" aria-live="polite">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#74C69D] block truncate">
            {tripTitle}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-serif font-bold text-white tracking-tight">
              {price}
            </span>
            <span className="text-[10px] font-mono text-neutral-400">/ SEAT</span>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={onJoin}
          aria-label={`Join journey now: ${tripTitle}`}
          className="h-11 px-5 bg-[#080808] hover:bg-neutral-900 active:bg-black text-white font-semibold text-xs tracking-wider uppercase rounded-xl border border-white/20 shadow-md flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#74C69D]"
        >
          <span>JOIN JOURNEY</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss sticky booking bar"
          className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
