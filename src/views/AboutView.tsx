import React from 'react';
import { ArrowRight, Instagram } from 'lucide-react';
import { FOUNDER_DATA } from '../data/mockData';

export const AboutView: React.FC = () => {
  return (
    <div className="bg-white text-[#0A0A0A] pt-24 pb-28 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Brand Mission Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#666666] font-medium">
            MANIFESTO & ORIGINS
          </div>

          <h1 className="text-[clamp(38px,4.5vw,62px)] font-bold font-serif-editorial text-[#0A0A0A] tracking-tight leading-[1.08]">
            Beyond Strangers
          </h1>

          <p className="text-xl sm:text-2xl font-serif-editorial italic text-[#333333]">
            "Where strangers find their tribe."
          </p>

          <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed max-w-2xl mx-auto">
            Beyond Strangers is a travel collective operating as “The Stranger Society.” We design intimate small-group escapes across India for independent individuals, solo travelers, and curious minds who believe the deepest memories happen when you step outside familiar circles.
          </p>
        </div>

        {/* Founder Story */}
        <div className="bg-[#F7F7F5] border border-[#E5E5E5] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center shadow-xs">
          <div className="md:col-span-5 aspect-[4/5] border border-[#E5E5E5] overflow-hidden bg-white">
            <img
              src={FOUNDER_DATA.avatar}
              alt={FOUNDER_DATA.name}
              loading="lazy"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="md:col-span-7 space-y-5">
            <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#666666] font-semibold">
              FOUNDER'S LETTER
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-editorial text-[#0A0A0A] leading-tight">
              Why Beyond Strangers Exists
            </h2>

            <div className="space-y-4 text-base sm:text-[17px] text-[#444444] font-light leading-relaxed">
              <p>
                Too many people cancel their dream trips because coordinating with friend groups in adulthood is hard. Work deadlines clash, priorities shift, and life gets in the way.
              </p>
              <p>
                We built Beyond Strangers to eliminate that friction. You book your spot, pack your bag, and arrive at the base camp knowing that every single person in the group is there for the exact same reason: to explore thoughtfully and connect without pretense.
              </p>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#0A0A0A] font-mono">
              <span className="font-bold">— {FOUNDER_DATA.name}, Founder</span>
              <span className="text-[#888888]">•</span>
              <a 
                href="https://instagram.com/dharsh_here__"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0A0A0A] hover:underline font-semibold"
              >
                <Instagram className="w-4 h-4 text-[#1C4D35]" />
                <span>@dharsh_here__</span>
              </a>
            </div>

            <div className="pt-2">
              <a
                href="https://instagram.com/dharsh_here__"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 min-h-[46px] px-6 py-2.5 bg-[#0A0A0A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#262626] transition-colors"
              >
                <span>MESSAGE FOUNDER ON INSTAGRAM</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="space-y-8 pt-6">
          <div className="space-y-2">
            <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-semibold">
              ETHOS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#0A0A0A]">
              Our Five Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                num: '01',
                title: 'Curated Itineraries',
                desc: 'Handpicked family estates, tea plantations, and ridge routes rather than commercial tourist traps.'
              },
              {
                num: '02',
                title: 'Strictly 10–12 Guests',
                desc: 'Intimacy is non-negotiable. Small cohorts guarantee genuine conversations and quick cohesion.'
              },
              {
                num: '03',
                title: 'Solo-Traveler First',
                desc: 'Zero single supplements, verified room matching, and a culture where solo attendees are the norm.'
              },
              {
                num: '04',
                title: 'Local Stewardship',
                desc: 'We support independent homestays, native guides, and rural communities directly.'
              },
              {
                num: '05',
                title: 'Pacing Over Rush',
                desc: 'We prioritize slow mornings with mountain views over frantic 6-destination checklists.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-white border border-[#E5E5E5] space-y-3 shadow-xs">
                <div className="font-mono text-xs sm:text-sm text-[#666666] font-bold">{item.num}</div>
                <h3 className="text-lg sm:text-xl font-bold font-serif-editorial text-[#0A0A0A]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
