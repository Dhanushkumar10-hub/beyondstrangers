import React from 'react';
import { Hero } from '../components/Hero';
import { MostRecentTrip } from '../components/MostRecentTrip';
import { ExploreDestinations } from '../components/ExploreDestinations';
import { TravelStories } from '../components/TravelStories';
import { WhyTravelWithUs } from '../components/WhyTravelWithUs';
import { CommunitySection } from '../components/CommunitySection';
import { ContactCTA } from '../components/ContactCTA';
import { ActiveTab, Trip, SiteSettings } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectTrip?: (trip: Trip) => void;
  onBookNow?: (trip: Trip) => void;
  trips?: Trip[];
  siteSettings?: SiteSettings;
  savedTripIds?: string[];
  onToggleSaveTrip?: (tripId: string) => void;
  onOpenJoinModal?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onSelectTrip,
  trips = [],
}) => {
  const handleExploreTrip = () => {
    if (trips.length > 0 && onSelectTrip) {
      onSelectTrip(trips[0]);
    } else {
      setActiveTab('experiences');
    }
  };

  return (
    <div className="bg-[#F7F5EF] text-[#202622]">
      
      {/* 1. HERO */}
      <Hero
        onExploreClick={() => {
          setActiveTab('experiences');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDestinationsClick={() => {
          setActiveTab('destinations');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. MOST RECENT TRIP */}
      <MostRecentTrip
        onExploreTrip={handleExploreTrip}
      />

      {/* 3. EXPLORE DESTINATIONS */}
      <ExploreDestinations
        onSelectDestination={() => {
          setActiveTab('destinations');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. TRAVEL STORIES */}
      <TravelStories
        onStoryClick={() => {
          setActiveTab('stories');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 5. WHY WE TRAVEL / WHY TRAVEL WITH US */}
      <WhyTravelWithUs />

      {/* 6. COMMUNITY */}
      <CommunitySection />

      {/* 7. CONTACT CTA */}
      <ContactCTA />

    </div>
  );
};
