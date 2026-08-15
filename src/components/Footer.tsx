import React from 'react';
import { Compass, ArrowRight, Instagram, Mail, Lock } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPolicy: (type: 'cancellation' | 'privacy' | 'terms' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenPolicy }) => {
  return (
    <footer className="bg-[#0A0A0A] text-[#E5E5E5] border-t border-[#1F1F1F] pt-24 pb-16 relative overflow-hidden">
      
      {/* Subtle background botanical silhouette in footer */}
      <div className="absolute right-0 bottom-0 w-96 opacity-[0.03] pointer-events-none text-white">
        <svg viewBox="0 0 200 400" fill="currentColor">
          <path d="M100 10 C100 10 110 50 140 70 C160 85 180 110 170 140 C160 165 130 170 120 190 C110 210 150 240 140 280 C130 310 105 350 100 390 C95 350 70 310 60 280 C50 240 90 210 80 190 C70 170 40 165 30 140 C20 110 40 85 60 70 C90 50 100 10 100 10 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Top Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-14">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2.5">
              <div className="text-3xl font-bold font-serif-editorial text-white tracking-tight">
                BEYOND STRANGERS
              </div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#AAAAAA] font-medium">
                THE STRANGER SOCIETY
              </div>
            </div>

            <p className="text-base sm:text-[17px] text-[#BBBBBB] leading-relaxed max-w-md font-light">
              Curated small-group journeys across India designed for individuals who want to explore more, travel thoughtfully, and form genuine connections.
            </p>

            <div className="pt-2 text-sm text-[#AAAAAA] font-mono space-y-1">
              <div>Founder: <strong className="text-white font-semibold">Dharsh</strong></div>
              <div className="flex items-center gap-2 pt-1">
                <a 
                  href="https://instagram.com/dharsh_here__"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-white hover:text-[#52B788] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#52B788]" />
                  <span>@dharsh_here__</span>
                </a>
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:col-span-2 space-y-5">
            <div className="text-sm font-mono uppercase tracking-widest text-[#AAAAAA] font-semibold">
              EXPLORE
            </div>
            <ul className="space-y-3.5 text-base text-[#CCCCCC]">
              <li>
                <button 
                  onClick={() => { setActiveTab('experiences'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  All Experiences
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('destinations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Destinations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('society'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  The Society
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('stories'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Traveler Stories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  About & Manifesto
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('design-system'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-xs font-mono text-[#D4CADF]"
                >
                  Design Tokens & Spec ↗
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-5">
            <div className="text-sm font-mono uppercase tracking-widest text-[#AAAAAA] font-semibold">
              TRUST & LEGAL
            </div>
            <ul className="space-y-3.5 text-base text-[#CCCCCC]">
              <li>
                <button onClick={() => onOpenPolicy('cancellation')} className="hover:text-white transition-colors">
                  Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('terms')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('contact')} className="hover:text-white transition-colors">
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Dispatch / Newsletter */}
          <div className="md:col-span-3 space-y-5">
            <div className="text-sm font-mono uppercase tracking-widest text-[#AAAAAA] font-semibold">
              THE SOCIETY DISPATCH
            </div>
            <p className="text-base text-[#AAAAAA] leading-relaxed font-light">
              Receive private invitations to unreleased chapters and secret expeditions.
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-[#141414] border border-[#333333] text-white text-sm sm:text-base px-4 py-3 focus:outline-none focus:border-white transition-colors"
              />
              <button 
                className="bg-white text-[#0A0A0A] px-5 py-3 hover:bg-[#E5E5E5] transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#888888]">
          <div>
            © {new Date().getFullYear()} Beyond Strangers (The Stranger Society). All rights reserved.
          </div>

          <div className="flex items-center gap-8">
            <a 
              href="https://instagram.com/dharsh_here__" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#52B788]" />
              <span>@dharsh_here__</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
