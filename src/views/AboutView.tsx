import React from 'react';
import { Compass, ShieldCheck, Heart, MapPin, Mail, Instagram } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF] text-[#202622]">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8C3A5] border border-[#A8BFA3]/50 text-[#202622] text-xs font-mono font-bold">
            <Compass className="w-3.5 h-3.5 text-[#183A2A]" />
            <span>ORIGIN & MISSION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#183A2A]">
            Why Beyond Strangers Exists
          </h1>

          <p className="text-xs sm:text-sm text-[#202622]/80 font-medium leading-relaxed">
            Founded in Tamil Nadu to solve a simple modern problem: when you want to travel, but your friends are busy, you shouldn’t have to stay home.
          </p>
        </div>

        {/* 3 Visual Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#D8C3A5]/30 border border-[#A8BFA3] space-y-3">
            <div className="p-2.5 rounded-xl bg-[#183A2A] text-[#D8C3A5] w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#183A2A]">Safe Solo Spaces</h3>
            <p className="text-xs text-[#202622]/80 leading-relaxed">
              Strictly vetted cohorts with 50:50 gender balance guidelines and dedicated on-ground leads.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#D8C3A5]/30 border border-[#A8BFA3] space-y-3">
            <div className="p-2.5 rounded-xl bg-[#183A2A] text-[#D8C3A5] w-fit">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#183A2A]">Secret South India</h3>
            <p className="text-xs text-[#202622]/80 leading-relaxed">
              We skip tourist traps and take you to private estates, secret waterfalls, and hidden ridge trails.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#D8C3A5]/30 border border-[#A8BFA3] space-y-3">
            <div className="p-2.5 rounded-xl bg-[#183A2A] text-[#D8C3A5] w-fit">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#183A2A]">Zero Commercial Hype</h3>
            <p className="text-xs text-[#202622]/80 leading-relaxed">
              Real campfires, acoustic guitar sessions, local South Indian meals, and unhurried mornings.
            </p>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="p-8 rounded-3xl bg-[#183A2A] text-[#F7F5EF] space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-[#F7F5EF]">
              Have a question or custom cohort request?
            </h3>
            <p className="text-xs text-[#F7F5EF]/80 font-mono">
              Base: Chennai, Tamil Nadu • hello@beyondstrangers.in
            </p>
          </div>

          <a
            href="mailto:hello@beyondstrangers.in"
            className="btn-primary text-xs py-3 px-6 shrink-0"
          >
            CONTACT OUR TEAM
          </a>
        </div>

      </div>
    </div>
  );
};
