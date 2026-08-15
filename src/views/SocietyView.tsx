import React from 'react';
import { Instagram, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { DEMO_TRAVELERS } from '../data/mockData';

interface SocietyViewProps {
  onOpenJoinModal: () => void;
}

export const SocietyView: React.FC<SocietyViewProps> = ({ onOpenJoinModal }) => {
  return (
    <div className="bg-[#0A0A0A] text-white pt-24 pb-28 min-h-screen relative overflow-hidden selection:bg-white selection:text-[#0A0A0A]">
      
      {/* Background Botanical Editorial Silhouette */}
      <div className="absolute right-0 top-1/4 w-[380px] opacity-[0.025] pointer-events-none">
        <svg viewBox="0 0 200 400" fill="currentColor">
          <path d="M100 10 C100 10 110 50 140 70 C160 85 180 110 170 140 C160 165 130 170 120 190 C110 210 150 240 140 280 C130 310 105 350 100 390 C95 350 70 310 60 280 C50 240 90 210 80 190 C70 170 40 165 30 140 C20 110 40 85 60 70 C90 50 100 10 100 10 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Header Manifesto */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#AAAAAA] font-medium">
            THE STRANGER SOCIETY
          </div>

          <h1 className="text-[clamp(38px,4.5vw,62px)] font-bold font-serif-editorial text-white tracking-tight leading-[1.08]">
            Where Strangers Find Their Tribe.
          </h1>

          <p className="text-base sm:text-lg text-[#BBBBBB] font-light leading-relaxed max-w-xl mx-auto">
            The Stranger Society is a curated collective of solo explorers, writers, engineers, designers, and dreamers across India. You don't need a pre-existing group to travel. You just need the willingness to arrive with an open mind.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenJoinModal}
              className="min-h-[50px] px-8 py-3.5 bg-white text-[#0A0A0A] font-bold text-sm sm:text-base tracking-wider uppercase hover:bg-[#E5E5E5] transition-colors shadow-md"
            >
              APPLY FOR DIGITAL MEMBER PASS
            </button>
          </div>
        </div>

        {/* Member Roster Grid */}
        <div className="space-y-8 pt-12 border-t border-[#262626]">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-[#888888] font-medium">
              COMMUNITY DIRECTORY
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white">
              Members of the Society
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEMO_TRAVELERS.map((traveler) => (
              <div
                key={traveler.id}
                className="bg-[#141414] border border-[#262626] p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={traveler.avatar}
                      alt={traveler.name}
                      loading="lazy"
                      className="w-14 h-14 object-cover border border-[#333333]"
                    />
                    <div>
                      <div className="font-bold text-white text-base">{traveler.name}</div>
                      <div className="text-xs text-[#AAAAAA] font-mono font-medium">{traveler.tribePersonality}</div>
                      <div className="text-xs text-[#888888]">{traveler.city}</div>
                    </div>
                  </div>

                  <p className="text-sm text-[#AAAAAA] leading-relaxed italic font-light line-clamp-3">
                    "{traveler.bio}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#222222] flex items-center justify-between text-xs text-[#888888]">
                  <span>{traveler.journeysJoinedCount} Journeys</span>
                  <span className="text-[#DDDDDD] font-mono">{traveler.instagramHandle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Society Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-[#262626]">
          <div className="p-7 border border-[#262626] space-y-3 bg-[#141414]">
            <div className="text-xs font-mono text-[#888888] font-medium uppercase tracking-wider">01 / VETTING</div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white">Application-Only Trips</h3>
            <p className="text-sm sm:text-base text-[#999999] leading-relaxed font-light">
              Every participant completes a personality questionnaire to preserve a safe, balanced, and drama-free dynamic.
            </p>
          </div>

          <div className="p-7 border border-[#262626] space-y-3 bg-[#141414]">
            <div className="text-xs font-mono text-[#888888] font-medium uppercase tracking-wider">02 / RESPECT</div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white">Zero Tolerance Policy</h3>
            <p className="text-sm sm:text-base text-[#999999] leading-relaxed font-light">
              We enforce strict community standards to ensure female solo travelers feel completely safe and valued throughout the trip.
            </p>
          </div>

          <div className="p-7 border border-[#262626] space-y-3 bg-[#141414]">
            <div className="text-xs font-mono text-[#888888] font-medium uppercase tracking-wider">03 / PERKS</div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white">Lifetime Alumni Pass</h3>
            <p className="text-sm sm:text-base text-[#999999] leading-relaxed font-light">
              Once you complete your first journey, you receive early access to unannounced chapters and private alumni campfire weekends.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
