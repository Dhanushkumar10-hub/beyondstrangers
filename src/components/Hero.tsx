import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Play, Pause, ChevronDown } from 'lucide-react';

export interface HeroMedia {
  type: 'image' | 'video';
  urls: {
    mobile?: string;
    desktop?: string;
    poster: string;
  };
  alt: string;
}

export interface HeroTripData {
  title: string;
  subtitle?: string;
  destination?: string;
  dates: string;
  duration: string;
  price: string;
  age?: string;
}

export interface HeroProps {
  media: HeroMedia;
  trip: HeroTripData;
  onJoin: () => void;
  onExplore?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  media,
  trip,
  onJoin,
  onExplore,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Preload LCP image tag for performance
  useEffect(() => {
    if (!media.urls.poster) return;
    const linkId = 'lcp-hero-preload';
    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'preload';
      link.as = 'image';
      link.href = media.urls.poster;
      document.head.appendChild(link);
    }
  }, [media.urls.poster]);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section 
      aria-label="Current Featured Journey Hero"
      className="relative w-full h-[62vh] min-h-[480px] max-h-[640px] md:h-[68vh] bg-[#0E1712] overflow-hidden flex items-end"
    >
      {/* Background Media Container */}
      <div className="absolute inset-0 w-full h-full">
        {media.type === 'video' && !prefersReducedMotion && (media.urls.desktop || media.urls.mobile) ? (
          <video
            ref={videoRef}
            src={media.urls.desktop || media.urls.mobile}
            poster={media.urls.poster}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="w-full h-full object-cover opacity-60 pointer-events-none"
          />
        ) : (
          <img
            src={media.urls.desktop || media.urls.poster}
            alt={media.alt || trip.title}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-65"
          />
        )}

        {/* Crisp Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08110B] via-[#08110B]/60 to-[#08110B]/30" />
      </div>

      {/* Video Control Toggle */}
      {media.type === 'video' && (
        <button
          type="button"
          onClick={toggleVideo}
          aria-label={isPlaying ? 'Pause hero background video' : 'Play hero background video'}
          className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/75 text-white/90 text-xs backdrop-blur-md border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#74C69D] transition-colors"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="text-[10px] font-mono tracking-wider">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
        </button>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 pb-8 md:pb-10 pt-12">
        <div className="max-w-3xl">
          {/* Subtitle / Brand Eyebrow */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#74C69D] uppercase">
              BEYOND STRANGERS
            </span>
            <span className="h-1 w-1 rounded-full bg-[#74C69D]/60 hidden sm:inline-block" />
            <span className="text-[10px] sm:text-xs font-mono text-white/80 uppercase">
              {trip.subtitle || 'THE STRANGER SOCIETY'}
            </span>
          </div>

          {/* Title with fluid clamp sizing (28px -> 52px) */}
          <h1 
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)' }}
            className="font-serif font-bold text-white tracking-tight leading-[1.15] mb-3 text-balance"
          >
            {trip.title}
          </h1>

          {/* Quick Meta Badges */}
          <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs sm:text-sm text-neutral-300 mb-5 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#74C69D] shrink-0" />
              <span>{trip.dates}</span>
            </div>
            <span className="text-neutral-500">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#74C69D] shrink-0" />
              <span>{trip.duration}</span>
            </div>
            {trip.destination && (
              <>
                <span className="text-neutral-500 hidden sm:inline">•</span>
                <div className="hidden sm:flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#74C69D] shrink-0" />
                  <span>{trip.destination}</span>
                </div>
              </>
            )}
            <span className="text-neutral-500">•</span>
            <span className="bg-[#1C4D35] text-[#A7F3D0] px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-bold tracking-wide">
              {trip.age || 'NO AGE RESTRICTION'}
            </span>
          </div>

          {/* Price & Primary Call to Action */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Price Badge */}
            <div className="flex items-baseline gap-1.5 bg-black/50 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15">
              <span 
                style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.875rem)' }}
                className="font-serif font-bold text-white"
              >
                {trip.price}
              </span>
            </div>

            {/* Primary High-Contrast Action Button */}
            <button
              type="button"
              onClick={onJoin}
              aria-label={`Join this journey: ${trip.title}`}
              className="h-12 sm:h-14 px-6 sm:px-8 bg-[#080808] hover:bg-neutral-900 active:bg-black text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl border border-white/20 shadow-lg flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#74C69D] focus:ring-offset-2 focus:ring-offset-[#08110B] transition-all"
            >
              <span>JOIN THIS JOURNEY</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Explore Action */}
            {onExplore && (
              <button
                type="button"
                onClick={onExplore}
                aria-label="Explore trip highlights and details"
                className="h-12 sm:h-14 px-4 sm:px-5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-medium backdrop-blur-md border border-white/15 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
              >
                <span>Details</span>
                <ChevronDown className="w-4 h-4 text-neutral-300" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
