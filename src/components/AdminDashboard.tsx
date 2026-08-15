import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  MapPin, 
  Ticket, 
  Users, 
  BookOpen, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  ExternalLink,
  Eye,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Save
} from 'lucide-react';
import { 
  AdminUser, 
  AdminSection, 
  Trip, 
  Destination, 
  BookingDetails, 
  TravelerProfile, 
  Testimonial, 
  MediaItem, 
  SiteSettings,
  VerifiedLocation
} from '../types';
import { VERIFIED_TRIP_LOCATIONS } from '../data/mockData';

interface AdminDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
  onViewPublicSite: () => void;
  // State and Dispatchers for live site synchronization
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
  destinations: Destination[];
  setDestinations: React.Dispatch<React.SetStateAction<Destination[]>>;
  bookings: BookingDetails[];
  setBookings: React.Dispatch<React.SetStateAction<BookingDetails[]>>;
  travelers: TravelerProfile[];
  setTravelers: React.Dispatch<React.SetStateAction<TravelerProfile[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  mediaLibrary: MediaItem[];
  setMediaLibrary: React.Dispatch<React.SetStateAction<MediaItem[]>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  verifiedLocations?: VerifiedLocation[];
  setVerifiedLocations?: React.Dispatch<React.SetStateAction<VerifiedLocation[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  onLogout,
  onViewPublicSite,
  trips,
  setTrips,
  destinations,
  setDestinations,
  bookings,
  setBookings,
  travelers,
  setTravelers,
  testimonials,
  setTestimonials,
  mediaLibrary,
  setMediaLibrary,
  siteSettings,
  setSiteSettings,
  verifiedLocations = VERIFIED_TRIP_LOCATIONS,
  setVerifiedLocations
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [isCreatingDestination, setIsCreatingDestination] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [isCreatingMedia, setIsCreatingMedia] = useState(false);
  const [editingLocation, setEditingLocation] = useState<VerifiedLocation | null>(null);
  const [isCreatingLocation, setIsCreatingLocation] = useState(false);
  const [localLocations, setLocalLocations] = useState<VerifiedLocation[]>(verifiedLocations);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Sync locations
  const activeLocationsList = localLocations;
  const updateLocationsState = (updater: (prev: VerifiedLocation[]) => VerifiedLocation[]) => {
    setLocalLocations(prev => {
      const next = updater(prev);
      if (setVerifiedLocations) setVerifiedLocations(next);
      return next;
    });
  };

  // Settings form local state
  const [tempSettings, setTempSettings] = useState<SiteSettings>(siteSettings);

  const showNotification = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(null), 3500);
  };

  // Metrics Calculations
  const totalSpots = trips.reduce((acc, t) => acc + (t.totalSpots || 12), 0);
  const filledSpots = trips.reduce((acc, t) => acc + (t.spotsTaken || 0), 0);
  const totalRevenue = bookings.filter(b => b.status === 'CONFIRMED').reduce((acc, b) => acc + b.totalAmount, 0);
  const publishedTripsCount = trips.filter(t => t.status === 'AVAILABLE' || t.status === 'FEW_SPOTS_LEFT').length;

  // Trip Management Handlers
  const handleSetFeaturedTrip = (tripId: string) => {
    setTrips(prev => prev.map(t => ({
      ...t,
      featured: t.id === tripId
    })));
    if (setSiteSettings) {
      setSiteSettings(prev => ({ ...prev, featuredTripId: tripId }));
    }
    const chosen = trips.find(t => t.id === tripId);
    showNotification(`"${chosen?.title || tripId}" is now set as the FEATURED / MOST RECENT trip on the homepage.`);
  };

  const handleSaveTrip = (tripToSave: Trip) => {
    if (tripToSave.featured) {
      // Unfeature all others
      if (setSiteSettings) {
        setSiteSettings(prev => ({ ...prev, featuredTripId: tripToSave.id }));
      }
    }
    
    if (isCreatingTrip) {
      setTrips(prev => {
        const cleaned = tripToSave.featured ? prev.map(t => ({ ...t, featured: false })) : prev;
        return [tripToSave, ...cleaned];
      });
      showNotification(`Created experience "${tripToSave.title}" successfully.`);
      setIsCreatingTrip(false);
    } else {
      setTrips(prev => prev.map(t => {
        if (t.id === tripToSave.id) return tripToSave;
        if (tripToSave.featured) return { ...t, featured: false };
        return t;
      }));
      showNotification(`Updated experience "${tripToSave.title}".`);
      setEditingTrip(null);
    }
  };

  const handleDeleteTrip = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete experience "${title}"?`)) {
      setTrips(prev => prev.filter(t => t.id !== id));
      showNotification(`Deleted experience "${title}".`);
    }
  };

  const handleToggleTripStatus = (id: string) => {
    setTrips(prev => prev.map(t => {
      if (t.id !== id) return t;
      const nextStatus = t.status === 'AVAILABLE' ? 'FEW_SPOTS_LEFT' : t.status === 'FEW_SPOTS_LEFT' ? 'COMING_SOON' : 'AVAILABLE';
      return { ...t, status: nextStatus };
    }));
    showNotification('Updated journey status.');
  };

  // Booking Status Handler
  const handleUpdateBookingStatus = (id: string, newStatus: 'CONFIRMED' | 'PENDING' | 'WAITLIST' | 'CANCELLED') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    showNotification(`Booking #${id} updated to ${newStatus}.`);
  };

  // Destination Handlers
  const handleSaveDestination = (dest: Destination) => {
    if (isCreatingDestination) {
      setDestinations(prev => [...prev, dest]);
      showNotification(`Created destination "${dest.name}".`);
      setIsCreatingDestination(false);
    } else {
      setDestinations(prev => prev.map(d => d.id === dest.id ? dest : d));
      showNotification(`Updated destination "${dest.name}".`);
      setEditingDestination(null);
    }
  };

  const handleDeleteDestination = (id: string, name: string) => {
    if (window.confirm(`Delete destination "${name}"?`)) {
      setDestinations(prev => prev.filter(d => d.id !== id));
      showNotification(`Deleted destination "${name}".`);
    }
  };

  // Media Management Handlers
  const handleSaveMedia = (mediaToSave: MediaItem) => {
    if (isCreatingMedia) {
      setMediaLibrary(prev => [mediaToSave, ...prev]);
      showNotification(`Added asset "${mediaToSave.title}" to media library.`);
      setIsCreatingMedia(false);
    } else {
      setMediaLibrary(prev => prev.map(m => m.id === mediaToSave.id ? mediaToSave : m));
      showNotification(`Updated asset "${mediaToSave.title}".`);
      setEditingMedia(null);
    }
  };

  const handleDeleteMedia = (id: string, title: string) => {
    if (window.confirm(`Delete media asset "${title}"?`)) {
      setMediaLibrary(prev => prev.filter(m => m.id !== id));
      showNotification(`Deleted asset "${title}".`);
    }
  };

  // Location Verification Handlers
  const handleSaveLocation = (loc: VerifiedLocation) => {
    if (isCreatingLocation) {
      updateLocationsState(prev => [loc, ...prev]);
      showNotification(`Added location "${loc.name}" to geographic registry.`);
      setIsCreatingLocation(false);
    } else {
      updateLocationsState(prev => prev.map(l => l.id === loc.id ? loc : l));
      showNotification(`Updated location "${loc.name}".`);
      setEditingLocation(null);
    }
  };

  const handleDeleteLocation = (id: string, name: string) => {
    if (window.confirm(`Delete location "${name}" from registry?`)) {
      updateLocationsState(prev => prev.filter(l => l.id !== id));
      showNotification(`Deleted location "${name}".`);
    }
  };

  const handleToggleLocationVerification = (id: string) => {
    updateLocationsState(prev => prev.map(l => {
      if (l.id !== id) return l;
      const nextStatus = l.verificationStatus === 'LOCATION_VERIFIED' ? 'PENDING_RECONNAISSANCE' : 'LOCATION_VERIFIED';
      return { 
        ...l, 
        verificationStatus: nextStatus,
        verifiedBy: nextStatus === 'LOCATION_VERIFIED' ? (adminUser.name || 'Dharsh') : undefined,
        verificationDate: nextStatus === 'LOCATION_VERIFIED' ? new Date().toISOString().split('T')[0] : undefined
      };
    }));
    showNotification('Toggled location verification status.');
  };

  const verifiedLocationsCount = activeLocationsList.filter(l => l.verificationStatus === 'LOCATION_VERIFIED').length;

  return (
    <div className="min-h-screen bg-[#090D0A] text-[#E2E8F0] flex font-sans antialiased">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0E1410] border-r border-[#1B2B20] flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#1B2B20]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#183B28] border border-[#2B6344] flex items-center justify-center text-[#52B788] font-bold text-sm">
                BS
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-wider">
                  BEYOND STRANGERS
                </h2>
                <p className="text-[10px] text-[#78A189] uppercase tracking-widest font-mono">
                  Society CMS
                </p>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveSection('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'overview'
                  ? 'bg-[#183625] text-white border border-[#2D6343]'
                  : 'text-neutral-400 hover:text-white hover:bg-[#121E17]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#52B788]" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveSection('experiences')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'experiences'
                  ? 'bg-[#183625] text-white border border-[#2D6343]'
                  : 'text-neutral-400 hover:text-white hover:bg-[#121E17]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#52B788]" />
              <span>Experiences ({trips.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('destinations')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'destinations'
                  ? 'bg-[#183625] text-white border border-[#2D6343]'
                  : 'text-neutral-400 hover:text-white hover:bg-[#121E17]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#52B788]" />
              <span>Destinations ({destinations.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('locations')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'locations'
                  ? 'bg-[#183625] text-white border border-[#2D6343]'
                  : 'text-neutral-400 hover:text-white hover:bg-[#121E17]'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#52B788]" />
              <div className="flex items-center justify-between w-full">
                <span>Location Verification</span>
                <span className="text-[10px] bg-[#142A1D] text-[#71C497] px-1.5 py-0.5 rounded-full border border-[#2B6344]/40">
                  {verifiedLocationsCount} ✓
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('bookings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'bookings'
                  ? 'bg-[#183625] text-white border border-[#2D6343]'
                  : 'text-neutral-400 hover:text-white hover:bg-[#121E17]'
              }`}
            >
              <Ticket className="w-4 h-4 text-[#52B788]" />
              <div className="flex items-center justify-between w-full">
                <span>Bookings & Inquiries</span>
                <span className="text-[10px] bg-[#142A1D] text-[#71C497] px-1.5 py-0.5 rounded-full">
                  {bookings.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('users')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'users'
                  ? 'bg-[#183625] text-white border border-[#2D6343]'
                  : 'text-neutral-400 hover:text-white hover:bg-[#121E17]'
              }`}
            >
              <Users className="w-4 h-4 text-[#52B788]" />
              <span>Traveler Directory ({travelers.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('stories')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'stories'
                  ? 'bg-[#183625] text-white border border-[#2D6343]'
                  : 'text-neutral-400 hover:text-white hover:bg-[#121E17]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#52B788]" />
              <span>Stories & Testimonials</span>
            </button>

            <button
              onClick={() => setActiveSection('media')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'media'
                  ? 'bg-[#183625] text-white border border-[#2D6343]'
                  : 'text-neutral-400 hover:text-white hover:bg-[#121E17]'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#52B788]" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'settings'
                  ? 'bg-[#183625] text-white border border-[#2D6343]'
                  : 'text-neutral-400 hover:text-white hover:bg-[#121E17]'
              }`}
            >
              <Settings className="w-4 h-4 text-[#52B788]" />
              <span>Site & Brand Settings</span>
            </button>
          </nav>
        </div>

        {/* User Footer & Public Site Trigger */}
        <div className="p-4 border-t border-[#1B2B20] space-y-2">
          <button
            onClick={onViewPublicSite}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#14231A] hover:bg-[#1B3324] border border-[#224430] text-xs text-[#8EC7A6] font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Public Site</span>
          </button>

          <div className="flex items-center justify-between pt-2 px-1">
            <div className="truncate">
              <p className="text-xs font-medium text-white truncate">{adminUser.name}</p>
              <p className="text-[10px] text-neutral-500 truncate">{adminUser.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg hover:bg-[#201010] text-neutral-400 hover:text-red-400 transition-colors"
              title="Logout from CMS"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top bar */}
        <header className="h-16 border-b border-[#1B2B20] bg-[#0E1410]/80 backdrop-blur-md px-8 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-white uppercase tracking-wider">
              {activeSection}
            </h1>
            <span className="text-[10px] font-mono bg-[#142B1E] text-[#52B788] px-2 py-0.5 rounded-full border border-[#255238]">
              LIVE DATABASE SYNC
            </span>
          </div>

          {actionSuccessMessage && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163625] border border-[#2E6B4A] text-xs text-[#A1E3BE] animate-in fade-in">
              <Check className="w-3.5 h-3.5 text-[#52B788]" />
              <span>{actionSuccessMessage}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={onViewPublicSite}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <span>beyondstrangers.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* CONTENT PANES */}
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* SECTION: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span>Published Chapters</span>
                    <Compass className="w-4 h-4 text-[#52B788]" />
                  </div>
                  <div className="text-3xl font-bold text-white">{publishedTripsCount}</div>
                  <div className="text-[11px] text-[#71C497] mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{trips.length} Total Curated</span>
                  </div>
                </div>

                <div className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span>Total Spots Filled</span>
                    <Users className="w-4 h-4 text-[#D4A373]" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {filledSpots} / {totalSpots}
                  </div>
                  <div className="w-full bg-[#18261E] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-[#52B788] h-full rounded-full"
                      style={{ width: `${Math.round((filledSpots / (totalSpots || 1)) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span>Active Bookings</span>
                    <Ticket className="w-4 h-4 text-[#6BA587]" />
                  </div>
                  <div className="text-3xl font-bold text-white">{bookings.length}</div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    {bookings.filter(b => b.status === 'CONFIRMED').length} Confirmed • {bookings.filter(b => b.status === 'PENDING').length} Pending
                  </div>
                </div>

                <div className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span>Est. Gross Revenue</span>
                    <TrendingUp className="w-4 h-4 text-[#52B788]" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-[#86C29E] mt-1 font-mono">
                    Avg. ₹{Math.round(totalRevenue / Math.max(bookings.length, 1)).toLocaleString('en-IN')} / booking
                  </div>
                </div>
              </div>

              {/* Live Journeys Roster & Featured Trip Selector */}
              <div className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl p-6 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1A2C21]">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Featured / Most Recent Trip on Homepage</span>
                      <span className="text-[10px] font-mono bg-[#1E4530] text-[#71C497] px-2 py-0.5 rounded border border-[#2D6646]">
                        LIVE HOMEPAGE TARGET
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-400">The selected trip automatically drives the homepage hero, pricing, dates, and media.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={trips.find(t => t.featured)?.id || siteSettings.featuredTripId || trips[0]?.id || ''}
                      onChange={(e) => handleSetFeaturedTrip(e.target.value)}
                      className="bg-[#152119] border border-[#2B6344] text-white text-xs rounded-xl px-3 py-2 font-medium"
                    >
                      {trips.map(t => (
                        <option key={t.id} value={t.id}>
                          ★ {t.title} ({t.destination}) — {t.startDate}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white">Live Journeys Roster</h3>
                    <p className="text-xs text-neutral-400">Current availability across active chapters</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingTrip(true);
                      setActiveSection('experiences');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1C4D35] hover:bg-[#256345] text-white text-xs font-medium transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Experience</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#1A2C21] text-neutral-400">
                        <th className="pb-3 font-medium">Chapter & Destination</th>
                        <th className="pb-3 font-medium">Dates</th>
                        <th className="pb-3 font-medium">Price</th>
                        <th className="pb-3 font-medium">Capacity</th>
                        <th className="pb-3 font-medium">Homepage</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#17261D]">
                      {trips.map(trip => {
                        const isFeatured = trip.featured || (siteSettings.featuredTripId === trip.id);
                        return (
                          <tr key={trip.id} className="hover:bg-[#141F18] transition-colors">
                            <td className="py-3.5">
                              <div className="font-semibold text-white flex items-center gap-1.5">
                                <span>{trip.title}</span>
                                {isFeatured && (
                                  <span className="text-[9px] bg-[#1F4C35] text-[#86E4AE] px-1.5 py-0.5 rounded font-mono font-bold">
                                    HOMEPAGE HERO
                                  </span>
                                )}
                              </div>
                              <div className="text-neutral-500 text-[11px]">{trip.chapterTitle} • {trip.destination}</div>
                            </td>
                            <td className="py-3.5 text-neutral-300">
                              {trip.durationDays}D / {trip.durationNights}N ({trip.startDate})
                            </td>
                            <td className="py-3.5 font-mono text-[#71C497]">
                              ₹{trip.price.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3.5">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-white">{trip.spotsTaken} / {trip.totalSpots}</span>
                                <div className="w-16 bg-[#1B2921] h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${trip.spotsTaken >= trip.totalSpots ? 'bg-red-500' : 'bg-[#52B788]'}`}
                                    style={{ width: `${Math.min((trip.spotsTaken / trip.totalSpots) * 100, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5">
                              <button
                                onClick={() => handleSetFeaturedTrip(trip.id)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                                  isFeatured
                                    ? 'bg-[#1C4D35] text-white border-[#3D855E] font-bold'
                                    : 'bg-[#121B15] text-neutral-400 border-[#223328] hover:text-white'
                                }`}
                              >
                                {isFeatured ? '★ FEATURED' : 'Set Featured'}
                              </button>
                            </td>
                            <td className="py-3.5">
                              <button
                                onClick={() => handleToggleTripStatus(trip.id)}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
                                  trip.status === 'AVAILABLE'
                                    ? 'bg-[#122A1E] text-[#52B788] border-[#225238]'
                                    : trip.status === 'FEW_SPOTS_LEFT'
                                    ? 'bg-[#2A2312] text-[#E0A96D] border-[#524422]'
                                    : 'bg-[#221717] text-neutral-400 border-neutral-700'
                                }`}
                              >
                                {trip.status.replace('_', ' ')}
                              </button>
                            </td>
                            <td className="py-3.5 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setEditingTrip(trip);
                                  setActiveSection('experiences');
                                }}
                                className="p-1.5 rounded-lg bg-[#18261E] hover:bg-[#22382B] text-neutral-300 hover:text-white"
                                title="Edit Experience"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: EXPERIENCES (CRUD) */}
          {activeSection === 'experiences' && (
            <div className="space-y-6">
              {/* Header with Search and Create CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search experiences..."
                    className="w-full bg-[#121A15] border border-[#1E2E23] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#438863]"
                  />
                </div>

                <button
                  onClick={() => {
                    setEditingTrip({
                      id: `trip-${Date.now()}`,
                      slug: `journey-${Date.now()}`,
                      title: 'NEW JOURNEY',
                      chapterTitle: 'Into the Unknown',
                      destination: 'Wayanad, Kerala',
                      region: 'South India',
                      durationDays: 3,
                      durationNights: 2,
                      price: 7999,
                      currency: '₹',
                      category: 'Adventure',
                      tribePersonalityMatch: ['THE ADVENTURER', 'THE EXPLORER'],
                      difficulty: 'Moderate',
                      totalSpots: 12,
                      spotsTaken: 0,
                      status: 'AVAILABLE',
                      rating: 4.9,
                      reviewsCount: 0,
                      heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
                      galleryImages: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'],
                      startDate: '2026-11-14',
                      endDate: '2026-11-16',
                      meetingPoint: 'Kochi Airport / Calicut Railway Station',
                      accommodationType: 'Forest Homestay & Treehouses',
                      overview: 'Join 12 curious travelers for an offbeat escape into uncharted wilderness.',
                      itinerary: [
                        {
                          day: 1,
                          dayTitle: 'DAY 01 — ARRIVE',
                          title: 'Arrival & Welcome Circle',
                          description: 'Meet the tribe and head into our private forest retreat.',
                          mealsIncluded: ['Lunch', 'Campfire Dinner'],
                          accommodation: 'Forest Retreat',
                          highlights: ['Ice-breaker', 'Sunset tea']
                        }
                      ],
                      inclusions: ['2 Nights accommodation', 'All meals & tea', 'Local guides'],
                      exclusions: ['Travel to pickup location'],
                      whatToBring: ['Walking boots', 'Warm sweater'],
                      leader: trips[0]?.leader || {
                        id: 'leader-1',
                        name: 'Dharsh',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                        title: 'Founder & Chief Experience Lead',
                        experienceYears: 5,
                        tripsHosted: 42,
                        rating: 4.98,
                        about: 'Founder of Beyond Strangers.',
                        languages: ['English', 'Hindi'],
                        specialty: 'Campfire Stories',
                        isDemo: false
                      },
                      joiningTravelers: [],
                      safetyNotes: ['Zero-harassment strictly enforced']
                    });
                    setIsCreatingTrip(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C4D35] hover:bg-[#256345] text-white text-xs font-semibold tracking-wider transition-colors shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD NEW EXPERIENCE</span>
                </button>
              </div>

              {/* Experience Edit Form Modal/Drawer */}
              {editingTrip && (
                <div className="bg-[#101813] border border-[#274633] rounded-2xl p-6 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#1E3326]">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {isCreatingTrip ? 'Create New Experience' : `Edit Experience: ${editingTrip.title}`}
                      </h3>
                      <p className="text-xs text-neutral-400">Updates will dynamically reflect across the public website</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingTrip(null);
                          setIsCreatingTrip(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#1C2620] hover:bg-[#27382D] text-xs text-neutral-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveTrip(editingTrip)}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#1E543A] hover:bg-[#2A7551] text-xs font-semibold text-white"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Experience</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Title (e.g. MUNNAR)</label>
                      <input
                        type="text"
                        value={editingTrip.title}
                        onChange={(e) => setEditingTrip({ ...editingTrip, title: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Chapter Title (e.g. The First Chapter)</label>
                      <input
                        type="text"
                        value={editingTrip.chapterTitle}
                        onChange={(e) => setEditingTrip({ ...editingTrip, chapterTitle: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Destination & State</label>
                      <input
                        type="text"
                        value={editingTrip.destination}
                        onChange={(e) => setEditingTrip({ ...editingTrip, destination: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Price (₹ INR)</label>
                      <input
                        type="number"
                        value={editingTrip.price}
                        onChange={(e) => setEditingTrip({ ...editingTrip, price: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Total Spots</label>
                      <input
                        type="number"
                        value={editingTrip.totalSpots}
                        onChange={(e) => setEditingTrip({ ...editingTrip, totalSpots: parseInt(e.target.value) || 12 })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Spots Filled</label>
                      <input
                        type="number"
                        value={editingTrip.spotsTaken}
                        onChange={(e) => setEditingTrip({ ...editingTrip, spotsTaken: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-neutral-300 font-medium mb-1">Hero Image URL</label>
                      <input
                        type="text"
                        value={editingTrip.heroImage}
                        onChange={(e) => setEditingTrip({ ...editingTrip, heroImage: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                      />
                    </div>

                    {/* Regional Map Poster & Public On-Demand Settings */}
                    <div className="md:col-span-3 p-4 bg-[#0A120D] border border-[#1F3A29] rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <span>The Journey: Poster & Interactive Map Settings</span>
                          </h5>
                          <p className="text-[11px] text-neutral-400">
                            Configure responsive poster image fallbacks and user-demand map permissions.
                          </p>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer bg-[#142319] border border-[#234832] px-3 py-1.5 rounded-xl">
                          <input
                            type="checkbox"
                            checked={editingTrip.isPublicMapAllowed ?? true}
                            onChange={(e) => setEditingTrip({ ...editingTrip, isPublicMapAllowed: e.target.checked })}
                            className="rounded accent-[#52B788]"
                          />
                          <span className="text-xs font-semibold text-white">
                            Allow Public Interactive Map
                          </span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-neutral-300 font-medium mb-1">Poster WebP URL (Optimized)</label>
                          <input
                            type="text"
                            placeholder="https://.../poster.webp"
                            value={editingTrip.posterWebP || ''}
                            onChange={(e) => setEditingTrip({ ...editingTrip, posterWebP: e.target.value })}
                            className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-300 font-medium mb-1">Poster JPG Fallback URL</label>
                          <input
                            type="text"
                            placeholder="https://.../poster.jpg"
                            value={editingTrip.posterJpg || ''}
                            onChange={(e) => setEditingTrip({ ...editingTrip, posterJpg: e.target.value })}
                            className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-neutral-300 font-medium mb-1">
                            Poster Alt Text <span className="text-red-400 font-bold">* Required for Accessibility</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Regional topographical map for Gavi and Thekkady, Western Ghats"
                            value={editingTrip.posterAlt || ''}
                            onChange={(e) => setEditingTrip({ ...editingTrip, posterAlt: e.target.value })}
                            className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white text-xs"
                          />
                        </div>
                      </div>

                      {/* Poster Preview */}
                      {(editingTrip.posterWebP || editingTrip.posterJpg) && (
                        <div className="pt-2">
                          <span className="text-[10px] font-mono text-neutral-400 block mb-1">POSTER PREVIEW:</span>
                          <div className="h-28 rounded-xl overflow-hidden border border-[#22382B] relative max-w-sm">
                            <img
                              src={editingTrip.posterWebP || editingTrip.posterJpg}
                              alt={editingTrip.posterAlt || 'Poster Preview'}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-1.5 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white font-mono">
                              {editingTrip.posterAlt ? `Alt: "${editingTrip.posterAlt}"` : '⚠️ Missing alt text'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sensitive Admin-Only Coordinates & Reconnaissance */}
                    <div className="md:col-span-3 p-4 bg-[#140F0A] border border-[#3E2514] rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                          <h5 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                            Internal Coordinates & Verification Notes
                          </h5>
                        </div>
                        <span className="text-[9px] font-mono bg-amber-950 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded">
                          ADMIN ONLY • STRIPPED FROM PUBLIC UI & API
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        Latitude, longitude, and raw verification memos are stored securely for internal expedition leads and are never exposed in public JSON responses.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-neutral-300 font-medium mb-1">Latitude (Decimal)</label>
                          <input
                            type="number"
                            step="0.000001"
                            placeholder="9.432000"
                            value={editingTrip.adminLatitude || 9.432}
                            onChange={(e) => setEditingTrip({ ...editingTrip, adminLatitude: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-300 font-medium mb-1">Longitude (Decimal)</label>
                          <input
                            type="number"
                            step="0.000001"
                            placeholder="77.164000"
                            value={editingTrip.adminLongitude || 77.164}
                            onChange={(e) => setEditingTrip({ ...editingTrip, adminLongitude: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-300 font-medium mb-1">Internal Verification Status</label>
                          <select
                            value={editingTrip.adminVerificationStatus || 'LOCATION_VERIFIED'}
                            onChange={(e) => setEditingTrip({ ...editingTrip, adminVerificationStatus: e.target.value })}
                            className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white text-xs"
                          >
                            <option value="LOCATION_VERIFIED">LOCATION VERIFIED ✓</option>
                            <option value="PENDING_RECONNAISSANCE">PENDING RECONNAISSANCE</option>
                            <option value="OFFICIAL_PERMIT_ACQUIRED">OFFICIAL PERMIT ACQUIRED</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-neutral-300 font-medium mb-1">Editorial Overview</label>
                      <textarea
                        rows={3}
                        value={editingTrip.overview}
                        onChange={(e) => setEditingTrip({ ...editingTrip, overview: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl p-3 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Experiences Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trips
                  .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.destination.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(trip => (
                    <div key={trip.id} className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl p-5 shadow-lg flex gap-4">
                      <img
                        src={trip.heroImage}
                        alt={trip.title}
                        className="w-28 h-28 object-cover rounded-xl shrink-0 border border-[#253B2D]"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#52B788] uppercase tracking-wider">
                              {trip.chapterTitle}
                            </span>
                            <span className="text-[10px] bg-[#142A1D] text-[#71C497] px-2 py-0.5 rounded-full border border-[#26533B]">
                              {trip.status}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white mt-0.5">{trip.title}</h4>
                          <p className="text-xs text-neutral-400">{trip.destination}</p>
                          <p className="text-xs text-[#71C497] font-mono mt-1 font-semibold">
                            ₹{trip.price.toLocaleString('en-IN')} • {trip.spotsTaken}/{trip.totalSpots} spots
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-[#18261E]">
                          <button
                            onClick={() => {
                              setEditingTrip(trip);
                              setIsCreatingTrip(false);
                            }}
                            className="flex items-center gap-1 text-xs text-neutral-300 hover:text-white px-2.5 py-1 rounded-lg bg-[#16231B] hover:bg-[#203327]"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTrip(trip.id, trip.title)}
                            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 px-2.5 py-1 rounded-lg bg-red-950/30 hover:bg-red-900/40"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SECTION: DESTINATIONS */}
          {activeSection === 'destinations' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-white">Curated Regions & Destinations</h3>
                  <p className="text-xs text-neutral-400">Manage destination stories, photos, and altitude guides</p>
                </div>
                <button
                  onClick={() => {
                    setEditingDestination({
                      id: `dest-${Date.now()}`,
                      slug: `destination-${Date.now()}`,
                      name: 'NEW DESTINATION',
                      subtitle: 'Untouched Wilderness',
                      stateCountry: 'India',
                      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
                      shortDescription: 'Spectacular wilderness landscape.',
                      fullStory: 'Detailed editorial story.',
                      region: 'South India',
                      activeTripsCount: 0,
                      highlights: ['Scenic viewpoints', 'Local culture'],
                      bestSeason: 'October – March',
                      altitude: '1,200m'
                    });
                    setIsCreatingDestination(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C4D35] hover:bg-[#256345] text-white text-xs font-semibold tracking-wider transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD DESTINATION</span>
                </button>
              </div>

              {/* Destination Form */}
              {editingDestination && (
                <div className="bg-[#101813] border border-[#274633] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
                  <div className="flex justify-between items-center pb-3 border-b border-[#1E3326]">
                    <h4 className="text-sm font-bold text-white">
                      {isCreatingDestination ? 'Create Destination' : `Edit ${editingDestination.name}`}
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingDestination(null);
                          setIsCreatingDestination(false);
                        }}
                        className="px-3 py-1 bg-[#1C2620] text-neutral-300 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveDestination(editingDestination)}
                        className="px-3 py-1 bg-[#1E543A] text-white font-semibold rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-300 mb-1">Destination Name</label>
                      <input
                        type="text"
                        value={editingDestination.name}
                        onChange={(e) => setEditingDestination({ ...editingDestination, name: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={editingDestination.subtitle}
                        onChange={(e) => setEditingDestination({ ...editingDestination, subtitle: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-neutral-300 mb-1">Hero Photo URL</label>
                      <input
                        type="text"
                        value={editingDestination.image}
                        onChange={(e) => setEditingDestination({ ...editingDestination, image: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-neutral-300 mb-1">Full Editorial Story</label>
                      <textarea
                        rows={3}
                        value={editingDestination.fullStory || ''}
                        onChange={(e) => setEditingDestination({ ...editingDestination, fullStory: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl p-3 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {destinations.map(dest => (
                  <div key={dest.id} className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl overflow-hidden shadow-lg">
                    <img src={dest.image} alt={dest.name} className="w-full h-36 object-cover" />
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-white">{dest.name}</h4>
                          <p className="text-[11px] text-[#71C497]">{dest.subtitle}</p>
                        </div>
                        {dest.comingSoon && (
                          <span className="text-[9px] bg-[#2A2312] text-[#E0A96D] px-1.5 py-0.5 rounded border border-[#524422]">
                            COMING SOON
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2">{dest.shortDescription}</p>
                      <div className="flex justify-end gap-2 pt-2 border-t border-[#17261D]">
                        <button
                          onClick={() => {
                            setEditingDestination(dest);
                            setIsCreatingDestination(false);
                          }}
                          className="text-xs text-neutral-300 hover:text-white px-2 py-1 rounded bg-[#16231B]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDestination(dest.id, dest.name)}
                          className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-950/30"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: LOCATION VERIFICATION DESK */}
          {activeSection === 'locations' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0F1612] border border-[#1E2E23] p-5 rounded-2xl">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-wide">
                      Location Verification Registry
                    </h3>
                    <span className="text-[10px] font-mono bg-[#142A1D] text-[#71C497] border border-[#2B6344] px-2 py-0.5 rounded-full">
                      GOOGLE MAPS VALIDATED
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
                    Every destination, landmark, and activity point must correspond to real physical geography. Verify coordinates, landmarks, and Google Maps references before publishing.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    const newLoc: VerifiedLocation = {
                      id: `loc-${Date.now()}`,
                      name: '',
                      districtRegion: 'Kerala, India',
                      category: 'NATURE',
                      lat: 9.4357,
                      lng: 77.1656,
                      googleMapsUrl: 'https://www.google.com/maps',
                      verificationStatus: 'LOCATION_VERIFIED',
                      verifiedBy: adminUser.name || 'Dharsh (Founder)',
                      verificationDate: new Date().toISOString().split('T')[0],
                      description: '',
                      activityTags: ['NATURE'],
                      verifiedLandmarkNotes: '',
                      associatedTripId: 'trip-gavi-thekkady'
                    };
                    setEditingLocation(newLoc);
                    setIsCreatingLocation(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1C4D35] hover:bg-[#256345] text-white text-xs font-semibold rounded-xl transition-colors shrink-0 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Real Location</span>
                </button>
              </div>

              {/* Edit/Create Location Drawer */}
              {(editingLocation || isCreatingLocation) && editingLocation && (
                <div className="bg-[#0F1612] border border-[#284934] rounded-2xl p-6 shadow-2xl space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#1E2E23]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#52B788]" />
                      <h4 className="text-sm font-bold text-white">
                        {isCreatingLocation ? 'Register New Physical Location' : `Edit Location: ${editingLocation.name}`}
                      </h4>
                      <span className="text-[9px] font-mono bg-amber-950 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded">
                        INTERNAL ADMIN DATA
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setEditingLocation(null);
                        setIsCreatingLocation(false);
                      }}
                      className="text-neutral-400 hover:text-white text-xs font-mono"
                    >
                      CANCEL
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Location Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Gavi Eco-Sanctuary & Forest Trail"
                        value={editingLocation.name}
                        onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">District / State Region *</label>
                      <input
                        type="text"
                        placeholder="e.g. Pathanamthitta District, Kerala"
                        value={editingLocation.districtRegion}
                        onChange={(e) => setEditingLocation({ ...editingLocation, districtRegion: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Category</label>
                      <select
                        value={editingLocation.category}
                        onChange={(e) => setEditingLocation({ ...editingLocation, category: e.target.value as any })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      >
                        <option value="FOREST">Forest / Sanctuary</option>
                        <option value="BOATING">Boating / Lake</option>
                        <option value="WATERFALL">Waterfall / Natural Dip</option>
                        <option value="VIEWPOINT">Viewpoint / Ridge</option>
                        <option value="CULTURAL">Cultural / Heritage</option>
                        <option value="STAY">Camp / Stay Site</option>
                        <option value="NATURE">Nature / Trail</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Latitude (Decimal) *</label>
                      <input
                        type="number"
                        step="0.0001"
                        placeholder="9.4357"
                        value={editingLocation.lat}
                        onChange={(e) => setEditingLocation({ ...editingLocation, lat: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Longitude (Decimal) *</label>
                      <input
                        type="number"
                        step="0.0001"
                        placeholder="77.1656"
                        value={editingLocation.lng}
                        onChange={(e) => setEditingLocation({ ...editingLocation, lng: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Elevation (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. 1,036 m (3,400 ft)"
                        value={editingLocation.elevation || ''}
                        onChange={(e) => setEditingLocation({ ...editingLocation, elevation: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-neutral-300 font-medium mb-1">Google Maps Reference URL *</label>
                      <input
                        type="text"
                        placeholder="https://www.google.com/maps/place/..."
                        value={editingLocation.googleMapsUrl}
                        onChange={(e) => setEditingLocation({ ...editingLocation, googleMapsUrl: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Verification Status</label>
                      <select
                        value={editingLocation.verificationStatus}
                        onChange={(e) => setEditingLocation({ ...editingLocation, verificationStatus: e.target.value as any })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      >
                        <option value="LOCATION_VERIFIED">LOCATION VERIFIED ✓</option>
                        <option value="PENDING_RECONNAISSANCE">PENDING RECONNAISSANCE</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-neutral-300 font-medium mb-1">Geographic & Operational Description</label>
                      <textarea
                        rows={2}
                        placeholder="Physical attributes, terrain access guidelines, and verified natural features..."
                        value={editingLocation.description}
                        onChange={(e) => setEditingLocation({ ...editingLocation, description: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl p-3 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-neutral-300 font-medium mb-1">Verified Landmark Reference Notes</label>
                      <input
                        type="text"
                        placeholder="e.g. KFDC Forest Range Reception, Kochupampa Lake Boating Jetty"
                        value={editingLocation.verifiedLandmarkNotes || ''}
                        onChange={(e) => setEditingLocation({ ...editingLocation, verifiedLandmarkNotes: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Activity Tags (comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. BOATING, RAINFOREST, TREK"
                        value={editingLocation.activityTags.join(', ')}
                        onChange={(e) => setEditingLocation({ 
                          ...editingLocation, 
                          activityTags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                        })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-[#1E2E23]">
                    <button
                      onClick={() => {
                        setEditingLocation(null);
                        setIsCreatingLocation(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-transparent border border-[#22382B] text-neutral-400 hover:text-white text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!editingLocation.name || !editingLocation.googleMapsUrl) {
                          alert('Please provide location name and Google Maps reference URL.');
                          return;
                        }
                        handleSaveLocation(editingLocation);
                      }}
                      className="px-5 py-2 rounded-xl bg-[#1C4D35] hover:bg-[#256345] text-white text-xs font-semibold tracking-wider"
                    >
                      Save Verified Location
                    </button>
                  </div>
                </div>
              )}

              {/* Location Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeLocationsList.map(loc => (
                  <div key={loc.id} className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#71C497] bg-[#142A1D] px-2 py-0.5 rounded border border-[#2B6344]/40">
                            {loc.category}
                          </span>
                          <h4 className="text-sm font-bold text-white mt-1.5 leading-snug">
                            {loc.name}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-0.5 font-light">
                            {loc.districtRegion}
                          </p>
                        </div>

                        <button
                          onClick={() => handleToggleLocationVerification(loc.id)}
                          title="Click to toggle verification status"
                          className={`text-[10px] font-mono px-2 py-1 rounded font-medium border shrink-0 transition-colors ${
                            loc.verificationStatus === 'LOCATION_VERIFIED'
                              ? 'bg-[#122A1E] text-[#52B788] border-[#225036] hover:bg-[#163827]'
                              : 'bg-amber-950/40 text-amber-300 border-amber-800/40 hover:bg-amber-900/40'
                          }`}
                        >
                          {loc.verificationStatus === 'LOCATION_VERIFIED' ? 'VERIFIED ✓' : 'UNVERIFIED ⚠️'}
                        </button>
                      </div>

                      {/* Coordinates & Landmark note */}
                      <div className="p-2.5 bg-[#141F18] border border-[#1B2D21] rounded-xl text-[11px] font-mono space-y-1">
                        <div className="flex justify-between text-neutral-300">
                          <span className="text-neutral-500">COORDINATES:</span>
                          <span className="text-[#8EC7A6]">{loc.lat.toFixed(4)}° N, {loc.lng.toFixed(4)}° E</span>
                        </div>
                        {loc.elevation && (
                          <div className="flex justify-between text-neutral-300">
                            <span className="text-neutral-500">ELEVATION:</span>
                            <span>{loc.elevation}</span>
                          </div>
                        )}
                        {loc.verifiedLandmarkNotes && (
                          <div className="text-neutral-400 text-[10px] pt-1 border-t border-[#1C2C22]">
                            <span className="text-neutral-500">LANDMARK: </span>
                            {loc.verifiedLandmarkNotes}
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {loc.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {loc.activityTags.map((tag, idx) => (
                          <span key={idx} className="text-[9px] font-mono bg-[#16231B] text-neutral-400 px-1.5 py-0.5 rounded border border-[#213326]">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#17261D] flex items-center justify-between">
                      <a
                        href={loc.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#52B788] hover:underline flex items-center gap-1 font-mono"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Google Maps</span>
                      </a>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingLocation(loc);
                            setIsCreatingLocation(false);
                          }}
                          className="text-xs text-neutral-300 hover:text-white px-2.5 py-1 rounded bg-[#16231B] border border-[#213326]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteLocation(loc.id, loc.name)}
                          className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-950/30 border border-red-900/30"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: BOOKINGS */}
          {activeSection === 'bookings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Traveler Bookings & Inquiries</h3>
                <p className="text-xs text-neutral-400">Live booking registrations and roommate preferences</p>
              </div>

              <div className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl p-6 shadow-xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#1A2C21] text-neutral-400">
                      <th className="pb-3 font-medium">Ref & Date</th>
                      <th className="pb-3 font-medium">Traveler Contact</th>
                      <th className="pb-3 font-medium">Journey</th>
                      <th className="pb-3 font-medium">Personality & Roommate</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#17261D]">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-[#141F18]">
                        <td className="py-3.5 font-mono">
                          <div className="text-white font-semibold">{b.bookingReference}</div>
                          <div className="text-neutral-500 text-[10px]">{b.bookingDate}</div>
                        </td>
                        <td className="py-3.5">
                          <div className="text-white font-medium">{b.contactName}</div>
                          <div className="text-neutral-400 text-[11px]">{b.contactEmail} • {b.contactPhone}</div>
                        </td>
                        <td className="py-3.5 text-neutral-300">
                          {b.tripTitle} ({b.travelerCount} spot{b.travelerCount > 1 ? 's' : ''})
                        </td>
                        <td className="py-3.5">
                          <span className="text-[10px] bg-[#16291E] text-[#86C29E] px-2 py-0.5 rounded-full border border-[#244933]">
                            {b.tribePersonality}
                          </span>
                          {b.roommatePreference && (
                            <div className="text-[10px] text-neutral-500 mt-1">Pref: {b.roommatePreference}</div>
                          )}
                        </td>
                        <td className="py-3.5 font-mono text-[#71C497] font-semibold">
                          ₹{b.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5">
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as 'CONFIRMED' | 'PENDING' | 'WAITLIST' | 'CANCELLED')}
                            className="bg-[#14231A] border border-[#224430] text-xs text-white rounded-lg px-2 py-1 focus:outline-none"
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="PENDING">PENDING</option>
                            <option value="WAITLIST">WAITLIST</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: USERS & TRAVELLERS */}
          {activeSection === 'users' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Society Member Directory</h3>
                <p className="text-xs text-neutral-400">Verified travelers, personality archetypes, and digital pass holders</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {travelers.map(trav => (
                  <div key={trav.id} className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl p-5 shadow-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={trav.avatar}
                        alt={trav.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#274633]"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{trav.name}</h4>
                        <p className="text-xs text-neutral-400">{trav.city} • {trav.occupation}</p>
                      </div>
                    </div>

                    <div className="text-xs text-neutral-300 italic line-clamp-2">
                      "{trav.bio}"
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className="text-[10px] bg-[#162D21] text-[#71C497] px-2 py-0.5 rounded-full border border-[#26533B]">
                        {trav.tribePersonality}
                      </span>
                      {trav.badges.map((b, i) => (
                        <span key={i} className="text-[10px] bg-[#1B2620] text-neutral-400 px-2 py-0.5 rounded-full">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: MEDIA LIBRARY */}
          {activeSection === 'media' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">Media Asset & Instagram Library</h3>
                  <p className="text-xs text-neutral-400">
                    Upload real Beyond Strangers photography and assign images to Hero, Instagram Gallery, or Destinations
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingMedia({
                      id: `med-${Date.now()}`,
                      title: '',
                      url: '',
                      type: 'image',
                      category: 'Instagram',
                      assignedSlot: 'instagram',
                      location: 'Munnar, Kerala',
                      caption: 'Golden morning ridge walk with the cohort.',
                      instagramUrl: 'https://instagram.com/beyondstrangers.in',
                      isDemo: false,
                      size: '3.4 MB',
                      createdAt: new Date().toISOString().split('T')[0]
                    });
                    setIsCreatingMedia(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C4D35] hover:bg-[#256345] text-white text-xs font-semibold tracking-wider transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>UPLOAD REAL PHOTO</span>
                </button>
              </div>

              {/* Media Editor Modal / Form */}
              {(isCreatingMedia || editingMedia) && editingMedia && (
                <div className="bg-[#0F1612] border border-[#2B6344] rounded-2xl p-6 space-y-5 shadow-2xl">
                  <div className="flex justify-between items-center pb-3 border-b border-[#1E2E23]">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#52B788]" />
                      <h4 className="text-sm font-bold text-white">
                        {isCreatingMedia ? 'Add New Photography / Video Asset' : `Edit Asset: ${editingMedia.title}`}
                      </h4>
                    </div>
                    <button
                      onClick={() => {
                        setEditingMedia(null);
                        setIsCreatingMedia(false);
                      }}
                      className="text-neutral-400 hover:text-white text-xs font-mono"
                    >
                      CANCEL
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Asset Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Gavi Canopy Trail Road Expedition"
                        value={editingMedia.title}
                        onChange={(e) => setEditingMedia({ ...editingMedia, title: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Asset Type</label>
                      <select
                        value={editingMedia.type || 'image'}
                        onChange={(e) => setEditingMedia({ ...editingMedia, type: e.target.value as any })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      >
                        <option value="image">Still Photography (Image)</option>
                        <option value="video">Motion Footage (MP4 Video)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Media URL (Direct Link) *</label>
                      <input
                        type="text"
                        placeholder="https://... image or video mp4 url"
                        value={editingMedia.url}
                        onChange={(e) => setEditingMedia({ ...editingMedia, url: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Assigned Section / Slot</label>
                      <select
                        value={editingMedia.assignedSlot || 'experience'}
                        onChange={(e) => setEditingMedia({ ...editingMedia, assignedSlot: e.target.value as any })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      >
                        <option value="hero">Hero Film / Background</option>
                        <option value="experience">Experience / Itinerary Details</option>
                        <option value="instagram">Instagram Community Gallery</option>
                        <option value="destinations">Destinations Section</option>
                        <option value="about">Founder / About Section</option>
                        <option value="general">General Media Archive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Location Label</label>
                      <input
                        type="text"
                        placeholder="e.g. Gavi Sanctuary, Kerala"
                        value={editingMedia.location || ''}
                        onChange={(e) => setEditingMedia({ ...editingMedia, location: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">District / Region</label>
                      <input
                        type="text"
                        placeholder="e.g. Pathanamthitta, Kerala"
                        value={editingMedia.districtRegion || ''}
                        onChange={(e) => setEditingMedia({ ...editingMedia, districtRegion: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Exact Landmark / Coordinates</label>
                      <input
                        type="text"
                        placeholder="e.g. Gavi Eco-Sanctuary (9.4357° N, 77.1656° E)"
                        value={editingMedia.exactLocation || ''}
                        onChange={(e) => setEditingMedia({ ...editingMedia, exactLocation: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Source & Provenance</label>
                      <select
                        value={editingMedia.source || 'Beyond Strangers Original'}
                        onChange={(e) => setEditingMedia({ ...editingMedia, source: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      >
                        <option value="Beyond Strangers Original">Beyond Strangers Original</option>
                        <option value="Provided Video Footages">Provided Video Footages</option>
                        <option value="Licensed Photography">Licensed Photography (Verified Place)</option>
                        <option value="Traveler Submission">Traveler Community Submission</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Geographic Verification Status</label>
                      <select
                        value={editingMedia.verificationStatus || 'LOCATION_VERIFIED'}
                        onChange={(e) => setEditingMedia({ ...editingMedia, verificationStatus: e.target.value as any })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono"
                      >
                        <option value="LOCATION_VERIFIED">LOCATION VERIFIED ✓</option>
                        <option value="PENDING_RECONNAISSANCE">PENDING RECONNAISSANCE</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-neutral-300 font-medium mb-1">Google Maps Reference URL</label>
                      <input
                        type="text"
                        placeholder="https://www.google.com/maps/place/..."
                        value={editingMedia.googleMapsRefUrl || ''}
                        onChange={(e) => setEditingMedia({ ...editingMedia, googleMapsRefUrl: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Instagram Post URL (Optional)</label>
                      <input
                        type="text"
                        placeholder="https://instagram.com/dharsh_here__"
                        value={editingMedia.instagramUrl || ''}
                        onChange={(e) => setEditingMedia({ ...editingMedia, instagramUrl: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-neutral-300 font-medium mb-1">Caption / Field Notes</label>
                      <input
                        type="text"
                        placeholder="e.g. Unscripted moments beneath private natural cascades."
                        value={editingMedia.caption || ''}
                        onChange={(e) => setEditingMedia({ ...editingMedia, caption: e.target.value })}
                        className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-[#1E2E23]">
                    <button
                      onClick={() => {
                        setEditingMedia(null);
                        setIsCreatingMedia(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-transparent border border-[#22382B] text-neutral-400 hover:text-white text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!editingMedia.title || !editingMedia.url) {
                          alert('Please provide title and image URL.');
                          return;
                        }
                        handleSaveMedia(editingMedia);
                      }}
                      className="px-5 py-2 rounded-xl bg-[#1C4D35] hover:bg-[#256345] text-white text-xs font-semibold tracking-wider"
                    >
                      Save Verified Media
                    </button>
                  </div>
                </div>
              )}

              {/* Media Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaLibrary.map(med => (
                  <div key={med.id} className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl overflow-hidden group flex flex-col justify-between">
                    <div className="h-44 bg-black relative">
                      {med.type === 'video' ? (
                        <video src={med.url} muted autoPlay loop playsInline className="w-full h-full object-cover" />
                      ) : (
                        <img src={med.url} alt={med.title} className="w-full h-full object-cover" />
                      )}
                      
                      {/* Slot badge */}
                      <span className="absolute top-2 left-2 text-[10px] font-mono bg-black/85 text-[#52B788] border border-[#2B6344]/50 px-2 py-0.5 rounded backdrop-blur-sm uppercase">
                        {med.assignedSlot || 'LIBRARY'}
                      </span>

                      {/* Verification badge */}
                      <span className={`absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded backdrop-blur-sm border ${
                        med.verificationStatus === 'LOCATION_VERIFIED'
                          ? 'bg-[#122A1E]/90 text-[#52B788] border-[#225036]'
                          : 'bg-amber-950/80 text-amber-300 border-amber-800/50'
                      }`}>
                        {med.verificationStatus === 'LOCATION_VERIFIED' ? 'GEO VERIFIED ✓' : 'UNVERIFIED'}
                      </span>
                    </div>
                    
                    <div className="p-3.5 space-y-2">
                      <div>
                        <p className="text-xs font-bold text-white truncate">{med.title}</p>
                        {med.location && (
                          <p className="text-[11px] text-[#71C497] flex items-center gap-1 mt-0.5 font-mono">
                            <span>📍 {med.location}</span>
                          </p>
                        )}
                        {med.source && (
                          <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                            Source: {med.source}
                          </p>
                        )}
                        {med.caption && (
                          <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1 italic">
                            "{med.caption}"
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#1C2C22] flex items-center justify-between">
                        {med.googleMapsRefUrl ? (
                          <a
                            href={med.googleMapsRefUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-[#52B788] hover:underline flex items-center gap-1 font-mono"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            <span>Maps Ref</span>
                          </a>
                        ) : <span />}

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingMedia(med);
                              setIsCreatingMedia(false);
                            }}
                            className="text-[11px] text-[#52B788] hover:underline font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMedia(med.id, med.title)}
                            className="text-[11px] text-red-400 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: SITE SETTINGS */}
          {activeSection === 'settings' && (
            <div className="bg-[#0F1612] border border-[#1E2E23] rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Brand & Website Settings</h3>
                <p className="text-xs text-neutral-400">Configure global tagline, founder details, and announcement alerts</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Site Title</label>
                  <input
                    type="text"
                    value={tempSettings.siteName}
                    onChange={(e) => setTempSettings({ ...tempSettings, siteName: e.target.value })}
                    className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Tagline</label>
                  <input
                    type="text"
                    value={tempSettings.tagline}
                    onChange={(e) => setTempSettings({ ...tempSettings, tagline: e.target.value })}
                    className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-neutral-300 font-medium mb-1">Announcement Banner Message</label>
                  <input
                    type="text"
                    value={tempSettings.announcement}
                    onChange={(e) => setTempSettings({ ...tempSettings, announcement: e.target.value })}
                    className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Founder Name & Title</label>
                  <input
                    type="text"
                    value={tempSettings.founderName}
                    onChange={(e) => setTempSettings({ ...tempSettings, founderName: e.target.value })}
                    className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Instagram Handle</label>
                  <input
                    type="text"
                    value={tempSettings.instagramHandle}
                    onChange={(e) => setTempSettings({ ...tempSettings, instagramHandle: e.target.value })}
                    className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={tempSettings.contactEmail}
                    onChange={(e) => setTempSettings({ ...tempSettings, contactEmail: e.target.value })}
                    className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">WhatsApp Hotline</label>
                  <input
                    type="text"
                    value={tempSettings.whatsappNumber}
                    onChange={(e) => setTempSettings({ ...tempSettings, whatsappNumber: e.target.value })}
                    className="w-full bg-[#152119] border border-[#22382B] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Theme & Design System Accessibility Guard */}
              <div className="pt-6 border-t border-[#1C2C22] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4CADF]" />
                      <span>Theme Tokens & Accessibility Policy (WCAG AA/AAA)</span>
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Standard palette configured: #D4CADF, #D4D1D7, #D5D1D7, #D6D1D7, #D7D1D7
                    </p>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                    WCAG AAA INK ENFORCED
                  </span>
                </div>

                <div className="bg-[#121A15] border border-[#1E2E23] rounded-xl p-4 text-xs space-y-3">
                  <div className="grid grid-cols-5 gap-2">
                    <div className="p-2 rounded-lg text-center" style={{ backgroundColor: '#D4CADF', color: '#080808' }}>
                      <span className="font-mono font-bold text-[10px] block">accent-1</span>
                      <span className="text-[9px] font-mono">#D4CADF</span>
                    </div>
                    <div className="p-2 rounded-lg text-center" style={{ backgroundColor: '#D4D1D7', color: '#080808' }}>
                      <span className="font-mono font-bold text-[10px] block">accent-2</span>
                      <span className="text-[9px] font-mono">#D4D1D7</span>
                    </div>
                    <div className="p-2 rounded-lg text-center" style={{ backgroundColor: '#D5D1D7', color: '#080808' }}>
                      <span className="font-mono font-bold text-[10px] block">accent-3</span>
                      <span className="text-[9px] font-mono">#D5D1D7</span>
                    </div>
                    <div className="p-2 rounded-lg text-center" style={{ backgroundColor: '#D6D1D7', color: '#080808' }}>
                      <span className="font-mono font-bold text-[10px] block">accent-4</span>
                      <span className="text-[9px] font-mono">#D6D1D7</span>
                    </div>
                    <div className="p-2 rounded-lg text-center" style={{ backgroundColor: '#D7D1D7', color: '#080808' }}>
                      <span className="font-mono font-bold text-[10px] block">accent-5</span>
                      <span className="text-[9px] font-mono">#D7D1D7</span>
                    </div>
                  </div>

                  <div className="bg-[#18261D] border border-amber-800/40 rounded-lg p-3 text-amber-200 text-[11px] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Editorial Guideline:</strong> Light pastel accents are reserved strictly for surface containers, badge fills, and borders. Body text is automatically locked to high-contrast ink (<code className="text-white font-mono">#080808</code>) and primary CTAs are rendered in solid black to maintain accessibility.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1C2C22] flex justify-end">
                <button
                  onClick={() => {
                    setSiteSettings(tempSettings);
                    showNotification('Site settings updated dynamically.');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C4D35] hover:bg-[#256345] text-white text-xs font-semibold tracking-wider transition-colors shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE BRAND SETTINGS</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
