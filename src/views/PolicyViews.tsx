import React from 'react';
import { ShieldCheck, RefreshCw, FileText, Lock, ArrowLeft, Mail, Phone } from 'lucide-react';
import { ActiveTab } from '../types';

interface PolicyViewProps {
  type?: 'terms' | 'privacy' | 'refund' | 'safety' | 'cancellation' | 'contact';
  setActiveTab: (tab: ActiveTab) => void;
}

export const PolicyViews: React.FC<PolicyViewProps> = ({ type = 'terms', setActiveTab }) => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5EF] text-[#202622]">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#183A2A] hover:text-[#2F6B45]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO HOME</span>
        </button>

        {type === 'contact' ? (
          <div className="bg-white border border-[#A8BFA3] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-2 border-b border-[#A8BFA3]/30 pb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2F6B45]">
                GET IN TOUCH
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#183A2A]">
                Contact Beyond Strangers
              </h1>
              <p className="text-xs text-[#202622]/70 font-mono">
                Field Base: Chennai • Tamil Nadu, India
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#202622]/85">
              <p className="leading-relaxed">
                Whether you have questions about trip fitness levels, twin-share rooms, or private custom departures for your company or college group, our team is happy to help.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#D8C3A5]/30 border border-[#A8BFA3] space-y-1">
                  <div className="flex items-center gap-2 text-[#183A2A] font-bold">
                    <Mail className="w-4 h-4" />
                    <span>Email Us</span>
                  </div>
                  <p className="text-xs font-mono text-[#202622]">hello@beyondstrangers.in</p>
                </div>

                <div className="p-4 rounded-xl bg-[#D8C3A5]/30 border border-[#A8BFA3] space-y-1">
                  <div className="flex items-center gap-2 text-[#183A2A] font-bold">
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp / Call</span>
                  </div>
                  <p className="text-xs font-mono text-[#202622]">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#A8BFA3] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-2 border-b border-[#A8BFA3]/30 pb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2F6B45]">
                POLICIES & SAFETY
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#183A2A]">
                Safety, Privacy & Refund Policy
              </h1>
              <p className="text-xs text-[#202622]/70 font-mono">
                Official Guidelines for South India Cohort Operations
              </p>
            </div>

            <div className="space-y-6 text-xs text-[#202622]/85 leading-relaxed">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#183A2A] font-serif">1. Solo Traveler Safety & Conduct</h3>
                <p>
                  Beyond Strangers operates on zero-tolerance for harassment, unsafe behavior, or discrimination. Every participant agrees to follow on-ground guide instructions and respect fellow cohort members.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#183A2A] font-serif">2. Cancellation & Refund Guidelines</h3>
                <p>
                  - Cancellation 7+ days prior to departure: 80% refund or 100% trip credit for a future chapter. <br />
                  - Cancellation within 3–7 days: 50% trip credit. <br />
                  - Cancellation within 48 hours: Non-refundable due to pre-booked estate stays and native vehicle permits.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#183A2A] font-serif">3. Weather & Forest Permissions</h3>
                <p>
                  Western Ghats weather is dynamic. If heavy rain or forest department alerts require route alteration, our certified lead will redirect the group to verified alternative viewpoints safely.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#183A2A] font-serif">4. Data Privacy</h3>
                <p>
                  Your phone number and email are used exclusively for cohort coordination via official Beyond Strangers channels and will never be shared with third-party marketers.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export const PolicyView = PolicyViews;
