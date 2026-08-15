import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

export interface HighlightItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  accentBg: 'accent-1' | 'accent-2' | 'accent-3' | 'accent-4' | 'accent-5';
}

export interface ExperienceHighlightsProps {
  heading?: string;
  description?: string;
  highlights?: HighlightItem[];
  onViewFullTrip?: () => void;
  onAskTrip?: () => void;
  className?: string;
}

export const DEFAULT_HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'hl-1',
    title: 'Forest Trails',
    subtitle: 'Shola grasslands, misty paths and candid exploration',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    alt: 'Misty green rainforest and shola grassland trails in Gavi',
    accentBg: 'accent-1'
  },
  {
    id: 'hl-2',
    title: 'Private Waterfalls',
    subtitle: 'Short hikes to secluded cascades',
    image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80',
    alt: 'Natural forest waterfalls and secluded cascades in Western Ghats',
    accentBg: 'accent-2'
  },
  {
    id: 'hl-3',
    title: 'Reservoir Boating',
    subtitle: 'Quiet boating on calm waters',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    alt: 'Serene rowboating on Kochupampa reservoir with morning mist',
    accentBg: 'accent-3'
  },
  {
    id: 'hl-4',
    title: 'Natural Surroundings',
    subtitle: 'Birds, flora and peaceful nature',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    alt: 'Rich biodiversity, birds and native flora of Periyar biosphere',
    accentBg: 'accent-4'
  },
  {
    id: 'hl-5',
    title: 'Evening Campfire',
    subtitle: 'Stories, music and warm conversations',
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80',
    alt: 'Evening campfire circle under starlit sky with solo explorers',
    accentBg: 'accent-5'
  },
  {
    id: 'hl-6',
    title: 'Meet New People',
    subtitle: 'Shared meals, walks and lasting stories',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    alt: 'Solo travellers sharing communal meals and candid conversations',
    accentBg: 'accent-1'
  }
];

export const ExperienceHighlights: React.FC<ExperienceHighlightsProps> = ({
  heading = 'WHAT AWAITS YOU',
  description = 'Real, human-led experiences — short days packed with nature, discoveries and new people.',
  highlights = DEFAULT_HIGHLIGHTS,
  onViewFullTrip,
  onAskTrip,
  className = ''
}) => {
  const accentBorderMap = {
    'accent-1': 'border-[#D4CADF] bg-[#D4CADF]/20',
    'accent-2': 'border-[#D4D1D7] bg-[#D4D1D7]/20',
    'accent-3': 'border-[#D5D1D7] bg-[#D5D1D7]/20',
    'accent-4': 'border-[#D6D1D7] bg-[#D6D1D7]/20',
    'accent-5': 'border-[#D7D1D7] bg-[#D7D1D7]/20'
  };

  return (
    <section 
      id="experience-highlights"
      aria-labelledby="highlights-heading"
      className={`py-14 sm:py-20 bg-white border-b border-[#D5D1D7] ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold tracking-widest bg-[#D4CADF] text-[#080808] px-2.5 py-0.5 rounded uppercase">
              CURATED EXPEDITIONS
            </span>
          </div>
          <h2 
            id="highlights-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#080808] tracking-tight"
          >
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-[#2B2B2B] mt-2 leading-relaxed font-sans">
            {description}
          </p>
        </div>

        {/* 6-Card Responsive Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {highlights.map((item, index) => (
            <article 
              key={item.id}
              className={`
                rounded-3xl border overflow-hidden p-3 transition-all duration-300 hover:shadow-md
                ${accentBorderMap[item.accentBg]}
                flex flex-col justify-between group
              `}
            >
              {/* Image Container with Lazy Loading & Object Cover */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-3.5">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-2.5 left-2.5 font-mono text-[10px] font-bold bg-white/90 text-[#080808] px-2 py-0.5 rounded-md shadow-sm">
                  0{index + 1}
                </span>
              </div>

              {/* Text Meta Content */}
              <div className="px-2 pb-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#080808] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2B2B] leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Compact Action Area with High-Contrast Buttons */}
        <div className="bg-[#FAF9F6] border border-[#D5D1D7] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-serif font-bold text-[#080808]">
              Ready to explore with 12–16 fellow solo travellers?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
              Limited spots per cohort. Founder-led facilitation on all departures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {onAskTrip && (
              <SecondaryButton
                onClick={onAskTrip}
                fullWidth={false}
                size="md"
                ariaLabel="Ask about this trip"
                className="w-full sm:w-auto"
                icon={<MessageSquare className="w-4 h-4 text-[#080808]" />}
              >
                ASK ABOUT THIS TRIP
              </SecondaryButton>
            )}

            {onViewFullTrip && (
              <PrimaryButton
                onClick={onViewFullTrip}
                fullWidth={false}
                size="md"
                ariaLabel="View full trip details"
                className="w-full sm:w-auto"
                icon={<ArrowRight className="w-4 h-4 text-white" />}
              >
                VIEW FULL TRIP
              </PrimaryButton>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperienceHighlights;
