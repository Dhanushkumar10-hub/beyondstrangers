import React from 'react';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigateToSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection }) => {
  const scrollToSection = (id: string) => {
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
    <footer className="bg-[#183A2A] text-[#FDFBF7] pt-14 pb-12 border-t border-[#2C3E35]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <div className="space-y-6">
          
          {/* Brand Emblem & Name */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
          >
            <BrandLogo size="sm" variant="light" showText={false} />
            <h3 className="text-sm font-serif font-bold uppercase tracking-[0.22em] text-[#FDFBF7] group-hover:text-[#D8C3A5] transition-colors">
              BEYOND STRANGERS
            </h3>
          </button>

          {/* Tagline */}
          <p className="text-xs text-[#A8BFA3] font-sans font-light">
            Real people, real journeys, real places.
          </p>

          {/* Contact Details */}
          <div className="text-xs text-[#A8BFA3] flex flex-wrap items-center gap-3 font-sans">
            <a
              href="mailto:hello@beyondstrangers.travel"
              className="hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>hello@beyondstrangers.travel</span>
            </a>
            <span>•</span>
            <a
              href="tel:+919876543210"
              className="hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 97911 41099</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-1">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A8BFA3] hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A8BFA3] hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          {/* Divider & Copyright & Anchors */}
          <div className="pt-8 mt-6 border-t border-[#2F6B45]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A8BFA3]/80">
            <p>© 2026 Beyond Strangers. Stories worth remembering.</p>
            
            <div className="flex flex-wrap items-center gap-5 text-[#A8BFA3]">
              <button
                onClick={() => scrollToSection('trips')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Trips
              </button>
              <button
                onClick={() => scrollToSection('destinations')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Destinations
              </button>
              <button
                onClick={() => scrollToSection('stories')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Stories
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
