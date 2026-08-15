import React from 'react';
import { motion } from 'motion/react';
import localCoorgImage from '../assets/coorg.jpg';
import localTawangImage from '../assets/tawang.jpg';
import localMunnarImage from '../assets/munnar.jpg';

interface DestinationCardItem {
  id: string;
  image: string;
  fallbackImage: string;
  location: string;
  title: string;
  description: string;
}

interface ExploreDestinationsProps {
  onSelectDestination?: (id: string) => void;
}

export const ExploreDestinations: React.FC<ExploreDestinationsProps> = ({
  onSelectDestination,
}) => {
  const destinationCards: DestinationCardItem[] = [
    {
      id: 'coorg',
      image: 'https://framerusercontent.com/images/4SS5JGI5UryVkaxuX7Byxykdcs.jpg',
      fallbackImage: localCoorgImage,
      location: 'COORG, INDIA',
      title: 'Rainforest Roads',
      description: 'Coffee hills, mist, and old roads that lead beyond the obvious.',
    },
    {
      id: 'tawang',
      image: 'https://framerusercontent.com/images/lzxAgdGWC4kokqu6PMI86TYRxjM.jpg',
      fallbackImage: localTawangImage,
      location: 'TAWANG, INDIA',
      title: 'Mountain Quiet',
      description: 'High passes, village kitchens, and a little more sky than usual.',
    },
    {
      id: 'munnar',
      image: 'https://framerusercontent.com/images/HJotBnRmuvHgwspV76zR6hloY0U.jpg',
      fallbackImage: localMunnarImage,
      location: 'MUNNAR, INDIA',
      title: 'Waterfall Country',
      description: 'A green landscape shaped by rain, walking paths, and long conversations.',
    },
  ];

  return (
    <section id="destinations" className="bg-[#FDFBF7] py-20 md:py-28 border-b border-[#EAE6E1] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#666666] block mb-2 font-medium">
            Explore destinations
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1A1A] font-normal tracking-tight">
            Places with room to wander
          </h2>
        </motion.div>

        {/* 3-Column Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {destinationCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => onSelectDestination && onSelectDestination(card.id)}
              className="bg-white rounded-xs border border-[#EAE6E1] overflow-hidden group cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Hover Zoom Effect */}
              <div className="overflow-hidden aspect-[4/3] bg-[#EAE6E1]">
                <img
                  src={card.image}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = card.fallbackImage;
                  }}
                  referrerPolicy="no-referrer"
                  alt={`${card.title} - ${card.location}`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#666666] block">
                    {card.location}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif text-[#1A1A1A] font-normal group-hover:text-[#2C3E35] transition-colors duration-200">
                    {card.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
