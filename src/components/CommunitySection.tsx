import React from 'react';
import { motion } from 'motion/react';
import localCommunityImage from '../assets/community.jpg';

export const CommunitySection: React.FC = () => {
  return (
    <section id="community" className="bg-[#FDFBF7] py-20 md:py-28 border-b border-[#EAE6E1] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Landscape Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-xs border border-[#EAE6E1] bg-white shadow-xs group"
          >
            <div className="overflow-hidden">
              <img
                src="https://framerusercontent.com/images/HJotBnRmuvHgwspV76zR6hloY0U.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = localCommunityImage;
                }}
                referrerPolicy="no-referrer"
                alt="Traveler walking on a serene mountain forest path in misty Western Ghats"
                className="w-full aspect-[4/3] sm:aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: Typography & Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4 max-w-lg"
          >
            <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#666666] block font-medium">
              The community
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1A1A] font-normal leading-snug tracking-tight">
              People make a place unforgettable
            </h2>

            <p className="text-sm sm:text-base text-[#666666] font-sans leading-relaxed font-light pt-2">
              Beyond Strangers brings together people who travel with curiosity, listen generously, and leave with a deeper sense of the places they have shared.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
