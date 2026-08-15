import React from 'react';
import { ArrowRight, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import localKodaguImage from '../assets/kodagu.jpg';

interface MostRecentTripProps {
  onExploreTrip: () => void;
  onViewMaps?: () => void;
}

export const MostRecentTrip: React.FC<MostRecentTripProps> = ({
  onExploreTrip,
}) => {
  return (
    <section id="trips" className="bg-[#FDFBF7] py-20 md:py-28 border-b border-[#EAE6E1] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#666666] block mb-2 font-medium">
            Most recent trip
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1A1A] font-normal tracking-tight">
            Three days through Kodagu’s rain roads
          </h2>
        </motion.div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Landscape Photograph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-xs border border-[#EAE6E1] bg-white shadow-xs group"
          >
            <div className="w-full h-[280px] sm:h-[360px] md:h-[400px] overflow-hidden bg-[#EAE6E1]">
              <img
                src="https://framerusercontent.com/images/lzxAgdGWC4kokqu6PMI86TYRxjM.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = localKodaguImage;
                }}
                referrerPolicy="no-referrer"
                alt="Misty rain mountains and green coffee trails in Kodagu, Karnataka"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: Trip Narrative & Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            
            {/* Metadata (Location & Date) */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#666666] font-sans font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#2C3E35]" />
              <span>Kodagu, Karnataka • August 2026</span>
            </div>

            {/* Narrative Paragraph */}
            <div className="space-y-4 text-sm sm:text-base text-[#666666] leading-relaxed font-sans font-light">
              <p>
                We followed rain-dark roads through coffee country, stopping for home-cooked lunches, a forest walk with a local guide, and stories that only surfaced when the day slowed down.
              </p>
            </div>

            {/* Links / CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-sm font-sans">
              <button
                id="btn-explore-kodagu"
                onClick={onExploreTrip}
                className="text-[#2C3E35] font-medium inline-flex items-center gap-2 hover:gap-3 transition-all duration-200 cursor-pointer group"
              >
                <span className="border-b border-[#2C3E35]/40 pb-0.5 group-hover:border-[#2C3E35]">Explore this trip</span>
                <ArrowRight className="w-4 h-4 text-[#2C3E35]" />
              </button>

              <a
                href="https://www.google.com/maps/search/Kodagu+Karnataka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#1A1A1A] inline-flex items-center gap-1.5 transition-colors duration-150 text-xs tracking-wide"
                aria-label="View Kodagu on Google Maps"
              >
                <span>View Kodagu on Google Maps</span>
                <ExternalLink className="w-3 h-3 text-[#666666]" />
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
