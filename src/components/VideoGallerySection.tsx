import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Sparkles, Film } from 'lucide-react';
import { MediaItem } from '../types';

interface VideoGallerySectionProps {
  mediaItems?: MediaItem[];
  onOpenJoinModal?: () => void;
}

export interface VideoClip {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  videoUrl: string;
  posterImage: string;
  category: string;
  location: string;
  description: string;
  badge?: string;
}

const DEFAULT_CLIPS: VideoClip[] = [
  {
    id: 'vid-gavi-1',
    title: 'Gavi / Thekkady — The Strangers Journey',
    subtitle: 'Official Promo Reel • 21–23 August',
    duration: '0:45',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    category: 'Gavi / Thekkady',
    location: 'Gavi Sanctuary & Thekkady, Kerala',
    description: 'A 2-night, 3-day exploration of mist-draped Western Ghats forests, waterfalls, lake boating, and starlit campfire circles with no age restriction.',
    badge: 'FEATURED CHAPTER • ₹9,999'
  },
  {
    id: 'vid-gavi-2',
    title: 'Private Falls & Lake Boating',
    subtitle: 'Aquatic Exploration & Natural Pools',
    duration: '0:32',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=85',
    category: 'Water & Falls',
    location: 'Gavi Hidden Stream, Kerala',
    description: 'Drifting along tranquil reservoir waters and dipping in private natural cascades away from commercial crowds.',
    badge: 'WATER EXPERIENCE'
  },
  {
    id: 'vid-gavi-3',
    title: 'Sanctuary Wildlife, Culture & Campfire Night',
    subtitle: 'Living Traditions & Fireside Stories',
    duration: '0:38',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-camp-fire-in-the-night-42273-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=85',
    category: 'Culture & Campfire',
    location: 'Thekkady & Base Camp, Kerala',
    description: 'Witnessing classical Kerala heritage performances, listening to forest bird calls, and gathering around a crackling hearth when the sun goes down.',
    badge: 'NIGHT & CULTURE'
  }
];

