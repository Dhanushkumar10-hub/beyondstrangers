import React from 'react';
import { ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { TravelerProfile } from '../types';

interface TravellerCardProps {
  traveler: TravelerProfile;
  onViewProfile?: (traveler: TravelerProfile) => void;
}

export const TravellerCard: React.FC<TravellerCardProps> = ({ traveler, onViewProfile }) => {
  return (
    <div
      id={`traveler-card-${traveler.id}`}
      className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-5 shadow-lg transition-all hover:-translate-y-1 group"
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <img
            src={traveler.avatar}
            alt={traveler.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-600/40"
          />
          <span className="absolute -bottom-1 -right-1 bg-emerald-950 text-emerald-400 p-0.5 rounded-full border border-emerald-800" title="Demo Profile">
            <ShieldCheck className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-stone-100 text-sm truncate group-hover:text-emerald-400 transition-colors">
              {traveler.name}
            </h4>
            <span className="text-[9px] uppercase font-bold bg-stone-800 text-stone-400 px-2 py-0.5 rounded-full">
              DEMO
            </span>
          </div>

          <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-stone-500" />
            <span>{traveler.city} • {traveler.occupation}</span>
          </p>

          <p className="text-xs text-stone-300 mt-2 line-clamp-2 leading-relaxed">
            "{traveler.bio}"
          </p>
        </div>
      </div>

      {/* Interest Tags */}
      <div className="mt-4 pt-3 border-t border-stone-800/80 flex flex-wrap gap-1.5">
        {traveler.interests.map((interest, idx) => (
          <span
            key={idx}
            className="text-[10px] font-semibold bg-stone-800/80 text-emerald-300 px-2.5 py-1 rounded-lg border border-stone-700/60"
          >
            {interest}
          </span>
        ))}
      </div>

      {/* Badges / Stats footer */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400">
        <span className="flex items-center gap-1 text-emerald-400 font-medium">
          <Sparkles className="w-3 h-3" />
          {traveler.tripsCompleted} Trips Joined
        </span>
        {onViewProfile && (
          <button
            onClick={() => onViewProfile(traveler)}
            className="text-stone-300 hover:text-white underline font-medium text-[11px]"
          >
            View Profile
          </button>
        )}
      </div>
    </div>
  );
};
