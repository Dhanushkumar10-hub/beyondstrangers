import React from 'react';
import { MapPin, Calendar, Users, Compass } from 'lucide-react';

interface TripHighlightBadgeProps {
  location?: string;
  duration?: string;
  seatsLeft?: number | string;
  highlight?: string;
  price?: number | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TripHighlightBadge: React.FC<TripHighlightBadgeProps> = ({
  location,
  duration,
  seatsLeft,
  highlight,
  price,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2'
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {location && (
        <span 
          className={`inline-flex items-center font-mono font-medium rounded-md bg-[#D8C3A5] text-[#202622] border border-[#A8BFA3]/50 shadow-sm ${sizeClasses[size]}`}
          title="Location"
        >
          <MapPin className="w-3 h-3 text-[#183A2A] shrink-0" />
          <span className="truncate">{location}</span>
        </span>
      )}

      {duration && (
        <span 
          className={`inline-flex items-center font-mono font-medium rounded-md bg-[#D8C3A5] text-[#202622] border border-[#A8BFA3]/50 shadow-sm ${sizeClasses[size]}`}
          title="Trip Duration"
        >
          <Calendar className="w-3 h-3 text-[#183A2A] shrink-0" />
          <span>{duration}</span>
        </span>
      )}

      {seatsLeft !== undefined && (
        <span 
          className={`inline-flex items-center font-mono font-medium rounded-md bg-[#D8C3A5] text-[#202622] border border-[#A8BFA3]/50 shadow-sm ${sizeClasses[size]}`}
          title="Seat Availability"
        >
          <Users className="w-3 h-3 text-[#183A2A] shrink-0" />
          <span>{typeof seatsLeft === 'number' ? `${seatsLeft} Seats Left` : seatsLeft}</span>
        </span>
      )}

      {highlight && (
        <span 
          className={`inline-flex items-center font-mono font-medium rounded-md bg-[#D8C3A5] text-[#202622] border border-[#A8BFA3]/50 shadow-sm ${sizeClasses[size]}`}
          title="Experience Feature"
        >
          <Compass className="w-3 h-3 text-[#183A2A] shrink-0" />
          <span>{highlight}</span>
        </span>
      )}

      {price && (
        <span 
          className={`inline-flex items-center font-mono font-bold rounded-md bg-[#183A2A] text-[#F7F5EF] border border-[#183A2A] shadow-sm ${sizeClasses[size]}`}
          title="All-Inclusive Price"
        >
          <span>₹{typeof price === 'number' ? price.toLocaleString('en-IN') : price}</span>
        </span>
      )}
    </div>
  );
};
