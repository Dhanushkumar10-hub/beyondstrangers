import React, { useState } from 'react';
import { ArrowRight, Filter } from 'lucide-react';
import { Trip, TribePersonality } from '../types';
import { DEMO_TRIPS } from '../data/mockData';
import { TripCard } from '../components/TripCard';

interface ExperiencesViewProps {
  onSelectTrip: (trip: Trip) => void;
  onOpenJoinModal: () => void;
  trips?: Trip[];
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = ({ 
  onSelectTrip, 
  onOpenJoinModal,
  trips = DEMO_TRIPS 
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedPersonality, setSelectedPersonality] = useState<TribePersonality | 'ALL'>('ALL');

  const filteredTrips = trips.filter((trip) => {
    const matchRegion = selectedRegion === 'ALL' || trip.region === selectedRegion;
    const matchPersonality = selectedPersonality === 'ALL' || trip.tribePersonalityMatch.includes(selectedPersonality);
    return matchRegion && matchPersonality;
  });

  return (
    <div className="bg-white text-[#0A0A0A] pt-24 pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
            CURATED SMALL GROUPS (10–12 TRAVELLERS)
          </div>
          <h1 className="text-[clamp(36px,4.5vw,58px)] font-bold font-serif-editorial text-[#0A0A0A] tracking-tight leading-tight">
            Upcoming Experiences
          </h1>
          <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed">
            Each chapter is intentionally crafted with private boutique stays, verified local captains, unscripted moments, and a balanced solo traveler dynamic.
          </p>
        </div>

        {/* Minimal Filters */}
        <div className="p-6 sm:p-8 bg-[#F7F7F5] border border-[#E5E5E5] grid grid-cols-1 sm:grid-cols-2 gap-6 shadow-xs">
          <div>
            <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#555555] block mb-2 font-semibold">
              Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-white border border-[#E5E5E5] px-4 py-3 text-sm sm:text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] font-medium"
            >
              <option value="ALL">All Regions in India</option>
              <option value="South India">South India (Munnar, Coorg)</option>
              <option value="North East">North East India (Meghalaya)</option>
              <option value="West India">West India (Goa)</option>
              <option value="North India & Himalayas">North India (Spiti Valley)</option>
            </select>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#555555] block mb-2 font-semibold">
              Tribe Personality
            </label>
            <select
              value={selectedPersonality}
              onChange={(e) => setSelectedPersonality(e.target.value as TribePersonality | 'ALL')}
              className="w-full bg-white border border-[#E5E5E5] px-4 py-3 text-sm sm:text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] font-medium"
            >
              <option value="ALL">All Traveler Archetypes</option>
              <option value="THE ADVENTURER">THE ADVENTURER</option>
              <option value="THE EXPLORER">THE EXPLORER</option>
              <option value="THE SOCIAL ONE">THE SOCIAL ONE</option>
              <option value="THE SLOW TRAVELLER">THE SLOW TRAVELLER</option>
              <option value="THE STORYTELLER">THE STORYTELLER</option>
            </select>
          </div>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onSelectTrip={onSelectTrip}
              onBookNow={onSelectTrip}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
