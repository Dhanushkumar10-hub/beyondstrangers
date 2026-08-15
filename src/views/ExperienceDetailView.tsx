import React, { useState } from 'react';
import { Trip, ActiveTab } from '../types';
import { ArrowLeft, Clock, MapPin, Users, Check, X, ShieldCheck, Sparkles, Compass } from 'lucide-react';
import { TripHighlightBadge } from '../components/TripHighlightBadge';

interface ExperienceDetailViewProps {
  trip: Trip | null;
  onBack: () => void;
  onBookNow: (trip: Trip) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ExperienceDetailView: React.FC<ExperienceDetailViewProps> = ({
  trip,
  onBack,
  onBookNow,
  setActiveTab
}) => {
  if (!trip) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 text-center space-y-4 bg-[#F7F5EF]">
        <p className="text-sm font-mono text-[#202622]">Chapter not found.</p>
        <button onClick={onBack} className="btn-primary text-xs py-2 px-4">
          Return to Experiences
        </button>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState<string>(trip.heroImage);
  const spotsLeft = trip.totalSpots - trip.spotsTaken;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF] text-[#202622]">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#183A2A] hover:text-[#2F6B45]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL EXPERIENCES</span>
        </button>

        {/* Hero Gallery Container */}
        <div className="rounded-3xl overflow-hidden bg-white border border-[#A8BFA3] shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-[#D8C3A5]">
            <img
              src={activeImage}
              alt={`${trip.title} hero`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="bg-[#183A2A] text-[#F7F5EF] text-xs font-mono font-bold px-3 py-1 rounded-md uppercase">
                {trip.destination}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div>
                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                  {trip.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {trip.galleryImages && trip.galleryImages.length > 0 && (
            <div className="p-4 bg-[#F7F5EF] border-t border-[#A8BFA3]/30 flex items-center gap-2 overflow-x-auto">
              {[trip.heroImage, ...trip.galleryImages].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === img ? 'border-[#183A2A] scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Badges & Price Bar */}
        <div className="p-5 rounded-2xl bg-[#D8C3A5]/30 border border-[#A8BFA3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <TripHighlightBadge size="md" location={trip.destination} />
            <TripHighlightBadge size="md" duration={`${trip.durationDays}D / ${trip.durationNights}N`} />
            <TripHighlightBadge size="md" seatsLeft={spotsLeft} />
            {trip.difficulty && <TripHighlightBadge size="md" highlight={trip.difficulty} />}
          </div>

          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#202622]/70 uppercase block font-bold">All-Inclusive</span>
              <div className="text-2xl font-serif font-bold text-[#183A2A]">
                ₹{trip.price.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              onClick={() => onBookNow(trip)}
              className="btn-primary text-xs py-3 px-6"
            >
              RESERVE SPOT
            </button>
          </div>
        </div>

        {/* Overview & Itinerary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#A8BFA3] space-y-3">
              <h2 className="font-serif font-bold text-lg text-[#183A2A]">Overview</h2>
              <p className="text-xs text-[#202622]/80 leading-relaxed">{trip.overview}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#A8BFA3] space-y-4">
              <h2 className="font-serif font-bold text-lg text-[#183A2A]">Daily Schedule</h2>
              <div className="space-y-3">
                {trip.itinerary.map(day => (
                  <div key={day.day} className="bg-[#F7F5EF] p-4 rounded-xl border border-[#A8BFA3]/50 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold bg-[#183A2A] text-[#F7F5EF] px-2 py-0.5 rounded text-[10px]">
                        DAY {day.day}
                      </span>
                      <span className="font-mono text-[10px] text-[#202622]/70">{day.accommodation}</span>
                    </div>
                    <h4 className="font-bold text-[#183A2A] text-sm">{day.title}</h4>
                    <p className="text-[#202622]/80 leading-relaxed">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Details */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#A8BFA3] space-y-3 text-xs">
              <h3 className="font-serif font-bold text-base text-[#183A2A]">Inclusions</h3>
              <ul className="space-y-1.5 text-[#202622]/80">
                {trip.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2F6B45] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#A8BFA3] space-y-3 text-xs">
              <h3 className="font-serif font-bold text-base text-[#183A2A]">Cohort Logistics</h3>
              <div className="space-y-2 text-[#202622]/80">
                <div>
                  <span className="font-mono font-bold block text-[10px] text-[#183A2A]">MEETING POINT</span>
                  <span>{trip.meetingPoint}</span>
                </div>
                <div>
                  <span className="font-mono font-bold block text-[10px] text-[#183A2A]">STAY TYPE</span>
                  <span>{trip.accommodationType}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
