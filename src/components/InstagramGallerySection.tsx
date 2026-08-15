import React from 'react';
import { Instagram, ArrowUpRight, Heart, MessageCircle } from 'lucide-react';

interface GalleryPost {
  id: string;
  image: string;
  alt: string;
  caption: string;
  location: string;
  likes: number;
  comments: number;
}

export const InstagramGallerySection: React.FC = () => {
  const posts: GalleryPost[] = [
    {
      id: 'ig-1',
      image: 'assets/images/destinations/kodaikanal.jpg',
      alt: 'Kodaikanal misty pines with travelers',
      caption: 'Quiet morning at the pine trails.',
      location: 'Kodaikanal, TN',
      likes: 342,
      comments: 28
    },
    {
      id: 'ig-2',
      image: 'assets/images/stories/story_valparai.jpg',
      alt: 'Valparai tea plantation walk',
      caption: 'Wandering through 40 hairpin bends.',
      location: 'Valparai, TN',
      likes: 418,
      comments: 35
    },
    {
      id: 'ig-3',
      image: 'assets/images/destinations/ooty.jpg',
      alt: 'Nilgiris mountain overlook',
      caption: 'Chilly winds & Nilgiri pines.',
      location: 'Ooty, TN',
      likes: 290,
      comments: 19
    },
    {
      id: 'ig-4',
      image: 'assets/images/stories/story_kolli.jpg',
      alt: 'Kolli hills waterfall trail',
      caption: '70 hairpin bends to the falls.',
      location: 'Kolli Hills, TN',
      likes: 512,
      comments: 44
    },
    {
      id: 'ig-5',
      image: 'assets/images/destinations/meghamalai.jpg',
      alt: 'High wavys cloud sunrise',
      caption: 'Clouds rolling beneath our feet.',
      location: 'Meghamalai, TN',
      likes: 388,
      comments: 27
    },
    {
      id: 'ig-6',
      image: 'assets/images/stories/story_campfire.jpg',
      alt: 'Campfire acoustic storytelling',
      caption: 'Strangers at 8 PM. Friends by midnight.',
      location: 'Western Ghats',
      likes: 620,
      comments: 52
    }
  ];

  return (
    <section className="py-16 bg-[#F7F5EF] border-t border-[#A8BFA3]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8C3A5] border border-[#A8BFA3]/50 text-[#202622] text-xs font-mono font-bold">
              <Instagram className="w-3.5 h-3.5 text-[#183A2A]" />
              <span>@BEYONDSTRANGERS.IN</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#202622]">
              Real Travel Stories
            </h2>
            <p className="text-xs sm:text-sm text-[#202622]/80">
              Captured by travelers on real South India weekend cohorts.
            </p>
          </div>

          <a
            href="https://instagram.com/beyondstrangers.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs py-2 px-4 flex items-center gap-2"
          >
            <Instagram className="w-4 h-4 text-[#183A2A]" />
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#202622]" />
          </a>
        </div>

        {/* 6 Post Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#D8C3A5] border border-[#A8BFA3] shadow-sm"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Details Overlay */}
              <div className="absolute inset-0 bg-[#183A2A]/85 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white">
                <div className="text-[10px] font-mono uppercase text-[#D8C3A5] font-bold">
                  {post.location}
                </div>

                <p className="text-xs font-medium line-clamp-3 text-[#F7F5EF]">
                  "{post.caption}"
                </p>

                <div className="flex items-center gap-3 text-[10px] font-mono text-[#A8BFA3]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-[#D8C3A5] fill-[#D8C3A5]" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
