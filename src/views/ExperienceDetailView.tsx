import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Check, 
  X, 
  ShieldCheck, 
  ArrowRight,
  Info,
  Bed,
  Car,
  Coffee,
  Heart,
  ChevronDown
} from 'lucide-react';
import { Trip, ActiveTab } from '../types';
import { DEMO_TRAVELERS, VERIFIED_TRIP_LOCATIONS } from '../data/mockData';
import { JourneyMapSection } from '../components/JourneyMapSection';

interface ExperienceDetailViewProps {
  trip: Trip | null;
  onBack: () => void;
  onOpenBooking: (trip: Trip) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ExperienceDetailView: React.FC<ExperienceDetailViewProps> = ({ 
  trip, 
  onBack, 
  onOpenBooking,
  setActiveTab
}) => {
  const [activeItineraryDay, setActiveItineraryDay] = useState<number>(1);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-4 text-center space-y-6 bg-white text-[#0A0A0A]">
        <h2 className="text-3xl font-serif-editorial">Journey Not Found</h2>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-[#0A0A0A] text-white font-bold text-xs tracking-widest uppercase"
        >
          Return to Experiences
        </button>
      </div>
    );
  }

  const spotsRemaining = trip.totalSpots - trip.spotsTaken;
  const galleryImages = [trip.heroImage, ...(trip.galleryImages || [])];

  return (
    <div className="bg-white text-[#0A0A0A] pt-24 pb-32 space-y-20 selection:bg-[#0A0A0A] selection:text-white">
      
      {/* 00 — Top Nav & Location Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-3 text-sm sm:text-base font-bold tracking-wider uppercase text-[#0A0A0A] hover:text-[#555555] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>BACK TO EXPERIENCES</span>
        </button>

        <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
          {trip.destination} • CHAPTER {trip.id.toUpperCase()}
        </div>
      </div>

      {/* =========================================================================
          01 — TRIP TITLE & LARGE CINEMATIC PHOTOGRAPHY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-5xl">
          <div className="text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
            {trip.chapterBadge || 'EXPEDITION'}
          </div>
          <h1 className="text-[clamp(38px,5vw,68px)] font-bold font-serif-editorial text-[#0A0A0A] tracking-tight leading-[1.06]">
            {trip.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-[22px] text-[#444444] font-light max-w-3xl leading-relaxed">
            {trip.description}
          </p>
        </div>

        {/* Cinematic Main Photograph Frame */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden border border-[#E5E5E5] bg-[#F7F7F5] shadow-lg">
          <img
            src={galleryImages[activeGalleryIndex] || trip.heroImage}
            alt={trip.title}
            className="w-full h-full object-cover transition-all duration-700"
          />
        </div>

        {/* Gallery Thumbs */}
        {galleryImages.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveGalleryIndex(idx)}
                className={`relative w-28 h-20 border-2 overflow-hidden shrink-0 transition-all ${
                  activeGalleryIndex === idx ? 'border-[#0A0A0A] opacity-100 shadow-md' : 'border-[#E5E5E5] opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="preview" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Key Trip Summary Banner */}
        <div className="bg-[#F7F7F5] border border-[#E5E5E5] p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-1.5 font-medium">DATES</span>
              <span className="font-bold text-[#0A0A0A] text-base sm:text-lg">{trip.dates}</span>
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-1.5 font-medium">DURATION</span>
              <span className="font-bold text-[#0A0A0A] text-base sm:text-lg">{trip.durationDays}D / {trip.durationNights}N</span>
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-1.5 font-medium">GROUP SIZE</span>
              <span className="font-bold text-[#0A0A0A] text-base sm:text-lg">{trip.totalSpots} max ({spotsRemaining} left)</span>
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-1.5 font-medium">PRICE / PERSON</span>
              <span className="font-bold text-2xl sm:text-3xl font-serif-editorial text-[#0A0A0A]">{trip.currency}{trip.price.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={() => onOpenBooking(trip)}
            className="min-h-[56px] px-9 py-4 bg-[#0A0A0A] hover:bg-[#262626] text-white text-sm sm:text-base font-bold tracking-wider uppercase transition-colors shrink-0 shadow-md"
          >
            JOIN THIS JOURNEY
          </button>
        </div>

      </section>

      {/* =========================================================================
          02 — THE JOURNEY (EDITORIAL NARRATIVE & HIGHLIGHTS)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 pt-12 border-t border-[#E5E5E5]">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
              01 / OVERVIEW
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#0A0A0A]">
              The Journey
            </h2>
            <p className="text-base text-[#666666] leading-relaxed font-light">
              We focus on rare access, unscripted local hospitality, and thoughtful trail pacing rather than checking off generic tourist lists.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-8 text-[#333333] font-light leading-relaxed">
            <p className="text-lg sm:text-xl md:text-[22px] text-[#111111] leading-[1.65] font-normal">
              {trip.overview}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {trip.whatToBring.slice(0, 4).map((hl, i) => (
                <div key={i} className="p-6 bg-[#F7F7F5] border border-[#E5E5E5] space-y-2">
                  <div className="text-xs font-mono text-[#777777] font-semibold">0{i + 1}</div>
                  <div className="text-base sm:text-lg font-bold text-[#0A0A0A]">{hl}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          03 — ITINERARY (EDITORIAL TIMELINE)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 pt-20 border-t border-[#E5E5E5]">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
              02 / TIMELINE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#0A0A0A]">
              Day by Day
            </h2>
            <p className="text-base text-[#666666] leading-relaxed font-light">
              Carefully calibrated pacing with ample room for impromptu roadside chai, photography stops, and rest.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-8">
            {trip.itinerary.map((day) => (
              <div 
                key={day.day}
                className="p-8 sm:p-10 border border-[#E5E5E5] bg-white hover:border-[#0A0A0A] transition-colors space-y-5 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono font-bold bg-[#0A0A0A] text-white px-3.5 py-1.5">
                      DAY {day.day}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#0A0A0A]">
                      {day.title}
                    </h3>
                  </div>
                  {day.mealsIncluded && day.mealsIncluded.length > 0 && (
                    <span className="text-xs font-mono uppercase text-[#666666] border border-[#E5E5E5] px-3 py-1 bg-[#F7F7F5] font-medium">
                      Meals: {day.mealsIncluded.join(', ')}
                    </span>
                  )}
                </div>

                <p className="text-base sm:text-lg text-[#444444] font-light leading-relaxed">
                  {day.description}
                </p>

                {day.highlights && day.highlights.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2.5">
                    {day.highlights.map((act, idx) => (
                      <span key={idx} className="text-xs sm:text-sm text-[#444444] bg-[#F7F7F5] px-3.5 py-1.5 border border-[#E5E5E5] font-medium">
                        • {act}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          03.5 — THE JOURNEY: VERIFIED PHYSICAL LOCATIONS & MAP
          ========================================================================= */}
      <JourneyMapSection 
        locations={VERIFIED_TRIP_LOCATIONS} 
        compact={true}
      />

      {/* =========================================================================
          04 — WHAT'S INCLUDED & NOT INCLUDED
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 pt-20 border-t border-[#E5E5E5]">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
              03 / TRANSPARENCY
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#0A0A0A]">
              What's Included
            </h2>
            <p className="text-base text-[#666666] leading-relaxed font-light">
              No hidden fees, no surprise guide tips requested on-ground.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Included */}
            <div className="space-y-6 p-8 bg-[#F7F7F5] border border-[#E5E5E5]">
              <div className="text-sm font-mono font-bold uppercase tracking-wider text-[#0A0A0A]">
                Included in Your Journey
              </div>
              <ul className="space-y-4 text-base text-[#333333]">
                {trip.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0A0A0A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Included */}
            <div className="space-y-6 p-8 bg-white border border-[#E5E5E5]">
              <div className="text-sm font-mono font-bold uppercase tracking-wider text-[#666666]">
                Not Included
              </div>
              <ul className="space-y-4 text-base text-[#666666]">
                {trip.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-[#999999] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          05 — ACCOMMODATION & SAFETY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 pt-20 border-t border-[#E5E5E5]">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
              04 / COMFORT & TRUST
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#0A0A0A]">
              Stays & Safety
            </h2>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 border border-[#E5E5E5] space-y-4">
              <div className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#0A0A0A]">
                Handpicked Boutique Stays
              </div>
              <p className="text-base text-[#555555] leading-relaxed font-light">
                {trip.accommodationType || 'Heritage estate bungalows, traditional homestays, or high-altitude campsites with clean bedding, hot showers, and private group dining areas.'}
              </p>
            </div>

            <div className="p-8 border border-[#E5E5E5] space-y-4">
              <div className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#0A0A0A]">
                Female-Solo & First-Timer Safe
              </div>
              <p className="text-base text-[#555555] leading-relaxed font-light">
                Over 60% of our travelers are solo women. We ensure strict verified rooming by gender (or private solo room upgrades), zero-tolerance safety policies, and emergency protocols.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          06 — WHO YOU'LL TRAVEL WITH (TRIBE ROSTER PREVIEW)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 pt-20 border-t border-[#E5E5E5]">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
              05 / THE TRIBE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#0A0A0A]">
              Who You'll Travel With
            </h2>
            <p className="text-base text-[#666666] leading-relaxed font-light">
              Curated travelers from diverse creative, tech, design, and academic backgrounds across India.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {DEMO_TRAVELERS.slice(0, 4).map((trav) => (
                <div key={trav.id} className="p-5 border border-[#E5E5E5] bg-[#F7F7F5] flex items-center gap-5">
                  <img
                    src={trav.avatar}
                    alt={trav.name}
                    className="w-16 h-16 object-cover border border-[#E5E5E5]"
                  />
                  <div className="space-y-1">
                    <div className="text-base sm:text-lg font-bold text-[#0A0A0A]">{trav.name}</div>
                    <div className="text-xs sm:text-sm text-[#666666] font-mono">{trav.occupation} • {trav.city}</div>
                    <div className="text-xs sm:text-sm text-[#0A0A0A] font-semibold">Tribe: {trav.tribePersonality}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          07 — THE STRANGER SOCIETY (STRATEGIC CONTRAST MOMENT)
          ========================================================================= */}
      <section className="bg-[#0A0A0A] text-white py-32 my-14">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="text-sm font-mono uppercase tracking-[0.25em] text-[#AAAAAA] font-medium">
            THE STRANGER PROMISE
          </div>
          <h2 className="text-[clamp(36px,4.5vw,60px)] font-bold font-serif-editorial leading-tight">
            Arrive as strangers. Leave with stories.
          </h2>
          <p className="text-lg sm:text-xl text-[#CCCCCC] font-light max-w-xl mx-auto leading-relaxed">
            Ready to embark on this chapter? Reserve your spot today with a flexible deposit.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onOpenBooking(trip)}
              className="min-h-[58px] px-10 py-4 bg-white text-[#0A0A0A] font-bold text-base sm:text-lg tracking-wider uppercase hover:bg-[#E5E5E5] transition-colors shadow-lg"
            >
              RESERVE SPOT ({trip.currency}{trip.price.toLocaleString('en-IN')})
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar for Quick Booking */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E5E5E5] py-4 px-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#666666] uppercase block font-medium">{trip.dates}</span>
            <span className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#0A0A0A]">
              {trip.currency}{trip.price.toLocaleString('en-IN')} <span className="text-sm font-sans font-normal text-[#666666]">/ person</span>
            </span>
          </div>

          <button
            onClick={() => onOpenBooking(trip)}
            className="min-h-[48px] px-7 py-3 bg-[#0A0A0A] hover:bg-[#262626] text-white text-sm sm:text-base font-bold tracking-wider uppercase transition-colors"
          >
            BOOK NOW ({spotsRemaining} SPOTS LEFT)
          </button>
        </div>
      </div>

    </div>
  );
};
