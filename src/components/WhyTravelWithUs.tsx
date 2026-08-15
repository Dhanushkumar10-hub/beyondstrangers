import React from 'react';
import { motion } from 'motion/react';

interface PrincipleItem {
  title: string;
  description: string;
}

export const WhyTravelWithUs: React.FC = () => {
  const principles: PrincipleItem[] = [
    {
      title: 'Small groups',
      description: 'More room in the vehicle, more time in each place, more attention to the day.',
    },
    {
      title: 'Local pace',
      description: 'Routes built around local knowledge—not the fastest way between two pins.',
    },
    {
      title: 'Travel with care',
      description: 'We leave more space for people, landscapes, and moments that cannot be scheduled.',
    },
  ];

  return (
    <section id="about" className="bg-[#2C3E35] text-[#FDFBF7] py-20 md:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18 max-w-2xl"
        >
          <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#D8C3A5] block mb-2 font-medium">
            Why travel with us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#FDFBF7] font-normal leading-snug tracking-tight">
            Enough of a plan to feel cared for. Enough room to wander.
          </h2>
        </motion.div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-[#FDFBF7]/15 pt-10">
          {principles.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="space-y-3"
            >
              <h3 className="text-lg sm:text-xl font-serif text-[#FDFBF7] font-normal">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#FDFBF7]/75 font-sans leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
