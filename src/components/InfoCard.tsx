import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface InfoCardProps {
  title: string;
  category?: string;
  description: string;
  imageSlot?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  badge?: string;
  accentVariant?: 'accent-1' | 'accent-2' | 'accent-3' | 'accent-4' | 'accent-5';
  onClick?: () => void;
  ctaLabel?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  category,
  description,
  imageSlot,
  imageUrl,
  imageAlt,
  badge,
  accentVariant = 'accent-1',
  onClick,
  ctaLabel = 'Explore'
}) => {
  const accentBgMap = {
    'accent-1': 'bg-[#D4CADF]/35 border-[#D4CADF]',
    'accent-2': 'bg-[#D4D1D7]/35 border-[#D4D1D7]',
    'accent-3': 'bg-[#D5D1D7]/35 border-[#D5D1D7]',
    'accent-4': 'bg-[#D6D1D7]/35 border-[#D6D1D7]',
    'accent-5': 'bg-[#D7D1D7]/35 border-[#D7D1D7]'
  };

  return (
    <div 
      className={`
        rounded-2xl p-5 sm:p-6 border transition-all duration-200
        ${accentBgMap[accentVariant]}
        flex flex-col justify-between h-full group
      `}
    >
      <div>
        {/* Top Header & Badge */}
        <div className="flex items-center justify-between mb-3 gap-2">
          {category && (
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#080808] uppercase bg-white/80 px-2.5 py-1 rounded-md border border-[#D5D1D7]">
              {category}
            </span>
          )}
          {badge && (
            <span className="text-[10px] font-mono text-neutral-600 bg-white/60 px-2 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#080808] mb-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#2B2B2B] leading-relaxed mb-4">
          {description}
        </p>

        {/* Image Slot or URL */}
        {imageSlot ? (
          <div className="rounded-xl overflow-hidden mb-4 aspect-video bg-neutral-200">
            {imageSlot}
          </div>
        ) : imageUrl ? (
          <div className="relative rounded-xl overflow-hidden mb-4 aspect-video bg-neutral-200">
            <img 
              src={imageUrl} 
              alt={imageAlt || title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : null}
      </div>

      {/* Action Footer */}
      {onClick && (
        <div className="pt-3 border-t border-[#D5D1D7] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#080808] group-hover:underline">
            {ctaLabel}
          </span>
          <button
            type="button"
            onClick={onClick}
            aria-label={`${ctaLabel}: ${title}`}
            className="w-8 h-8 rounded-full bg-[#080808] text-white flex items-center justify-center group-hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-[#080808]"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
