import React from 'react';
import { Sparkles, MessageCircle, Heart, MapPin } from 'lucide-react';
import { TripHighlightBadge } from '../components/TripHighlightBadge';

export const StoriesView: React.FC = () => {
  const travelerStories = [
    {
      id: 'story-1',
      author: 'Priya Narayanan',
      city: 'Chennai',
      chapter: 'Kodaikanal Chapter',
      image: 'assets/images/stories/story_kodaikanal.jpg',
      avatar: 'assets/images/stories/avatar_priya.jpg',
      text: 'Joining solo felt scary at first, but by the first tea break everyone was laughing together.',
      badge: 'SOLO TRAVELER'
    },
    {
      id: 'story-2',
      author: 'Arjun Swaminathan',
      city: 'Bengaluru',
      chapter: 'Valparai Chapter',
      image: 'assets/images/stories/story_valparai.jpg',
      avatar: 'assets/images/stories/avatar_arjun.jpg',
      text: '40 hairpin bends, zero mobile signal, and the best conversations I have had this entire year.',
      badge: 'WEEKEND EXPLORER'
    },
    {
      id: 'story-3',
      author: 'Sneha Mohan',
      city: 'Coimbatore',
      chapter: 'Kolli Hills Chapter',
      image: 'assets/images/stories/story_kolli.jpg',
      avatar: 'assets/images/stories/avatar_sneha.jpg',
      text: 'The waterfall hike was intense, but the campfire acoustic songs made it completely worthwhile.',
      badge: 'ADVENTURER'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF] text-[#202622]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8C3A5] border border-[#A8BFA3]/50 text-[#202622] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#183A2A]" />
            <span>COMMUNITY JOURNAL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#183A2A]">
            Stories from the Road
          </h1>
          <p className="text-xs sm:text-sm text-[#202622]/80 font-medium">
            Real impressions from solo travelers who joined our weekend chapters.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {travelerStories.map((story) => (
            <div
              key={story.id}
              className="bg-[#F7F5EF] border border-[#A8BFA3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Media Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#D8C3A5]">
                <img
                  src={story.image}
                  alt={`${story.chapter} experience photo`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#183A2A] text-[#F7F5EF] text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                    {story.badge}
                  </span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#202622]/80 italic leading-relaxed">
                  "{story.text}"
                </p>

                <div className="pt-3 border-t border-[#A8BFA3]/30 flex items-center gap-3">
                  <img
                    src={story.avatar}
                    alt={story.author}
                    className="w-9 h-9 rounded-full object-cover border border-[#A8BFA3] bg-[#D8C3A5]"
                  />
                  <div>
                    <div className="font-bold text-xs text-[#183A2A]">{story.author}</div>
                    <div className="text-[10px] text-[#202622]/60 font-mono">{story.city} • {story.chapter}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
