import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenJoinModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenJoinModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'experiences', label: 'EXPERIENCES' },
    { id: 'destinations', label: 'DESTINATIONS' },
    { id: 'society', label: 'THE SOCIETY' },
    { id: 'stories', label: 'STORIES' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] py-4 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-b border-[#F0F0EE] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo - Minimal Editorial Black */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-none border border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A] bg-transparent group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors duration-300">
            <Compass className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A0A0A] font-serif-editorial leading-none">
              BEYOND STRANGERS
            </div>
            <div className="text-xs sm:text-sm font-mono uppercase text-[#666666] tracking-[0.18em] mt-1 font-medium">
              THE STRANGER SOCIETY
            </div>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-9 lg:gap-11">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-[17px] tracking-[0.05em] transition-colors relative py-1.5 font-medium ${
                activeTab === item.id
                  ? 'text-[#0A0A0A] font-bold'
                  : 'text-[#555555] hover:text-[#0A0A0A]'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0A0A0A]" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => handleNavClick('dashboard')}
            className="text-[16px] text-[#555555] hover:text-[#0A0A0A] tracking-wide transition-colors font-semibold"
          >
            MY JOURNEYS
          </button>

          <button
            onClick={() => handleNavClick('experiences')}
            className="min-h-[54px] px-7 py-3 bg-[#0A0A0A] hover:bg-[#262626] text-white text-[16px] font-semibold tracking-wider uppercase transition-colors rounded-none shadow-sm flex items-center gap-2.5"
          >
            <span>JOIN A TRIP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => handleNavClick('experiences')}
            className="min-h-[44px] px-4 py-2 bg-[#0A0A0A] text-white text-sm font-semibold tracking-wider uppercase"
          >
            TRIPS
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-[#0A0A0A] hover:bg-[#F7F7F5] border border-[#E5E5E5]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E5E5] px-6 py-8 space-y-6 animate-in slide-in-from-top duration-200">
          <div className="space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-3 text-lg tracking-wide uppercase border-b border-[#F0F0EE] flex items-center justify-between ${
                  activeTab === item.id ? 'text-[#0A0A0A] font-bold' : 'text-[#555555]'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </button>
            ))}

            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left py-3 text-lg tracking-wide uppercase border-b border-[#F0F0EE] text-[#555555] flex items-center justify-between"
            >
              <span>MY JOURNEYS & PASS</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('experiences')}
              className="w-full min-h-[52px] py-3.5 bg-[#0A0A0A] text-white text-base font-bold uppercase tracking-wider text-center"
            >
              EXPLORE ALL TRIPS
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              className="w-full min-h-[52px] py-3 bg-[#F7F7F5] border border-[#E5E5E5] text-[#0A0A0A] text-base font-semibold uppercase tracking-wider text-center"
            >
              JOIN THE STRANGER SOCIETY
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
