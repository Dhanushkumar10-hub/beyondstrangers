import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, 
  Trip, 
  TravelerProfile, 
  BookingDetails, 
  Destination, 
  Testimonial, 
  MediaItem, 
  SiteSettings, 
  AdminUser,
  VerifiedLocation
} from './types';
import { 
  DEMO_TRIPS, 
  DEMO_TRAVELERS, 
  DEMO_DESTINATIONS, 
  DEMO_TESTIMONIALS, 
  DEMO_MEDIA_LIBRARY, 
  DEFAULT_SITE_SETTINGS,
  DEMO_BOOKINGS,
  VERIFIED_TRIP_LOCATIONS
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { JoinSocietyModal } from './components/JoinSocietyModal';
import { BookingModal } from './components/BookingModal';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

import { HomeView } from './views/HomeView';
import { ExperiencesView } from './views/ExperiencesView';
import { SocietyView } from './views/SocietyView';
import { DestinationsView } from './views/DestinationsView';
import { DestinationDetailView } from './views/DestinationDetailView';
import { StoriesView } from './views/StoriesView';
import { AboutView } from './views/AboutView';
import { ExperienceDetailView } from './views/ExperienceDetailView';
import { DashboardView } from './views/DashboardView';
import { PolicyView } from './views/PolicyViews';
import { DesignSystemDemoView } from './views/DesignSystemDemoView';

export default function App() {
  // Live mutable state shared between public portal and CMS admin
  const [trips, setTrips] = useState<Trip[]>(DEMO_TRIPS);
  const [destinations, setDestinations] = useState<Destination[]>(DEMO_DESTINATIONS);
  const [bookings, setBookings] = useState<BookingDetails[]>(DEMO_BOOKINGS);
  const [travelers, setTravelers] = useState<TravelerProfile[]>(DEMO_TRAVELERS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEMO_TESTIMONIALS);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(DEMO_MEDIA_LIBRARY);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [verifiedLocations, setVerifiedLocations] = useState<VerifiedLocation[]>(VERIFIED_TRIP_LOCATIONS);

  // Active view routing
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(trips[0] || null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [bookingTrip, setBookingTrip] = useState<Trip | null>(null);
  const [joinModalOpen, setJoinModalOpen] = useState<boolean>(false);
  const [policyType, setPolicyType] = useState<'cancellation' | 'privacy' | 'terms' | 'contact'>('cancellation');

  // User session state
  const [userProfile, setUserProfile] = useState<TravelerProfile | null>(travelers[0] || null);

  // Hidden Admin State (Completely separate and protected)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(false);

  // Check URL hashtag or pathname for secret admin access and keyboard shortcut (Ctrl+Alt+A)
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#admin' || hash === '#/admin' || hash === '#admin/login' || path.includes('/admin')) {
        setIsAdminRoute(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key combination: Ctrl + Alt + A (or Cmd + Alt + A) opens CMS
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminRoute(true);
        window.location.hash = '#admin';
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setActiveTab('experience-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setActiveTab('destination-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSuccess = (newBooking: BookingDetails) => {
    setBookings(prev => [newBooking, ...prev]);
    // Also update spot count on the trip
    setTrips(prev => prev.map(t => {
      if (t.id === newBooking.tripId) {
        const nextSpotsTaken = Math.min(t.spotsTaken + newBooking.travelerCount, t.totalSpots);
        const nextStatus = nextSpotsTaken >= t.totalSpots ? 'WAITLIST_ONLY' : nextSpotsTaken >= t.totalSpots - 2 ? 'FEW_SPOTS_LEFT' : 'AVAILABLE';
        return {
          ...t,
          spotsTaken: nextSpotsTaken,
          status: nextStatus
        };
      }
      return t;
    }));
  };

  const handleJoinSocietySuccess = (profile: TravelerProfile) => {
    setUserProfile(profile);
    setTravelers(prev => [profile, ...prev]);
  };

  const openPolicy = (type: 'cancellation' | 'privacy' | 'terms' | 'contact') => {
    setPolicyType(type);
    setActiveTab('policy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // RENDER ADMIN CMS VIEW IF ROUTE IS ACTIVE
  if (isAdminRoute) {
    if (!adminUser) {
      return (
        <AdminLogin
          onLoginSuccess={(user) => setAdminUser(user)}
          onBackToSite={() => {
            setIsAdminRoute(false);
            window.location.hash = '';
          }}
        />
      );
    }

    return (
      <AdminDashboard
        adminUser={adminUser}
        onLogout={() => {
          setAdminUser(null);
          setIsAdminRoute(false);
          window.location.hash = '';
        }}
        onViewPublicSite={() => {
          setIsAdminRoute(false);
          window.location.hash = '';
        }}
        trips={trips}
        setTrips={setTrips}
        destinations={destinations}
        setDestinations={setDestinations}
        bookings={bookings}
        setBookings={setBookings}
        travelers={travelers}
        setTravelers={setTravelers}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        mediaLibrary={mediaLibrary}
        setMediaLibrary={setMediaLibrary}
        siteSettings={siteSettings}
        setSiteSettings={setSiteSettings}
        verifiedLocations={verifiedLocations}
        setVerifiedLocations={setVerifiedLocations}
      />
    );
  }

  // RENDER PUBLIC IMMERSIVE EDITORIAL EXPERIENCE
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col font-sans selection:bg-[#0A0A0A] selection:text-white relative">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenJoinModal={() => setJoinModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            onSelectTrip={handleSelectTrip}
            onOpenJoinModal={() => setJoinModalOpen(true)}
            trips={trips}
            mediaLibrary={mediaLibrary}
            siteSettings={siteSettings}
            destinations={destinations}
            verifiedLocations={verifiedLocations}
          />
        )}

        {activeTab === 'experiences' && (
          <ExperiencesView
            onSelectTrip={handleSelectTrip}
            onOpenJoinModal={() => setJoinModalOpen(true)}
            trips={trips}
          />
        )}

        {activeTab === 'society' && (
          <SocietyView
            onOpenJoinModal={() => setJoinModalOpen(true)}
          />
        )}

        {activeTab === 'destinations' && (
          <DestinationsView
            onSelectTrip={handleSelectTrip}
            destinations={destinations}
            trips={trips}
          />
        )}

        {activeTab === 'destination-detail' && (
          <DestinationDetailView
            destination={selectedDestination}
            onBack={() => setActiveTab('destinations')}
            onSelectTrip={handleSelectTrip}
            trips={trips}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'stories' && (
          <StoriesView />
        )}

        {activeTab === 'about' && (
          <AboutView />
        )}

        {activeTab === 'experience-detail' && (
          <ExperienceDetailView
            trip={selectedTrip}
            onBack={() => setActiveTab('experiences')}
            onOpenBooking={(trip) => setBookingTrip(trip)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            userBookings={bookings}
            userProfile={userProfile}
            onOpenJoinModal={() => setJoinModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'design-system' && (
          <DesignSystemDemoView />
        )}

        {activeTab === 'contact' && (
          <PolicyView
            type="contact"
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'policy' && (
          <PolicyView
            type={policyType}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenJoinModal={() => setJoinModalOpen(true)}
        onOpenPolicy={openPolicy}
      />

      {/* Modals */}
      <JoinSocietyModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onJoinSuccess={handleJoinSocietySuccess}
      />

      <BookingModal
        trip={bookingTrip}
        isOpen={!!bookingTrip}
        onClose={() => setBookingTrip(null)}
        onBookingSuccess={handleBookingSuccess}
      />

    </div>
  );
}
