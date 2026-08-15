import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MostRecentTrip } from './components/MostRecentTrip';
import { ExploreDestinations } from './components/ExploreDestinations';
import { TravelStories } from './components/TravelStories';
import { WhyTravelWithUs } from './components/WhyTravelWithUs';
import { CommunitySection } from './components/CommunitySection';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Smooth scroll handler with header offset
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero' || sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  // Scroll spy to highlight current active section during manual scrolling
  useEffect(() => {
    const sectionIds = ['hero', 'trips', 'destinations', 'stories', 'about', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // detection line

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#D8C3A5] selection:text-[#183A2A] scroll-smooth">
      
      {/* 1. STICKY / FLOATING HEADER */}
      <Navbar
        activeSection={activeSection}
        onNavigateToSection={scrollToSection}
      />

      {/* SINGLE-PAGE CONTINUOUS EDITORIAL JOURNAL */}
      <main className="flex-1 w-full">
        
        {/* 1. HERO SECTION */}
        <Hero
          onExploreClick={() => scrollToSection('trips')}
          onDestinationsClick={() => scrollToSection('destinations')}
        />

        {/* 2. MOST RECENT TRIP SECTION */}
        <MostRecentTrip
          onExploreTrip={() => scrollToSection('destinations')}
        />

        {/* 3. EXPLORE DESTINATIONS GRID */}
        <ExploreDestinations
          onSelectDestination={() => scrollToSection('stories')}
        />

        {/* 4. TRAVEL STORIES (FIELD NOTES) */}
        <TravelStories
          onStoryClick={() => scrollToSection('about')}
        />

        {/* 5. WHY TRAVEL WITH US (3-COLUMN FEATURE) */}
        <WhyTravelWithUs />

        {/* 6. COMMUNITY SHOWCASE SECTION */}
        <CommunitySection />

        {/* 7. CONTACT / CTA SECTION */}
        <ContactCTA />

      </main>

      {/* 8. FOOTER */}
      <Footer
        onNavigateToSection={scrollToSection}
      />

    </div>
  );
}