export const VideoGallerySection: React.FC<VideoGallerySectionProps> = ({
  mediaItems = [],
  onOpenJoinModal
}) => {
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreenModal, setIsFullscreenModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeClip = DEFAULT_CLIPS[activeClipIndex];

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSelectClip = (index: number) => {
    setActiveClipIndex(index);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section id="see-the-journey" className="py-24 sm:py-28 bg-[#080808] text-white border-y border-[#1E1E1E] relative overflow-hidden">
      
      {/* Subtle Environmental Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2B6344]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#222222]">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#888888] font-medium">
              <Film className="w-4 h-4 text-[#52B788]" />
              <span>OFFICIAL FOOTAGE • PROMOTIONAL ARCHIVE</span>
            </div>
            <h2 className="text-[clamp(34px,4vw,50px)] font-bold font-serif-editorial text-white tracking-tight leading-tight">
              SEE THE JOURNEY.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#AAAAAA] max-w-md font-light leading-relaxed">
            Raw, unscripted footage from the upcoming Gavi / Thekkady chapter. Experience the mist, waterfalls, boating, and starlit campfire atmosphere.
          </p>
        </div>

        {/* Video Player + Clip Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Large Cinematic Player (Desktop Widescreen / Responsive) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/9] w-full bg-[#121212] border border-[#2A2A2A] overflow-hidden group shadow-2xl">
              
              <video
                ref={videoRef}
                key={activeClip.videoUrl}
                src={activeClip.videoUrl}
                poster={activeClip.posterImage}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Top Meta Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="text-[11px] font-mono font-medium tracking-wider bg-black/75 backdrop-blur-md text-[#52B788] border border-[#2B6344]/60 px-3 py-1 uppercase">
                  {activeClip.badge || 'PROMOTIONAL FOOTAGE'}
                </span>
                <span className="text-[11px] font-mono text-[#CCCCCC] bg-black/75 backdrop-blur-md px-2.5 py-1">
                  📍 {activeClip.location}
                </span>
              </div>

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-4">
                <div className="space-y-1 max-w-lg">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#888888]">
                    {activeClip.subtitle}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white leading-tight">
                    {activeClip.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="w-11 h-11 bg-white/90 hover:bg-white text-black flex items-center justify-center transition-transform active:scale-95 shadow-lg"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={handleToggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="w-11 h-11 bg-black/70 hover:bg-black text-white border border-[#444] flex items-center justify-center transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#52B788]" />}
                  </button>

                  <button
                    onClick={() => setIsFullscreenModal(true)}
                    aria-label="Fullscreen view"
                    className="hidden sm:flex w-11 h-11 bg-black/70 hover:bg-black text-white border border-[#444] items-center justify-center transition-colors"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Active Clip Description */}
            <div className="p-4 bg-[#111111] border border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-[#AAAAAA] font-light leading-relaxed">
                {activeClip.description}
              </p>
              {onOpenJoinModal && (
                <button
                  onClick={onOpenJoinModal}
                  className="whitespace-nowrap px-4 py-2 bg-white text-black text-xs font-bold tracking-wider uppercase hover:bg-[#E5E5E5] transition-colors"
                >
                  JOIN THIS EXPEDITION →
                </button>
              )}
            </div>

          </div>

          {/* Right Playlist / Clip Selection (3 Promotional Reels) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#777777] font-medium px-1">
              PROMOTIONAL REELS (3 CLIPS)
            </div>

            <div className="space-y-3">
              {DEFAULT_CLIPS.map((clip, index) => {
                const isSelected = index === activeClipIndex;
                return (
                  <div
                    key={clip.id}
                    onClick={() => handleSelectClip(index)}
                    className={`p-3.5 border transition-all cursor-pointer flex gap-4 items-center group ${
                      isSelected
                        ? 'bg-[#181818] border-white shadow-md'
                        : 'bg-[#101010] border-[#222222] hover:border-[#444444] hover:bg-[#151515]'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-24 h-16 sm:w-28 sm:h-18 flex-shrink-0 bg-black overflow-hidden border border-[#333]">
                      <img
                        src={clip.posterImage}
                        alt={clip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isSelected ? 'bg-[#52B788] text-black' : 'bg-black/80 text-white'}`}>
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/90 text-white px-1 py-0.2">
                        {clip.duration}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#52B788] truncate">
                        REEL 0{index + 1} • {clip.category}
                      </div>
                      <h4 className={`text-xs sm:text-sm font-bold font-serif-editorial truncate leading-snug ${isSelected ? 'text-white' : 'text-[#CCCCCC] group-hover:text-white'}`}>
                        {clip.title}
                      </h4>
                      <p className="text-[11px] text-[#777777] truncate">
                        {clip.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Micro Note */}
            <div className="p-3.5 border border-[#1E1E1E] bg-[#0C0C0C] text-[11px] text-[#888888] font-mono leading-relaxed">
              <span className="text-white font-medium">Trip Reference:</span> Gavi / Thekkady • 21–23 August • ₹9,999 / Person • No Age Restriction
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreenModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full max-w-5xl bg-black border border-[#333333] overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsFullscreenModal(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/80 hover:bg-black text-white border border-[#444] flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full">
              <video
                src={activeClip.videoUrl}
                autoPlay
                controls
                className="w-full h-full object-contain bg-black"
              />
            </div>

            <div className="p-6 bg-[#111111] border-t border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#52B788]">
                  {activeClip.badge || 'BEYOND STRANGERS FOOTAGE'}
                </span>
                <h3 className="text-xl font-bold font-serif-editorial text-white mt-0.5">
                  {activeClip.title}
                </h3>
                <p className="text-xs text-[#AAAAAA] mt-1">{activeClip.description}</p>
              </div>

              {onOpenJoinModal && (
                <button
                  onClick={() => {
                    setIsFullscreenModal(false);
                    onOpenJoinModal();
                  }}
                  className="px-6 py-3 bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-[#E5E5E5] transition-colors"
                >
                  APPLY FOR THIS TRIP →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
