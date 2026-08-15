import React from 'react';
import { motion } from 'motion/react';

interface StoryItem {
  number: string;
  title: string;
  excerpt: string;
}

interface TravelStoriesProps {
  onStoryClick?: (index: number) => void;
}

export const TravelStories: React.FC<TravelStoriesProps> = ({ onStoryClick }) => {
  const stories: StoryItem[] = [
    {
      number: 'FIELD NOTE 01',
      title: 'Lunch at Latha’s table',
      excerpt: 'A six-minute stop became an hour of stories, maps, and cardamom tea.',
    },
    {
      number: 'FIELD NOTE 02',
      title: 'The path behind the coffee estate',
      excerpt: 'The best waterfall wasn’t marked anywhere. A local heard us ask and pointed uphill.',
    },
    {
      number: 'FIELD NOTE 03',
      title: 'Roadside conversations',
      excerpt: 'A puncture became an invitation for tea, directions, and a glimpse into everyday village life.',
    },
  ];

  return (
    <section id="stories" className="bg-[#FDFBF7] py-20 md:py-28 border-b border-[#EAE6E1] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#666666] block mb-2 font-medium">
            Travel stories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1A1A] font-normal tracking-tight max-w-2xl">
            The things we remember after the route ends
          </h2>
        </motion.div>

        {/* 3 Minimalist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => onStoryClick && onStoryClick(index)}
              className="bg-white p-8 rounded-xs border border-[#EAE6E1] shadow-2xs hover:border-[#2C3E35]/40 transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-pointer"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[#666666] block">
                  {story.number}
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-[#1A1A1A] font-normal group-hover:text-[#2C3E35] transition-colors duration-200">
                  {story.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed font-light">
                {story.excerpt}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
