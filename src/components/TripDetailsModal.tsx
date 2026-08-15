import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  ShieldCheck, 
  Calendar, 
  Bookmark, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { Trip, TravelerProfile } from '../types';
import { TripHighlightBadge } from './TripHighlightBadge';

interface TripDetailsModalProps {
  trip: Trip | null;
  onClose: () => void;
  onBookNow: (trip: Trip) => void;
  isSaved?: boolean;
  onToggleSave?: (tripId: string) => void;
  onViewTravelerProfile?: (traveler: TravelerProfile) => void;
}

export const TripDetailsModal: React.FC<TripDetailsModalProps> = ({
  trip,
  onClose,
  onBookNow,
  isSaved = false,
  onToggleSave
}) => {
  if (!trip) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'inclusions' | 'safety'>('overview');
  const [activeImage, setActiveImage] = useState<string>(trip.heroImage);

  const spotsLeft = trip.totalSpots - trip.spotsTaken;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#183A2A]/85 backdrop-blur-sm overflow-y-auto">
      <div 
        id="trip-details-dialog"
        className="relative w-full max-w-3xl bg-[#F7F5EF] border border-[#A8BFA3] rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh] text-[#202622]"
      >
        
        {/* Top Header Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {onToggleSave && (
            <button
              id={`btn-modal-save-${trip.id}`}
              onClick={() => onToggleSave(trip.id)}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors border border-white/20 ${
                isSaved ? 'bg-[#2F6B45] text-white' : 'bg-[#183A2A]/80 text-[#F7F5EF] hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          )}
          <button
            id="btn-close-trip-details"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#183A2A]/80 hover:bg-[#183A2A] text-[#F7F5EF] hover:text-white border border-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1">
          
          {/* Gallery Banner */}
          <div className="relative h-60 sm:h-72 bg-[#D8C3A5]">
            <img
              src={activeImage}
              alt={`${trip.title} in ${trip.destination}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F7F5EF] via-transparent to-black/30" />

            {/* Thumbnail Row */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 overflow-x-auto pb-1">
              {[trip.heroImage, ...(trip.galleryImages || [])].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-[#183A2A] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Gallery thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Title Overlay */}
            <div className="absolute top-4 left-4">
              <span className="bg-[#183A2A] text-[#F7F5EF] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider font-mono shadow-sm">
                {trip.chapterTitle || trip.destination}
              </span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-5 sm:p-6 space-y-5">
            
            {/* Title & Badges Bar */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                <TripHighlightBadge size="sm" location={trip.destination} />
                <TripHighlightBadge size="sm" duration={`${trip.durationDays}D / ${trip.durationNights}N`} />
                <TripHighlightBadge size="sm" seatsLeft={spotsLeft} />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#183A2A] leading-tight">
                {trip.title}
              </h2>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1.5 border-b border-[#A8BFA3]/40 pb-2 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'itinerary', label: 'Itinerary' },
                { id: 'inclusions', label: "What's Included" },
                { id: 'safety', label: 'Safety & Policy' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-trip-details-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-mono uppercase ${
                    activeTab === tab.id
                      ? 'bg-[#183A2A] text-[#F7F5EF]'
                      : 'text-[#202622]/70 hover:text-[#202622] hover:bg-[#D8C3A5]/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4 text-xs text-[#202622]/80">
                <div>
                  <h4 className="text-[10px] font-bold text-[#183A2A] uppercase tracking-wider mb-1 font-mono">About the Chapter</h4>
                  <p className="leading-relaxed text-[#202622]">{trip.overview}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#D8C3A5]/30 p-3.5 rounded-xl border border-[#A8BFA3]/60 space-y-1">
                    <span className="text-[10px] font-bold text-[#183A2A] uppercase font-mono">Meeting Point</span>
                    <p className="text-xs font-semibold text-[#202622]">{trip.meetingPoint || 'Central Pickup Point'}</p>
                  </div>
                  <div className="bg-[#D8C3A5]/30 p-3.5 rounded-xl border border-[#A8BFA3]/60 space-y-1">
                    <span className="text-[10px] font-bold text-[#183A2A] uppercase font-mono">Accommodation</span>
                    <p className="text-xs font-semibold text-[#202622]">{trip.accommodationType || 'Private Estate / Boutique Camp'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="space-y-3">
                {trip.itinerary.map((day) => (
                  <div key={day.day} className="bg-[#D8C3A5]/20 p-4 rounded-xl border border-[#A8BFA3]/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-[#183A2A] text-[#F7F5EF] px-2.5 py-0.5 rounded-md font-mono">
                        Day {day.day}
                      </span>
                      <span className="text-[11px] text-[#202622]/70 font-mono">{day.accommodation}</span>
                    </div>

                    <h4 className="font-bold text-[#183A2A] text-sm font-serif">{day.title}</h4>
                    <p className="text-xs text-[#202622]/80 leading-relaxed">{day.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: Inclusions */}
            {activeTab === 'inclusions' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#D8C3A5]/20 p-4 rounded-xl border border-[#A8BFA3]/60 space-y-2">
                  <h4 className="text-xs font-bold text-[#2F6B45] uppercase tracking-wider flex items-center gap-1 font-mono">
                    <Check className="w-3.5 h-3.5" /> Included
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#202622]/80">
                    {trip.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#2F6B45] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#D8C3A5]/20 p-4 rounded-xl border border-[#A8BFA3]/60 space-y-2">
                  <h4 className="text-xs font-bold text-[#9E3A3A] uppercase tracking-wider flex items-center gap-1 font-mono">
                    <X className="w-3.5 h-3.5" /> Excluded
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#202622]/80">
                    {trip.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#9E3A3A] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Safety */}
            {activeTab === 'safety' && (
              <div className="space-y-3">
                <div className="bg-[#D8C3A5]/20 p-4 rounded-xl border border-[#A8BFA3]/60 space-y-2">
                  <h4 className="text-xs font-bold text-[#183A2A] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2F6B45]" /> Safety Standards
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#202622]/80">
                    {trip.safetyNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-[#2F6B45] shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Sticky Footer Booking Bar */}
        <div className="p-4 bg-[#F7F5EF] border-t border-[#A8BFA3]/40 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-[#202622]/70 uppercase font-mono block">All-Inclusive</span>
            <div className="text-xl font-bold text-[#183A2A] font-serif">
              ₹{trip.price.toLocaleString('en-IN')}
            </div>
          </div>

          <button
            id="btn-details-reserve-spot"
            onClick={() => {
              onClose();
              onBookNow(trip);
            }}
            className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5"
          >
            <span>Reserve Spot</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
