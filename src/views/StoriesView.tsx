import React from 'react';
import { Quote, Heart, MessageSquare } from 'lucide-react';
import { DEMO_TESTIMONIALS, DEMO_COMMUNITY_POSTS } from '../data/mockData';

export const StoriesView: React.FC = () => {
  return (
    <div className="bg-white text-[#0A0A0A] pt-24 pb-28 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
            JOURNALS & VOICES
          </div>
          <h1 className="text-[clamp(36px,4.5vw,58px)] font-bold font-serif-editorial text-[#0A0A0A] tracking-tight leading-tight">
            Stories From The Society
          </h1>
          <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed">
            Unscripted reflections, candid captures, and campfire memories from solo travelers who ventured beyond their comfort zone.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {DEMO_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#F7F7F5] border border-[#E5E5E5] p-7 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-4">
                <Quote className="w-7 h-7 text-[#888888]" />
                <p className="text-base sm:text-[17px] text-[#222222] font-light leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-5 border-t border-[#E5E5E5]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="w-12 h-12 object-cover border border-[#CCCCCC]"
                />
                <div>
                  <div className="font-bold text-[#0A0A0A] text-base">{t.name}</div>
                  <div className="text-xs text-[#666666] font-mono">{t.city} • {t.tripName}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Dispatches */}
        <div className="space-y-8 pt-12 border-t border-[#E5E5E5]">
          <div className="space-y-2">
            <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-semibold">
              PHOTO JOURNALS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#0A0A0A]">
              Dispatches From The Trail
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DEMO_COMMUNITY_POSTS.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-[#E5E5E5] p-7 sm:p-8 space-y-5 shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    loading="lazy"
                    className="w-12 h-12 object-cover border border-[#E5E5E5]"
                  />
                  <div>
                    <div className="font-bold text-[#0A0A0A] text-base">{post.author.name}</div>
                    <div className="text-xs text-[#666666] font-mono">{post.destination} • {post.createdAt}</div>
                  </div>
                </div>

                <p className="text-base text-[#333333] font-light leading-relaxed">
                  {post.content}
                </p>

                {post.images && post.images.length > 0 && (
                  <div className="border border-[#E5E5E5] aspect-video overflow-hidden bg-[#F7F7F5]">
                    <img
                      src={post.images[0]}
                      alt="Post media"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="pt-3 flex items-center justify-between text-xs text-[#666666] border-t border-[#F0F0EE]">
                  <span className="font-mono">{post.likesCount} Travelers Liked</span>
                  <span className="text-[#0A0A0A] font-bold uppercase tracking-wider">Verified Trip Story</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
