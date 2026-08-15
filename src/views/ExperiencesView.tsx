import React, { useState } from 'react';
import { TripCard } from '../components/TripCard';
import { TripHighlightBadge } from '../components/TripHighlightBadge';
import { Trip, TripCategory } from '../types';
import { Sparkles, Compass, Filter } from 'lucide-react';

interface ExperiencesViewProps {
  trips: Trip[];
  onSelectTrip: (trip: Trip) => void;
  onBookNow: (trip: Trip) => void;
  savedTripIds?: string[];
  onToggleSaveTrip?: (tripId: string) => void;
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = ({
  trips,
  onSelectTrip,
  onBookNow,
  savedTripIds = [],
  onToggleSaveTrip
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string>('ALL');

  const destinations = ['ALL', 'Kodaikanal', 'Ooty', 'Valparai', 'Kolli Hills', 'Meghamalai'];

  const filteredTrips = selectedDestination === 'ALL'
    ? trips
    : trips.filter(t => t.destination.toLowerCase().includes(selectedDestination.toLowerCase()));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF] text-[#202622]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8C3A5] border border-[#A8BFA3]/50 text-[#202622] text-xs font-mono font-bold">
            <Compass className="w-3.5 h-3.5 text-[#183A2A]" />
            <span>WEEKEND CHAPTERS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#183A2A]">
            Curated Experiences
          </h1>
          <p className="text-xs sm:text-sm text-[#202622]/80 font-medium">
            Handpicked stays, private trails, and small cohorts across Tamil Nadu.
          </p>
        </div>

        {/* Destination Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {destinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setSelectedDestination(dest)}
              className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedDestination === dest
                  ? 'bg-[#183A2A] text-[#F7F5EF] shadow-sm'
                  : 'bg-[#D8C3A5]/40 text-[#202622] hover:bg-[#D8C3A5] border border-[#A8BFA3]/60'
              }`}
            >
              {dest}
            </button>
          ))}
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onSelectTrip={onSelectTrip}
              onBookNow={onBookNow}
              isSaved={savedTripIds.includes(trip.id)}
              onToggleSave={onToggleSaveTrip}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
