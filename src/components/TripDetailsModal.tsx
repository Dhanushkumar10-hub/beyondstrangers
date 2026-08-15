import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  Bookmark, 
  ArrowUpRight,
  ChevronRight,
  Info
} from 'lucide-react';
import { Trip, TravelerProfile } from '../types';

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
  onToggleSave,
  onViewTravelerProfile
}) => {
  if (!trip) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'travelers' | 'leader' | 'inclusions' | 'safety'>('overview');
  const [activeImage, setActiveImage] = useState<string>(trip.heroImage);

  const spotsLeft = trip.totalSpots - trip.spotsTaken;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        id="trip-details-dialog"
        className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
      >
        
        {/* Top Header Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {onToggleSave && (
            <button
              id={`btn-modal-save-${trip.id}`}
              onClick={() => onToggleSave(trip.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                isSaved ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900/80 text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-stone-950' : ''}`} />
            </button>
          )}
          <button
            id="btn-close-trip-details"
            onClick={onClose}
            className="p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-stone-300 hover:text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1">
          
          {/* Gallery Banner */}
          <div className="relative h-72 sm:h-96 bg-stone-950">
            <img
              src={activeImage}
              alt={trip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-black/40" />

            {/* Thumbnail Row */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 overflow-x-auto pb-1">
              {[trip.heroImage, ...trip.galleryImages].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-emerald-400 ring-2 ring-emerald-500/50 scale-105' : 'border-stone-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Gallery thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Title Overlay */}
            <div className="absolute top-6 left-6 right-16">
              <span className="bg-emerald-950/90 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-800/80 uppercase tracking-wider">
                {trip.category} • {trip.difficulty} Difficulty
              </span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Title & Key Specs */}
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 mb-2">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> {trip.destination}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-stone-400" /> {trip.durationDays} Days / {trip.durationNights} Nights</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {trip.rating} <span className="text-[9px] uppercase font-bold text-stone-500">(DEMO RATING)</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100 leading-tight">
                {trip.title}
              </h2>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'itinerary', label: 'Day-by-Day Itinerary' },
                { id: 'travelers', label: `Co-Travelers (${trip.joiningTravelers.length})` },
                { id: 'leader', label: 'Trip Leader' },
                { id: 'inclusions', label: "What's Included" },
                { id: 'safety', label: 'Safety & Policies' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-trip-details-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-800'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 text-sm text-stone-300">
                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Trip Overview</h4>
                  <p className="leading-relaxed text-stone-300">{trip.overview}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-1">
                    <span className="text-[11px] font-bold text-stone-500 uppercase">Meeting Point</span>
                    <p className="text-xs font-semibold text-stone-200">{trip.meetingPoint}</p>
                  </div>
                  <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-1">
                    <span className="text-[11px] font-bold text-stone-500 uppercase">Accommodation</span>
                    <p className="text-xs font-semibold text-stone-200">{trip.accommodationType}</p>
                  </div>
                </div>

                {/* Host Leader Teaser */}
                <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={trip.leader.avatar}
                      alt={trip.leader.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-600/50"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-stone-100">{trip.leader.name}</h4>
                      <p className="text-xs text-stone-400">{trip.leader.title} • {trip.leader.tripsHosted} Trips Hosted</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('leader')}
                    className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="space-y-4">
                {trip.itinerary.map((day) => (
                  <div key={day.day} className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full">
                        Day {day.day}
                      </span>
                      <span className="text-xs text-stone-400 font-medium">{day.accommodation}</span>
                    </div>

                    <h4 className="font-bold text-stone-100 text-base">{day.title}</h4>
                    <p className="text-xs text-stone-300 leading-relaxed">{day.description}</p>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-850 text-[11px] text-stone-400">
                      <span className="font-bold text-stone-300">Highlights:</span>
                      {day.highlights.map((h, i) => (
                        <span key={i} className="bg-stone-900 px-2.5 py-0.5 rounded-lg border border-stone-800 text-emerald-400 font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: Co-Travelers */}
            {activeTab === 'travelers' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-stone-100">Travelers Joining This Trip</h4>
                    <p className="text-xs text-stone-400">
                      {trip.spotsTaken} of {trip.totalSpots} spots filled by verified travelers (Demo content).
                    </p>
                  </div>
                  <span className="text-xs bg-emerald-950 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-800">
                    {spotsLeft} Spots Remaining
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trip.joiningTravelers.map((traveler) => (
                    <div key={traveler.id} className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex items-start gap-3">
                      <img src={traveler.avatar} alt={traveler.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-stone-100 text-xs truncate">{traveler.name}</h5>
                          <span className="text-[9px] bg-stone-900 text-stone-400 px-2 py-0.5 rounded uppercase font-bold">Demo</span>
                        </div>
                        <p className="text-[11px] text-stone-400 mt-0.5">{traveler.city} • {traveler.occupation}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {traveler.interests.map((int, i) => (
                            <span key={i} className="text-[9px] bg-stone-900 text-emerald-300 px-2 py-0.5 rounded">
                              {int}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Trip Leader */}
            {activeTab === 'leader' && (
              <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-4">
                <div className="flex items-center gap-4">
                  <img src={trip.leader.avatar} alt={trip.leader.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500" />
                  <div>
                    <h4 className="text-base font-bold text-stone-100">{trip.leader.name}</h4>
                    <p className="text-xs text-emerald-400 font-medium">{trip.leader.title}</p>
                    <p className="text-xs text-stone-400 mt-1">
                      {trip.leader.experienceYears} years exp • {trip.leader.tripsHosted} trips hosted • Rating {trip.leader.rating} (Demo)
                    </p>
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">{trip.leader.about}</p>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-stone-800">
                  <div>
                    <span className="text-stone-500 font-bold block text-[10px] uppercase">Specialty</span>
                    <span className="text-stone-200 font-medium">{trip.leader.specialty}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-bold block text-[10px] uppercase">Languages Spoken</span>
                    <span className="text-stone-200 font-medium">{trip.leader.languages.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Inclusions & Exclusions */}
            {activeTab === 'inclusions' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-emerald-950/30 p-5 rounded-2xl border border-emerald-900/50 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> What's Included
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-300">
                    {trip.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-3">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                    <X className="w-4 h-4 text-stone-500" /> What's Excluded
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-400">
                    {trip.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-stone-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Safety & Guidelines */}
            {activeTab === 'safety' && (
              <div className="space-y-4">
                <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-3">
                  <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Group Safety Guidelines
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-300">
                    {trip.safetyNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-xs text-stone-400 space-y-1">
                  <h5 className="font-bold text-stone-200">Cancellation Policy</h5>
                  <p>Full refund if cancelled 15 days prior to start date. 50% refund between 7-14 days. Non-refundable within 7 days of trip start.</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Sticky Footer Booking Bar */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Total Price per seat</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-stone-100 font-mono">
                {trip.currency}{trip.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-400">({spotsLeft} spots available)</span>
            </div>
          </div>

          <button
            id="btn-details-reserve-spot"
            onClick={() => {
              onClose();
              onBookNow(trip);
            }}
            className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-extrabold px-6 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xl hover:scale-105"
          >
            <span>Reserve Spot (Demo)</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
