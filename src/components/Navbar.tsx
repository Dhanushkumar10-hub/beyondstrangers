import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';

export type NavSectionId = 'hero' | 'trips' | 'destinations' | 'stories' | 'about' | 'contact';

interface NavbarProps {
  activeSection?: string;
  onNavigateToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection = 'hero',
  onNavigateToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: NavSectionId; label: string }[] = [
    { id: 'trips', label: 'Trips' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'stories', label: 'Stories' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigateToSection) {
      onNavigateToSection(id);
      return;
    }

    if (id === 'hero' || id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-[#EAE6E1] ${
        isScrolled
          ? 'bg-white/80 shadow-xs py-3'
          : 'bg-white/70 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button
          id="btn-brand-home"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          aria-label="Back to top"
        >
          <BrandLogo size="md" variant="dark" showText={true} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-sans tracking-wide transition-colors duration-200 cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#1A1A1A] font-semibold'
                    : 'text-[#666666] hover:text-[#1A1A1A]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#2C3E35] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden">
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1A1A1A] hover:text-[#2C3E35] focus:outline-none cursor-pointer rounded-md transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#EAE6E1] px-6 py-5 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-base py-2 transition-colors cursor-pointer rounded-sm ${
                      isActive
                        ? 'text-[#1A1A1A] font-semibold pl-3 border-l-2 border-[#2C3E35] bg-[#2C3E35]/5'
                        : 'text-[#666666] hover:text-[#1A1A1A] pl-3'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-[#EAE6E1] flex items-center justify-between text-xs text-[#666666]">
                <span>Real People • Real Journeys</span>
                <span className="text-[#2C3E35] font-serif font-bold uppercase tracking-wider">Beyond Strangers</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
