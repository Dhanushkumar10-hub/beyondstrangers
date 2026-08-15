import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, MapPin } from 'lucide-react';
import { TripHighlightBadge } from './TripHighlightBadge';

interface VideoStory {
  id: string;
  title: string;
  destination: string;
  videoUrl: string;
  posterImage: string;
  duration: string;
  alt: string;
}

export const VideoGallerySection: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const stories: VideoStory[] = [
    {
      id: 'vid-1',
      title: 'Pine Forest Morning',
      destination: 'Kodaikanal',
      videoUrl: 'assets/videos/previews/kodaikanal.mp4',
      posterImage: 'assets/images/destinations/kodaikanal.jpg',
      duration: '0:45',
      alt: 'Kodaikanal pine forest morning light'
    },
    {
      id: 'vid-2',
      title: 'Tea Estate Mist',
      destination: 'Valparai',
      videoUrl: 'assets/videos/hero_loop.mp4',
      posterImage: 'assets/images/destinations/valparai.jpg',
      duration: '0:38',
      alt: 'Valparai tea plantation mist'
    },
    {
      id: 'vid-3',
      title: 'Acoustic Campfire',
      destination: 'Kolli Hills',
      videoUrl: 'assets/videos/hero_loop.mp4',
      posterImage: 'assets/images/experiences/evening_campfire.jpg',
      duration: '1:12',
      alt: 'Campfire evening in Kolli Hills'
    }
  ];

  return (
    <section className="py-16 bg-[#F7F5EF] border-t border-[#A8BFA3]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8C3A5] border border-[#A8BFA3]/50 text-[#202622] text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#183A2A]" />
              <span>RAW ON-GROUND CLIPS</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#202622]">
              Glimpses from the Field
            </h2>
            <p className="text-xs sm:text-sm text-[#202622]/80">
              Unfiltered video previews captured during real chapters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="btn-secondary text-xs py-2 px-4 flex items-center gap-2"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#183A2A]" />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story) => {
            const isPlaying = activeVideoId === story.id;
            return (
              <div
                key={story.id}
                className="group relative rounded-2xl bg-[#F7F5EF] border border-[#A8BFA3] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                {/* Video Media Container */}
                <div className="relative aspect-[9/14] sm:aspect-[4/5] w-full bg-[#202622] overflow-hidden">
                  <video
                    src={story.videoUrl}
                    poster={story.posterImage}
                    muted={isMuted}
                    playsInline
                    loop
                    autoPlay={isPlaying}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202622]/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Location Tag */}
                  <div className="absolute top-3 left-3">
                    <TripHighlightBadge size="sm" location={story.destination} />
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 bg-[#202622]/80 text-[#F7F5EF] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    {story.duration}
                  </div>

                  {/* Center Play/Pause Overlay Button */}
                  <button
                    onClick={() => setActiveVideoId(isPlaying ? null : story.id)}
                    className="absolute inset-0 flex items-center justify-center text-white transition-opacity"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#183A2A]/80 backdrop-blur-sm border border-[#D8C3A5] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-[#D8C3A5]" />
                      ) : (
                        <Play className="w-5 h-5 text-[#D8C3A5] ml-0.5" />
                      )}
                    </div>
                  </button>

                  {/* Bottom Text in Media */}
                  <div className="absolute bottom-3 left-3 right-3 text-[#F7F5EF] space-y-0.5 pointer-events-none">
                    <h3 className="font-serif font-bold text-base text-white">
                      {story.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
