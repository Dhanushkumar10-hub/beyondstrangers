import React from 'react';
import { Users, Sparkles, Shield, Heart, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { TribePersonality } from '../types';

interface SocietyViewProps {
  onJoinClick?: () => void;
}

export const SocietyView: React.FC<SocietyViewProps> = ({ onJoinClick }) => {
  const values = [
    {
      title: 'Solo First',
      desc: 'Most join alone. No existing cliques.'
    },
    {
      title: 'Small Cohorts',
      desc: 'Capped strictly at 10–12 explorers.'
    },
    {
      title: 'Pre-Screened',
      desc: 'Safe, respectful community vibes.'
    },
    {
      title: 'Zero Pressure',
      desc: 'Hike, read, or sit by the campfire.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF] text-[#202622]">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8C3A5] border border-[#A8BFA3]/50 text-[#202622] text-xs font-mono font-bold">
            <Users className="w-3.5 h-3.5 text-[#183A2A]" />
            <span>THE STRANGER SOCIETY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#183A2A]">
            Where Strangers Find Their Tribe
          </h1>

          <p className="text-xs sm:text-sm text-[#202622]/80 font-medium leading-relaxed">
            We bring thoughtful solo travelers together for unforgettable weekend escapes across the South Indian wilderness.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#D8C3A5]/30 border border-[#A8BFA3] space-y-2"
            >
              <CheckCircle2 className="w-5 h-5 text-[#2F6B45]" />
              <h3 className="font-serif font-bold text-base text-[#183A2A]">
                {v.title}
              </h3>
              <p className="text-xs text-[#202622]/75 font-medium leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#D8C3A5] border border-[#A8BFA3]">
            <img
              src="assets/images/experiences/meet_new_people.jpg"
              alt="Solo travelers conversing on mountain ridge"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#D8C3A5] border border-[#A8BFA3]">
            <img
              src="assets/images/experiences/evening_campfire.jpg"
              alt="Acoustic evening around campfire"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#D8C3A5] border border-[#A8BFA3]">
            <img
              src="assets/images/experiences/forest_trails.jpg"
              alt="Group walk through lush shola forest"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Action Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#183A2A] text-[#F7F5EF] text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">
            Become a Society Member
          </h2>
          <p className="text-xs sm:text-sm text-[#F7F5EF]/80 max-w-md mx-auto">
            Get exclusive invites to unannounced chapters, secret trail popups, and community dinners.
          </p>

          <button
            onClick={onJoinClick}
            className="btn-primary text-xs sm:text-sm py-3.5 px-8 shadow-lg"
          >
            <span>APPLY FOR INVITATION</span>
          </button>
        </div>

      </div>
    </div>
  );
};
