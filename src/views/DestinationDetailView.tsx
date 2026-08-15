import React from 'react';
import { Destination, Trip } from '../types';
import { ArrowLeft, MapPin, Compass } from 'lucide-react';
import { TripCard } from '../components/TripCard';
import { TripHighlightBadge } from '../components/TripHighlightBadge';

interface DestinationDetailViewProps {
  destination: Destination | null;
  onBack: () => void;
  trips: Trip[];
  onSelectTrip: (trip: Trip) => void;
  onBookNow: (trip: Trip) => void;
  savedTripIds?: string[];
  onToggleSaveTrip?: (tripId: string) => void;
}

export const DestinationDetailView: React.FC<DestinationDetailViewProps> = ({
  destination,
  onBack,
  trips,
  onSelectTrip,
  onBookNow,
  savedTripIds = [],
  onToggleSaveTrip
}) => {
  if (!destination) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 text-center space-y-4 bg-[#F7F5EF]">
        <p className="text-sm font-mono text-[#202622]">Destination not found.</p>
        <button onClick={onBack} className="btn-primary text-xs py-2 px-4">
          Return to Destinations
        </button>
      </div>
    );
  }

  const matchingTrips = trips.filter(t => 
    t.destination.toLowerCase().includes(destination.name.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF] text-[#202622]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#183A2A] hover:text-[#2F6B45]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL DESTINATIONS</span>
        </button>

        {/* Hero Banner */}
        <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden bg-[#D8C3A5] border border-[#A8BFA3] shadow-sm">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202622]/80 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="bg-[#183A2A] text-[#F7F5EF] text-[10px] font-mono font-bold px-2.5 py-1 rounded uppercase">
              {destination.state}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F7F5EF]">
              {destination.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#F7F5EF]/90 max-w-xl">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="p-4 rounded-2xl bg-[#D8C3A5]/30 border border-[#A8BFA3] flex flex-wrap gap-2">
          {destination.highlights.map((hl, i) => (
            <TripHighlightBadge key={i} size="sm" highlight={hl} />
          ))}
        </div>

        {/* Matching Trips */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#183A2A]">
            Upcoming Chapters in {destination.name}
          </h2>

          {matchingTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingTrips.map(trip => (
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
          ) : (
            <div className="p-8 rounded-2xl bg-white border border-[#A8BFA3] text-center space-y-2">
              <p className="text-xs font-mono text-[#202622]">
                New cohorts for {destination.name} are currently being scheduled.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
