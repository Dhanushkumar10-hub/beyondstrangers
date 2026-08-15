import React from 'react';
import { ArrowLeft, ArrowRight, Mountain, Calendar } from 'lucide-react';
import { Destination, Trip, ActiveTab } from '../types';
import { TripCard } from '../components/TripCard';

interface DestinationDetailViewProps {
  destination: Destination | null;
  onBack: () => void;
  onSelectTrip: (trip: Trip) => void;
  trips: Trip[];
  setActiveTab: (tab: ActiveTab) => void;
}

export const DestinationDetailView: React.FC<DestinationDetailViewProps> = ({
  destination,
  onBack,
  onSelectTrip,
  trips,
  setActiveTab
}) => {
  if (!destination) {
    return (
      <div className="pt-32 pb-24 text-center text-[#0A0A0A] bg-white space-y-4">
        <h2 className="text-2xl font-serif-editorial">Destination Not Found</h2>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-wider"
        >
          Return to Destinations
        </button>
      </div>
    );
  }

  const matchingTrips = trips.filter(t => 
    t.destination.toLowerCase().includes(destination.name.toLowerCase()) ||
    destination.name.toLowerCase().includes(t.destination.split(',')[0].toLowerCase())
  );

  return (
    <div className="bg-white text-[#0A0A0A] pt-24 pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Back Navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0A0A0A] hover:text-[#555555] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ALL DESTINATIONS</span>
        </button>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#777777]">
            {destination.region || destination.state}
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold font-serif-editorial text-[#0A0A0A]">
            {destination.name}
          </h1>
          <p className="text-base text-[#555555] font-light max-w-2xl">
            {destination.tagline || destination.subtitle}
          </p>

          <div className="relative aspect-[21/9] w-full overflow-hidden border border-[#E5E5E5] bg-[#F7F7F5]">
            <img
              src={destination.coverImage || destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[#E5E5E5]">
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#777777]">
              TERRAIN PROFILE
            </div>
            <h2 className="text-2xl font-bold font-serif-editorial text-[#0A0A0A]">
              Geography & Best Season
            </h2>
            <div className="space-y-2 text-xs text-[#555555] pt-2 font-mono">
              <div>Elevation: {destination.elevation || destination.altitude || '1,600m'}</div>
              <div>Best Window: {destination.bestSeason || 'October to March'}</div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6 text-sm text-[#444444] font-light leading-relaxed">
            <p>
              {destination.description || destination.shortDescription || destination.fullStory}
            </p>
          </div>
        </div>

        {/* Available Chapters */}
        <div className="space-y-8 pt-12 border-t border-[#E5E5E5]">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#777777]">
              ACTIVE EXPEDITIONS
            </div>
            <h2 className="text-3xl font-bold font-serif-editorial text-[#0A0A0A]">
              Chapters in {destination.name}
            </h2>
          </div>

          {matchingTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {matchingTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onSelectTrip={onSelectTrip}
                  onBookNow={onSelectTrip}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-[#F7F7F5] border border-[#E5E5E5] text-center space-y-3">
              <p className="text-xs text-[#666666]">
                New chapters for {destination.name} are currently being scouted and vetted.
              </p>
              <button
                onClick={() => { setActiveTab('experiences'); }}
                className="px-6 py-2.5 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-wider"
              >
                Browse All Active Trips
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
