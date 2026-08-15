import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'emblem' | 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textClasses = {
    sm: 'text-xs tracking-[0.2em]',
    md: 'text-sm tracking-[0.22em]',
    lg: 'text-base tracking-[0.25em]',
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-[#1A1A1A]';
  const subtitleColor = variant === 'light' ? 'text-[#A8BFA3]' : 'text-[#666666]';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Circular Beyond Strangers Emblem */}
      <svg
        viewBox="0 0 200 200"
        className={`${sizeClasses[size]} flex-shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Beyond Strangers Emblem"
      >
        {/* Outer Circular Gold Border */}
        <circle
          cx="100"
          cy="100"
          r="95"
          stroke="#C5A059"
          strokeWidth="3.5"
          fill="#FFFFFF"
        />

        {/* Inner Subtle Secondary Ring */}
        <circle
          cx="100"
          cy="100"
          r="92"
          stroke="#C5A059"
          strokeWidth="0.75"
          opacity="0.5"
        />

        {/* Text "BEYON" */}
        <text
          x="28"
          y="108"
          fill="#2C3E35"
          fontFamily="'Playfair Display', 'Newsreader', Georgia, serif"
          fontSize="35"
          fontWeight="600"
          letterSpacing="1"
        >
          BEYON
        </text>

        {/* Luxury Gold "D" with stylized flight path */}
        <text
          x="146"
          y="108"
          fill="#C5A059"
          fontFamily="'Playfair Display', 'Newsreader', Georgia, serif"
          fontSize="36"
          fontWeight="700"
        >
          D
        </text>

        {/* Airplane soaring through the D */}
        <g transform="translate(164, 88) rotate(-45) scale(0.65)">
          <path
            d="M10 0 L13 8 L22 10 L13 12 L10 20 L7 12 L-2 10 L7 8 Z"
            fill="#C5A059"
          />
        </g>

        {/* Fine flight arc trajectory */}
        <path
          d="M 148 108 Q 160 102 168 88"
          stroke="#C5A059"
          strokeWidth="1.2"
          strokeDasharray="2 2"
          fill="none"
        />

        {/* Separator line left */}
        <line x1="28" y1="120" x2="48" y2="120" stroke="#C5A059" strokeWidth="1" />
        
        {/* STRANGERS text */}
        <text
          x="100"
          y="124"
          textAnchor="middle"
          fill="#2C3E35"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="11.5"
          fontWeight="600"
          letterSpacing="4"
        >
          STRANGERS
        </text>

        {/* Separator line right */}
        <line x1="152" y1="120" x2="172" y2="120" stroke="#C5A059" strokeWidth="1" />

        {/* Subtitle: TRAVEL • CONNECT • MEMORIES */}
        <text
          x="100"
          y="142"
          textAnchor="middle"
          fill="#795548"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="6.5"
          fontWeight="600"
          letterSpacing="1.8"
        >
          TRAVEL • CONNECT • MEMORIES
        </text>
      </svg>

      {/* Brand Name Lockup */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif font-bold uppercase ${textColor} ${textClasses[size]} tracking-[0.22em] leading-none`}>
            BEYOND STRANGERS
          </span>
          <span className={`text-[9px] tracking-[0.18em] ${subtitleColor} uppercase font-sans mt-0.5 font-medium`}>
            Real People • Real Journeys
          </span>
        </div>
      )}
    </div>
  );
};
