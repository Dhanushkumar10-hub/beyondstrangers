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
  Save,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck
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
  const [editingLocation, setEditingLocation] = useState<VerifiedLocation | null>(null);
  const [isCreatingLocation, setIsCreatingLocation] = useState(false);
  const [localLocations, setLocalLocations] = useState<VerifiedLocation[]>(verifiedLocations);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Settings form local state
  const [tempSettings, setTempSettings] = useState<SiteSettings>(siteSettings);

  const showNotification = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(null), 3500);
  };

  // Metrics Calculations
  const totalSpots = trips.reduce((acc, t) => acc + (t.totalSpots || 12), 0);
  const filledSpots = trips.reduce((acc, t) => acc + (t.spotsTaken || 0), 0);
  const occupancyPercentage = totalSpots > 0 ? Math.round((filledSpots / totalSpots) * 100) : 0;
  const activeTripsCount = trips.filter(t => t.status === 'AVAILABLE' || t.status === 'FEW_SPOTS_LEFT').length;
  const totalRevenue = bookings.filter(b => b.status === 'CONFIRMED').reduce((acc, b) => acc + b.totalAmount, 0);

  const updateLocationsState = (updater: (prev: VerifiedLocation[]) => VerifiedLocation[]) => {
    setLocalLocations(prev => {
      const next = updater(prev);
      if (setVerifiedLocations) setVerifiedLocations(next);
      return next;
    });
  };

  const handleSetFeaturedTrip = (tripId: string) => {
    setTrips(prev => prev.map(t => ({ ...t, featured: t.id === tripId })));
    setSiteSettings(prev => ({ ...prev, featuredTripId: tripId }));
    const chosen = trips.find(t => t.id === tripId);
    showNotification(`"${chosen?.title || tripId}" set as FEATURED on homepage.`);
  };

  const handleSaveTrip = (tripToSave: Trip) => {
    if (isCreatingTrip) {
      setTrips(prev => [tripToSave, ...prev]);
      showNotification(`Created trip "${tripToSave.title}".`);
      setIsCreatingTrip(false);
    } else {
      setTrips(prev => prev.map(t => t.id === tripToSave.id ? tripToSave : t));
      showNotification(`Saved changes to "${tripToSave.title}".`);
      setEditingTrip(null);
    }
  };

  const handleDeleteTrip = (id: string, title: string) => {
    if (window.confirm(`Delete trip "${title}"?`)) {
      setTrips(prev => prev.filter(t => t.id !== id));
      showNotification(`Deleted "${title}".`);
    }
  };

  const handleToggleTripStatus = (id: string) => {
    setTrips(prev => prev.map(t => {
      if (t.id !== id) return t;
      const nextStatus = t.status === 'AVAILABLE' ? 'FEW_SPOTS_LEFT' : t.status === 'FEW_SPOTS_LEFT' ? 'COMING_SOON' : 'AVAILABLE';
      return { ...t, status: nextStatus };
    }));
    showNotification('Trip status updated.');
  };

  const handleUpdateBookingStatus = (id: string, newStatus: 'CONFIRMED' | 'PENDING' | 'WAITLIST' | 'CANCELLED') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    showNotification(`Booking updated to ${newStatus}.`);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#202622] flex font-sans antialiased">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#183A2A] text-[#F7F5EF] border-r border-[#A8BFA3]/30 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-[#A8BFA3]/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F7F5EF] border border-[#A8BFA3] flex items-center justify-center p-1 shadow-sm">
                <img
                  src="assets/brand/logo.png"
                  alt="Beyond Strangers Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#F7F5EF] tracking-wider leading-none">
                  BEYOND STRANGERS
                </h2>
                <p className="text-[10px] text-[#D8C3A5] uppercase tracking-widest font-mono mt-1 font-bold">
                  OPERATOR PORTAL
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => { setActiveSection('overview'); setEditingTrip(null); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeSection === 'overview'
                  ? 'bg-[#2F6B45] text-white shadow-md'
                  : 'text-[#F7F5EF]/80 hover:text-[#D8C3A5] hover:bg-[#2F6B45]/30'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => { setActiveSection('experiences'); setEditingTrip(null); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeSection === 'experiences'
                  ? 'bg-[#2F6B45] text-white shadow-md'
                  : 'text-[#F7F5EF]/80 hover:text-[#D8C3A5] hover:bg-[#2F6B45]/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4" />
                <span>Trip Management</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSection === 'experiences' ? 'bg-white/20 text-white' : 'bg-[#183A2A] text-[#D8C3A5]'}`}>
                {trips.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveSection('destinations'); setEditingTrip(null); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeSection === 'destinations'
                  ? 'bg-[#2F6B45] text-white shadow-md'
                  : 'text-[#F7F5EF]/80 hover:text-[#D8C3A5] hover:bg-[#2F6B45]/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Destinations</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSection === 'destinations' ? 'bg-white/20 text-white' : 'bg-[#183A2A] text-[#D8C3A5]'}`}>
                {destinations.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveSection('bookings'); setEditingTrip(null); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeSection === 'bookings'
                  ? 'bg-[#2F6B45] text-white shadow-md'
                  : 'text-[#F7F5EF]/80 hover:text-[#D8C3A5] hover:bg-[#2F6B45]/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Ticket className="w-4 h-4" />
                <span>Bookings & Guests</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSection === 'bookings' ? 'bg-white/20 text-white' : 'bg-[#183A2A] text-[#D8C3A5]'}`}>
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveSection('locations'); setEditingTrip(null); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeSection === 'locations'
                  ? 'bg-[#2F6B45] text-white shadow-md'
                  : 'text-[#F7F5EF]/80 hover:text-[#D8C3A5] hover:bg-[#2F6B45]/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Coordinates</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSection === 'locations' ? 'bg-white/20 text-white' : 'bg-[#183A2A] text-[#D8C3A5]'}`}>
                {localLocations.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveSection('settings'); setEditingTrip(null); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeSection === 'settings'
                  ? 'bg-[#2F6B45] text-white shadow-md'
                  : 'text-[#F7F5EF]/80 hover:text-[#D8C3A5] hover:bg-[#2F6B45]/30'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Platform Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#A8BFA3]/20 space-y-2">
          <button
            onClick={onViewPublicSite}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-[#D8C3A5] text-[#202622] hover:bg-[#F7F5EF] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>PUBLIC PREVIEW</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono text-[#F7F5EF]/80 hover:text-[#9E3A3A] hover:bg-[#9E3A3A]/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Operational Bar */}
        <header className="bg-[#F7F5EF] border-b border-[#A8BFA3]/40 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold font-serif text-[#183A2A] capitalize">
              {activeSection.replace('-', ' ')}
            </h1>
            <p className="text-xs text-[#202622]/70 font-mono">
              Live Operator Environment • South India Chapters
            </p>
          </div>

          {actionSuccessMessage && (
            <div className="bg-[#2F6B45] text-white px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 shadow-md animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>{actionSuccessMessage}</span>
            </div>
          )}
        </header>

        <div className="p-6 sm:p-8 space-y-8 flex-1 max-w-7xl w-full mx-auto">
          
          {/* OVERVIEW METRIC SUMMARY CARDS */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              
              {/* 3 Prominent Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Total Bookings Card */}
                <div className="p-6 rounded-2xl bg-[#D8C3A5] border border-[#A8BFA3] shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#183A2A] uppercase">
                    <span>Total Bookings</span>
                    <Ticket className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-serif font-bold text-[#183A2A]">
                    {bookings.length}
                  </div>
                  <div className="text-xs text-[#202622]/80 font-mono">
                    ₹{totalRevenue.toLocaleString('en-IN')} confirmed revenue
                  </div>
                </div>

                {/* Active Trips Card */}
                <div className="p-6 rounded-2xl bg-[#D8C3A5] border border-[#A8BFA3] shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#183A2A] uppercase">
                    <span>Active Chapters</span>
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-serif font-bold text-[#183A2A]">
                    {activeTripsCount}
                  </div>
                  <div className="text-xs text-[#202622]/80 font-mono">
                    Across Kodaikanal, Ooty, Valparai, Kolli Hills
                  </div>
                </div>

                {/* Seat Occupancy % Card */}
                <div className="p-6 rounded-2xl bg-[#D8C3A5] border border-[#A8BFA3] shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#183A2A] uppercase">
                    <span>Seat Occupancy</span>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-serif font-bold text-[#183A2A]">
                    {occupancyPercentage}%
                  </div>
                  <div className="text-xs text-[#202622]/80 font-mono">
                    {filledSpots} / {totalSpots} cohort seats filled
                  </div>
                </div>

              </div>

              {/* LIVE TRIP MANAGEMENT TABLE ON OVERVIEW */}
              <div className="bg-white border border-[#A8BFA3] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#183A2A]">Active Trip Cohorts</h3>
                    <p className="text-xs text-[#202622]/70 font-mono">Real-time status of scheduled weekend departures</p>
                  </div>
                  <button
                    onClick={() => { setActiveSection('experiences'); setIsCreatingTrip(true); }}
                    className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Chapter</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#A8BFA3]/40 text-[#183A2A] font-mono uppercase text-[10px]">
                        <th className="pb-3 font-bold">Thumbnail & Destination</th>
                        <th className="pb-3 font-bold">Dates</th>
                        <th className="pb-3 font-bold">Occupancy</th>
                        <th className="pb-3 font-bold">Price</th>
                        <th className="pb-3 font-bold">Status</th>
                        <th className="pb-3 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#A8BFA3]/30">
                      {trips.map(trip => {
                        const spotsLeft = trip.totalSpots - trip.spotsTaken;
                        let statusColor = 'bg-[#A8BFA3] text-[#202622]'; // Upcoming / default
                        if (trip.status === 'AVAILABLE') statusColor = 'bg-[#2F6B45] text-white'; // Ongoing / available
                        if (trip.status === 'FEW_SPOTS_LEFT') statusColor = 'bg-[#D8C3A5] text-[#202622]';
                        if (trip.status === 'SOLDOUT') statusColor = 'bg-[#F7F5EF] text-[#202622] border border-[#A8BFA3]'; // Completed
                        if ((trip.status as any) === 'CANCELLED') statusColor = 'bg-[#9E3A3A] text-white'; // Cancelled safety exception

                        return (
                          <tr key={trip.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                            <td className="py-3 flex items-center gap-3">
                              <img
                                src={trip.heroImage}
                                alt={trip.title}
                                className="w-12 h-9 rounded-lg object-cover bg-[#D8C3A5] shrink-0"
                              />
                              <div>
                                <div className="font-bold text-[#202622]">{trip.title}</div>
                                <div className="text-[10px] text-[#183A2A] font-mono uppercase">{trip.destination}</div>
                              </div>
                            </td>
                            <td className="py-3 font-mono text-[#202622]">
                              {trip.dates || `${trip.durationDays}D / ${trip.durationNights}N`}
                            </td>
                            <td className="py-3 font-mono">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#202622]">{trip.spotsTaken}/{trip.totalSpots}</span>
                                <span className="text-[10px] text-[#202622]/70">({spotsLeft} left)</span>
                              </div>
                            </td>
                            <td className="py-3 font-mono font-bold text-[#183A2A]">
                              ₹{trip.price.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${statusColor}`}>
                                {trip.status.replace(/_/g, ' ')}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => { setEditingTrip(trip); setActiveSection('experiences'); }}
                                  className="p-1.5 rounded-lg bg-[#D8C3A5] hover:bg-[#A8BFA3] text-[#202622] transition-colors"
                                  title="Edit Trip"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleToggleTripStatus(trip.id)}
                                  className="p-1.5 rounded-lg bg-[#2F6B45]/20 hover:bg-[#2F6B45] text-[#2F6B45] hover:text-white transition-colors"
                                  title="Toggle Status"
                                >
                                  <Clock className="w-3.5 h-3.5" />
                                </button>
                              </div>
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

          {/* TRIP MANAGEMENT FULL PANEL */}
          {activeSection === 'experiences' && (
            <div className="space-y-6">
              
              {/* If editing or creating a trip */}
              {(editingTrip || isCreatingTrip) ? (
                <div className="bg-white border border-[#A8BFA3] rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-[#A8BFA3]/30 pb-4">
                    <h3 className="font-serif font-bold text-lg text-[#183A2A]">
                      {isCreatingTrip ? 'Create New Chapter' : `Edit "${editingTrip?.title}"`}
                    </h3>
                    <button
                      onClick={() => { setEditingTrip(null); setIsCreatingTrip(false); }}
                      className="text-xs font-mono text-[#202622]/70 hover:text-[#202622]"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-mono font-bold block mb-1">Title</label>
                      <input
                        type="text"
                        defaultValue={editingTrip?.title || ''}
                        id="form-trip-title"
                        className="w-full bg-[#F7F5EF] border border-[#A8BFA3] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-mono font-bold block mb-1">Destination</label>
                      <input
                        type="text"
                        defaultValue={editingTrip?.destination || 'Kodaikanal'}
                        id="form-trip-destination"
                        className="w-full bg-[#F7F5EF] border border-[#A8BFA3] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-mono font-bold block mb-1">Price (₹)</label>
                      <input
                        type="number"
                        defaultValue={editingTrip?.price || 6499}
                        id="form-trip-price"
                        className="w-full bg-[#F7F5EF] border border-[#A8BFA3] rounded-xl px-3 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-mono font-bold block mb-1">Local Hero Image Path</label>
                      <input
                        type="text"
                        defaultValue={editingTrip?.heroImage || 'assets/images/destinations/kodaikanal.jpg'}
                        id="form-trip-image"
                        className="w-full bg-[#F7F5EF] border border-[#A8BFA3] rounded-xl px-3 py-2 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-[#A8BFA3]/30">
                    <button
                      onClick={() => {
                        const title = (document.getElementById('form-trip-title') as HTMLInputElement).value;
                        const destination = (document.getElementById('form-trip-destination') as HTMLInputElement).value;
                        const price = Number((document.getElementById('form-trip-price') as HTMLInputElement).value);
                        const heroImage = (document.getElementById('form-trip-image') as HTMLInputElement).value;

                        const tripData: Trip = editingTrip ? {
                          ...editingTrip,
                          title,
                          destination,
                          price,
                          heroImage
                        } : {
                          id: 'trip-' + Date.now(),
                          slug: destination.toLowerCase().replace(/\s+/g, '-'),
                          title,
                          chapterTitle: 'Tamil Nadu Expedition',
                          destination,
                          region: 'Tamil Nadu',
                          durationDays: 2,
                          durationNights: 1,
                          price,
                          dates: 'Upcoming Weekend',
                          totalSpots: 12,
                          spotsTaken: 0,
                          status: 'AVAILABLE',
                          category: 'Hill Station',
                          difficulty: 'Moderate',
                          heroImage,
                          overview: 'Immersive weekend cohort journey.',
                          highlights: ['Forest Trails', 'Campfire', 'Local Food'],
                          itinerary: [],
                          inclusions: ['Stay', 'Meals', 'Guide'],
                          exclusions: ['Personal Expenses'],
                          meetingPoint: 'Central Pickup Point',
                          accommodationType: 'Private Curated Stay',
                          safetyNotes: ['Pre-screened cohort']
                        };

                        handleSaveTrip(tripData);
                      }}
                      className="btn-primary text-xs py-2 px-6"
                    >
                      Save Chapter
                    </button>
                  </div>
                </div>
              ) : (
                /* Full Trip Table */
                <div className="bg-white border border-[#A8BFA3] rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#183A2A]">All Trip Chapters</h3>
                      <p className="text-xs text-[#202622]/70 font-mono">Manage pricing, status, and local media</p>
                    </div>
                    <button
                      onClick={() => setIsCreatingTrip(true)}
                      className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Chapter</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#A8BFA3]/40 text-[#183A2A] font-mono uppercase text-[10px]">
                          <th className="pb-3 font-bold">Thumbnail & Name</th>
                          <th className="pb-3 font-bold">Destination</th>
                          <th className="pb-3 font-bold">Dates</th>
                          <th className="pb-3 font-bold">Spots</th>
                          <th className="pb-3 font-bold">Price</th>
                          <th className="pb-3 font-bold">Status</th>
                          <th className="pb-3 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#A8BFA3]/30">
                        {trips.map(trip => (
                          <tr key={trip.id} className="hover:bg-[#F7F5EF]/60">
                            <td className="py-3 flex items-center gap-3">
                              <img
                                src={trip.heroImage}
                                alt={trip.title}
                                className="w-12 h-9 rounded-lg object-cover bg-[#D8C3A5] shrink-0"
                              />
                              <span className="font-bold text-[#202622]">{trip.title}</span>
                            </td>
                            <td className="py-3 font-mono text-[#183A2A]">{trip.destination}</td>
                            <td className="py-3 font-mono">{trip.dates}</td>
                            <td className="py-3 font-mono">{trip.spotsTaken}/{trip.totalSpots}</td>
                            <td className="py-3 font-mono font-bold text-[#183A2A]">₹{trip.price.toLocaleString('en-IN')}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#D8C3A5] text-[#202622]">
                                {trip.status}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setEditingTrip(trip)}
                                  className="p-1.5 rounded-lg bg-[#D8C3A5] hover:bg-[#A8BFA3] text-[#202622]"
                                  title="Edit"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTrip(trip.id, trip.title)}
                                  className="p-1.5 rounded-lg bg-[#9E3A3A]/20 hover:bg-[#9E3A3A] text-[#9E3A3A] hover:text-white"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* DESTINATIONS PANEL */}
          {activeSection === 'destinations' && (
            <div className="bg-white border border-[#A8BFA3] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#183A2A]">Destinations in South India</h3>
                  <p className="text-xs text-[#202622]/70 font-mono">Curated hill station regions</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {destinations.map(d => (
                  <div key={d.id} className="bg-[#F7F5EF] border border-[#A8BFA3] rounded-xl p-4 space-y-2">
                    <img src={d.heroImage} alt={d.name} className="w-full h-32 rounded-lg object-cover bg-[#D8C3A5]" />
                    <div className="font-bold text-[#183A2A] font-serif">{d.name}</div>
                    <div className="text-xs text-[#202622]/70">{d.tagline}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOOKINGS PANEL */}
          {activeSection === 'bookings' && (
            <div className="bg-white border border-[#A8BFA3] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#183A2A]">Guest Reservations</h3>
                  <p className="text-xs text-[#202622]/70 font-mono">Confirmed and pending cohort bookings</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#A8BFA3]/40 text-[#183A2A] font-mono uppercase text-[10px]">
                      <th className="pb-3 font-bold">Ref & Guest</th>
                      <th className="pb-3 font-bold">Trip</th>
                      <th className="pb-3 font-bold">City</th>
                      <th className="pb-3 font-bold">Phone</th>
                      <th className="pb-3 font-bold">Amount</th>
                      <th className="pb-3 font-bold">Status</th>
                      <th className="pb-3 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#A8BFA3]/30">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-[#F7F5EF]/60">
                        <td className="py-3">
                          <div className="font-bold text-[#202622]">{b.contactName}</div>
                          <div className="text-[10px] font-mono text-[#183A2A]">{b.bookingReference}</div>
                        </td>
                        <td className="py-3 font-mono">{b.tripTitle}</td>
                        <td className="py-3 font-mono">{b.city}</td>
                        <td className="py-3 font-mono">{b.contactPhone}</td>
                        <td className="py-3 font-mono font-bold text-[#183A2A]">₹{b.totalAmount.toLocaleString('en-IN')}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            b.status === 'CONFIRMED' ? 'bg-[#2F6B45] text-white' : 'bg-[#D8C3A5] text-[#202622]'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, b.status === 'CONFIRMED' ? 'PENDING' : 'CONFIRMED')}
                            className="btn-secondary text-[10px] py-1 px-2.5"
                          >
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VERIFIED LOCATIONS PANEL */}
          {activeSection === 'locations' && (
            <div className="bg-white border border-[#A8BFA3] rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#183A2A]">Verified Reconnaissance Coordinates</h3>
                <p className="text-xs text-[#202622]/70 font-mono">Protected operator data for field leads</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localLocations.map(loc => (
                  <div key={loc.id} className="bg-[#F7F5EF] border border-[#A8BFA3] rounded-xl p-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#183A2A] font-serif">{loc.name}</span>
                      <span className="bg-[#D8C3A5] text-[#202622] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                        {loc.verificationStatus}
                      </span>
                    </div>
                    <div className="text-xs text-[#202622]/70 font-mono">{loc.districtRegion}</div>
                    <div className="text-[11px] text-[#202622]">{loc.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS PANEL */}
          {activeSection === 'settings' && (
            <div className="bg-white border border-[#A8BFA3] rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-lg text-[#183A2A]">Platform Configuration</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-mono font-bold block mb-1">Platform Name</label>
                  <input
                    type="text"
                    defaultValue={siteSettings.siteName}
                    className="w-full bg-[#F7F5EF] border border-[#A8BFA3] rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-mono font-bold block mb-1">Tagline</label>
                  <input
                    type="text"
                    defaultValue={siteSettings.tagline}
                    className="w-full bg-[#F7F5EF] border border-[#A8BFA3] rounded-xl px-3 py-2"
                  />
                </div>
                <button
                  onClick={() => showNotification('Settings saved successfully.')}
                  className="btn-primary text-xs py-2.5 px-6"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
};
