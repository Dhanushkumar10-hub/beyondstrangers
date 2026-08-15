import React, { useState } from 'react';
import { Instagram, ArrowUpRight, Sparkles, MapPin, X } from 'lucide-react';
import { MediaItem } from '../types';

interface InstagramGallerySectionProps {
  mediaItems?: MediaItem[];
  onOpenJoinModal?: () => void;
}

export const InstagramGallerySection: React.FC<InstagramGallerySectionProps> = ({
  mediaItems = [],
  onOpenJoinModal
}) => {
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);

  // Filter media items for instagram or general gallery
  const instagramPhotos = mediaItems.filter(
    (m) => m.assignedSlot === 'instagram' || m.category === 'Destinations' || m.category === 'Nature' || m.category === 'Campfire'
  ).slice(0, 6);

  // Fallback if none mapped yet
  const fallbackPhotos: MediaItem[] = [
    {
      id: 'ig-1',
      title: 'Tea Trails & Ridge Sunrise',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
      type: 'image',
      category: 'Destinations',
      size: '2.8 MB',
      createdAt: '2026-08-01',
      assignedSlot: 'instagram',
      isDemo: true,
      location: 'Munnar, Kerala',
      caption: 'When the mist parts at 6:15 AM and the whole world turns emerald.',
      instagramUrl: 'https://instagram.com/beyondstrangers.in'
    },
    {
      id: 'ig-2',
      title: 'Campfire Acoustic Circle',
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
      type: 'image',
      category: 'Campfire',
      size: '1.8 MB',
      createdAt: '2026-08-03',
      assignedSlot: 'instagram',
      isDemo: true,
      location: 'Coorg, Karnataka',
      caption: 'No phones. Just embers, old Kishore Kumar songs, and new best friends.',
      instagramUrl: 'https://instagram.com/beyondstrangers.in'
    },
    {
      id: 'ig-3',
      title: 'Living Root Bridge Forest Trek',
      url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
      type: 'image',
      category: 'Nature',
      size: '3.1 MB',
      createdAt: '2026-08-05',
      assignedSlot: 'instagram',
      isDemo: true,
      location: 'Nongriat, Meghalaya',
      caption: 'Root bridges woven by living trees over hundreds of years.',
      instagramUrl: 'https://instagram.com/beyondstrangers.in'
    },
    {
      id: 'ig-4',
      title: 'Quiet Golden Hour Backwater Kayak',
      url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
      type: 'image',
      category: 'Destinations',
      size: '2.9 MB',
      createdAt: '2026-08-08',
      assignedSlot: 'instagram',
      isDemo: true,
      location: 'South Goa, India',
      caption: 'Paddling through silent mangrove channels as the sun dips into the sea.',
      instagramUrl: 'https://instagram.com/beyondstrangers.in'
    },
    {
      id: 'ig-5',
      title: 'Hampi Sunset Boulders',
      url: 'https://images.unsplash.com/photo-1600100397608-f010f444b415?auto=format&fit=crop&w=1000&q=80',
      type: 'image',
      category: 'Nature',
      size: '2.4 MB',
      createdAt: '2026-08-09',
      assignedSlot: 'instagram',
      isDemo: true,
      location: 'Matanga Hill, Hampi',
      caption: 'Watching history glow in orange and purple over the Tungabhadra.',
      instagramUrl: 'https://instagram.com/beyondstrangers.in'
    },
    {
      id: 'ig-6',
      title: 'Pine Forest Trail Walk',
      url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      type: 'image',
      category: 'Nature',
      size: '2.2 MB',
      createdAt: '2026-08-10',
      assignedSlot: 'instagram',
      isDemo: true,
      location: 'Western Ghats, India',
      caption: 'Step by step, the mountain air clears away months of city noise.',
      instagramUrl: 'https://instagram.com/beyondstrangers.in'
    }
  ];

  const displayPhotos = instagramPhotos.length >= 4 ? instagramPhotos : fallbackPhotos;

  return (
    <section id="from-the-journey" className="py-24 sm:py-28 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
              <Instagram className="w-4 h-4 text-[#0A0A0A]" />
              <span>FROM THE JOURNEY • @BEYONDSTRANGERS.IN</span>
            </div>
            <h2 className="text-[clamp(36px,4vw,52px)] font-bold font-serif-editorial text-[#0A0A0A] leading-tight">
              Real Moments. No Filters.
            </h2>
            <p className="text-base sm:text-lg text-[#555555] font-light max-w-xl leading-relaxed">
              Candid frames captured by travelers, captains, and newfound friends across our small-group expeditions.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/beyondstrangers.in"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-6 py-3 bg-[#0A0A0A] hover:bg-[#262626] text-white font-semibold text-sm sm:text-base tracking-wider uppercase transition-colors inline-flex items-center gap-2.5 shadow-xs"
            >
              <span>FOLLOW @BEYONDSTRANGERS.IN</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* =========================================================================
            SOPHISTICATED EDITORIAL ASYMMETRICAL GRID
            [ LARGE FEATURE IMAGE ]
            [ IMAGE ]               [ IMAGE ]
                   [ PORTRAIT IMAGE ]
            [ IMAGE ]               [ IMAGE ]
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* 1. Large Hero Feature Photo (Span 7) */}
          {displayPhotos[0] && (
            <div
              onClick={() => setSelectedImage(displayPhotos[0])}
              className="md:col-span-7 group relative aspect-[16/10] md:aspect-auto md:min-h-[440px] overflow-hidden border border-[#E5E5E5] bg-[#F7F7F5] cursor-pointer"
            >
              <img
                src={displayPhotos[0].url}
                alt={displayPhotos[0].title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Demo Badge if not yet replaced by admin */}
              {displayPhotos[0].isDemo && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#0A0A0A] text-[11px] font-mono font-medium px-2.5 py-1 uppercase tracking-wider border border-[#E5E5E5]">
                  DEMO IMAGE
                </div>
              )}

              {/* Hover Story Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="bg-white text-[#0A0A0A] px-4 py-2 text-xs font-bold font-mono tracking-widest uppercase shadow-md">
                  VIEW STORY →
                </span>
              </div>

              {/* Bottom Caption & Location */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5 pointer-events-none">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CCCCCC]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{displayPhotos[0].location || 'Western Ghats'}</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-serif-editorial">
                  {displayPhotos[0].title}
                </div>
                {displayPhotos[0].caption && (
                  <p className="text-sm sm:text-base text-[#E5E5E5] font-light line-clamp-1">
                    "{displayPhotos[0].caption}"
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 2. Right Side 2 Stacked Supporting Photos (Span 5) */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 sm:gap-8">
            {displayPhotos.slice(1, 3).map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedImage(photo)}
                className="group relative aspect-[16/10] md:aspect-auto md:h-[208px] overflow-hidden border border-[#E5E5E5] bg-[#F7F7F5] cursor-pointer"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                {photo.isDemo && (
                  <div className="absolute top-3 left-3 bg-white/90 text-[#0A0A0A] text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider">
                    DEMO IMAGE
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="bg-white text-[#0A0A0A] px-3 py-1.5 text-xs font-bold font-mono tracking-wider uppercase">
                    BEYOND STRANGERS
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5 pointer-events-none">
                  <div className="text-[11px] font-mono uppercase text-[#CCCCCC]">{photo.location}</div>
                  <div className="text-base sm:text-lg font-bold font-serif-editorial truncate">{photo.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Lower Row: Portrait Center + 2 Surrounding Photos */}
          {displayPhotos.length > 3 && (
            <>
              {/* Lower Left (Span 4) */}
              {displayPhotos[3] && (
                <div
                  onClick={() => setSelectedImage(displayPhotos[3])}
                  className="md:col-span-4 group relative aspect-[4/3] md:aspect-auto md:h-[300px] overflow-hidden border border-[#E5E5E5] bg-[#F7F7F5] cursor-pointer"
                >
                  <img
                    src={displayPhotos[3].url}
                    alt={displayPhotos[3].title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  
                  {displayPhotos[3].isDemo && (
                    <div className="absolute top-3 left-3 bg-white/90 text-[#0A0A0A] text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider">
                      DEMO IMAGE
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <div className="text-[11px] font-mono uppercase text-[#CCCCCC]">{displayPhotos[3].location}</div>
                    <div className="text-base sm:text-lg font-bold font-serif-editorial truncate">{displayPhotos[3].title}</div>
                  </div>
                </div>
              )}

              {/* Lower Center - Portrait Emphasis (Span 4) */}
              {displayPhotos[4] && (
                <div
                  onClick={() => setSelectedImage(displayPhotos[4])}
                  className="md:col-span-4 group relative aspect-[4/3] md:aspect-auto md:h-[300px] overflow-hidden border border-[#E5E5E5] bg-[#F7F7F5] cursor-pointer"
                >
                  <img
                    src={displayPhotos[4].url}
                    alt={displayPhotos[4].title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  
                  {displayPhotos[4].isDemo && (
                    <div className="absolute top-3 left-3 bg-white/90 text-[#0A0A0A] text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider">
                      DEMO IMAGE
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="bg-white text-[#0A0A0A] px-3.5 py-1.5 text-xs font-bold font-mono tracking-wider uppercase">
                      VIEW STORY →
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <div className="text-[11px] font-mono uppercase text-[#CCCCCC]">{displayPhotos[4].location}</div>
                    <div className="text-base sm:text-lg font-bold font-serif-editorial truncate">{displayPhotos[4].title}</div>
                  </div>
                </div>
              )}

              {/* Lower Right (Span 4) */}
              {displayPhotos[5] && (
                <div
                  onClick={() => setSelectedImage(displayPhotos[5])}
                  className="md:col-span-4 group relative aspect-[4/3] md:aspect-auto md:h-[300px] overflow-hidden border border-[#E5E5E5] bg-[#F7F7F5] cursor-pointer"
                >
                  <img
                    src={displayPhotos[5].url}
                    alt={displayPhotos[5].title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  
                  {displayPhotos[5].isDemo && (
                    <div className="absolute top-3 left-3 bg-white/90 text-[#0A0A0A] text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider">
                      DEMO IMAGE
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <div className="text-[11px] font-mono uppercase text-[#CCCCCC]">{displayPhotos[5].location}</div>
                    <div className="text-base sm:text-lg font-bold font-serif-editorial truncate">{displayPhotos[5].title}</div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Section Footer Callout */}
        <div className="p-8 sm:p-10 bg-[#F7F7F5] border border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
              FOLLOW THE JOURNEY
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#0A0A0A]">
              @beyondstrangers.in
            </div>
            <p className="text-sm sm:text-base text-[#555555] font-light">
              Tag <span className="font-mono text-[#0A0A0A]">#TheStrangerSociety</span> on your travels to be featured in our permanent dispatch archive.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://instagram.com/beyondstrangers.in"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-8 py-3.5 bg-[#0A0A0A] hover:bg-[#262626] text-white font-semibold text-sm sm:text-base tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <span>VIEW INSTAGRAM</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox / Story Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white max-w-3xl w-full border border-[#E5E5E5] overflow-hidden shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#0A0A0A]">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-black text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4 bg-white">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
                <div className="text-xs font-mono uppercase text-[#666666] tracking-wider font-medium">
                  {selectedImage.location || 'India'} • @beyondstrangers.in
                </div>
                {selectedImage.isDemo && (
                  <span className="text-[10px] font-mono bg-[#F0F0EE] px-2 py-0.5 text-[#666666]">
                    DEMO IMAGE
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#0A0A0A]">
                {selectedImage.title}
              </h3>

              {selectedImage.caption && (
                <p className="text-base sm:text-lg text-[#444444] font-light leading-relaxed">
                  "{selectedImage.caption}"
                </p>
              )}

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="https://instagram.com/beyondstrangers.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold uppercase tracking-wider text-[#0A0A0A] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Open on Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    setSelectedImage(null);
                    if (onOpenJoinModal) onOpenJoinModal();
                  }}
                  className="px-5 py-2.5 bg-[#0A0A0A] text-white text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-[#262626] transition-colors"
                >
                  Join This Tribe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
