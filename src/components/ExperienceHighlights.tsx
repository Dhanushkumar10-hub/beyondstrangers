import React from 'react';
import { TreePine, Waves, Flame, Users, Sparkles, Compass } from 'lucide-react';
import { TripHighlightBadge } from './TripHighlightBadge';

interface HighlightItem {
  icon: any;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  alt: string;
}

export const ExperienceHighlights: React.FC = () => {
  const highlights: HighlightItem[] = [
    {
      icon: TreePine,
      title: 'Forest Trails',
      subtitle: 'Secret shola forest walks',
      badge: 'NATURE WALKS',
      image: 'assets/images/experiences/forest_trails.jpg',
      alt: 'Shola forest trail in Western Ghats Tamil Nadu'
    },
    {
      icon: Waves,
      title: 'Private Waterfalls',
      subtitle: 'Hidden crystal pools',
      badge: 'WATERFALL CHILL',
      image: 'assets/images/experiences/private_waterfalls.jpg',
      alt: 'Secluded waterfall and stream in South India'
    },
    {
      icon: Flame,
      title: 'Campfire Acoustic',
      subtitle: 'Music & midnight talks',
      badge: 'CAMPFIRE NIGHTS',
      image: 'assets/images/experiences/evening_campfire.jpg',
      alt: 'Evening campfire gathering with acoustic guitar'
    },
    {
      icon: Users,
      title: 'Solo Travelers',
      subtitle: 'Arrive solo, leave bonded',
      badge: 'COHORT OF 10-12',
      image: 'assets/images/experiences/meet_new_people.jpg',
      alt: 'Small group of solo travelers exploring together'
    },
    {
      icon: Compass,
      title: 'Tea Estate Walks',
      subtitle: 'Fresh mist & mountain tea',
      badge: 'VALPARAI & NILGIRIS',
      image: 'assets/images/experiences/tea_walk.jpg',
      alt: 'Lush green tea garden walk in Valparai Tamil Nadu'
    },
    {
      icon: Sparkles,
      title: 'Cloud Sunrises',
      subtitle: 'Spectacular peak views',
      badge: 'PEAK MOMENTS',
      image: 'assets/images/experiences/cloud_sunrise.jpg',
      alt: 'Sunrise above clouds in Kodaikanal hills'
    }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF] border-t border-[#A8BFA3]/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8C3A5] border border-[#A8BFA3]/50 text-[#202622] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#183A2A]" />
            <span>THE STRANGER EXPERIENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#202622]">
            What You Will Live
          </h2>
          <p className="text-sm text-[#202622]/80 font-medium">
            Carefully curated moments in hidden corners of South India.
          </p>
        </div>

        {/* 6 Responsive Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#F7F5EF] border border-[#A8BFA3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Media Image Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#D8C3A5]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202622]/50 via-transparent to-transparent" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#183A2A] text-[#F7F5EF] text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-4 space-y-1.5 flex-1 bg-[#F7F5EF]">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#D8C3A5] text-[#183A2A]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-serif font-bold text-[#202622]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#202622]/75 font-medium pl-8">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
