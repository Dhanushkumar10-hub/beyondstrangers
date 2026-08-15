import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import localHeroImage from '../assets/hero.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onDestinationsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onDestinationsClick,
}) => {
  return (
    <section id="hero" className="relative w-full h-[600px] md:h-[680px] lg:h-[720px] flex items-center bg-[#183A2A] overflow-hidden">
      {/* Background Image: High-res uncompressed master link rendered with maximum sharpness */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src="https://framerusercontent.com/images/GYJRgemAJsiQ6l7qZJCd5mpxU.jpg"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = localHeroImage;
          }}
          referrerPolicy="no-referrer"
          alt="Road through lush forest and misty trees"
          className="w-full h-full object-cover object-center"
        />
        {/* Contrast overlay to keep header text sharp and legible */}
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#183A2A]/90 via-[#183A2A]/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-6"
        >
          {/* Subtitle tag above title */}
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-sans uppercase tracking-[0.22em] text-[#D8C3A5] font-medium">
            <span>Real journeys. Open roads. Shared stories.</span>
          </div>

          {/* Main Headline (Serif font, large display size) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-[1.15] tracking-tight text-[#F7F5EF]">
            Take the road that still feels like a discovery.
          </h1>

          {/* Supporting Paragraph */}
          <p className="text-base sm:text-lg text-[#F7F5EF]/85 font-sans font-light leading-relaxed max-w-xl">
            Small-group journeys through forests, villages, mountain passes, and the overlooked places in between.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              id="hero-btn-explore"
              onClick={onExploreClick}
              className="bg-[#2C3E35] hover:bg-[#3B5246] text-[#FDFBF7] px-6 py-3.5 rounded-sm text-sm font-sans font-medium inline-flex items-center gap-2.5 transition-all duration-200 cursor-pointer shadow-sm hover:translate-y-[-1px]"
            >
              <span>Explore Trips</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-btn-destinations"
              onClick={onDestinationsClick}
              className="bg-black/20 hover:bg-black/40 text-[#FDFBF7] border border-white/40 hover:border-white/80 px-6 py-3.5 rounded-sm text-sm font-sans font-medium inline-flex items-center gap-2.5 transition-all duration-200 cursor-pointer backdrop-blur-xs"
            >
              <span>View Destinations</span>
              <Compass className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
