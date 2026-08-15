import React from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  Users, 
  AlertTriangle, 
  Lock, 
  PhoneCall, 
  FileText, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TripLeader, ActiveTab } from '../types';

interface HowItWorksViewProps {
  leaders: TripLeader[];
  setActiveTab: (tab: ActiveTab) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ leaders, setActiveTab }) => {
  return (
    <div id="how-it-works-view-wrapper" className="max-w-5xl mx-auto px-4 py-10 space-y-16">
      
      {/* Top Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <span className="bg-emerald-950 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-800 inline-flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" /> Platform Guide
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-100">
          How Group Travel Works
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
          Everything you need to know about joining a trip with strangers, leader credentials, safety checks, and cancellation policies.
        </p>
      </div>

      {/* 4 Step Process Detailed */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-stone-100 border-b border-stone-800 pb-3">
          The 4-Step Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              num: '01',
              title: 'Discover & Compare Trips',
              desc: 'Filter curated itineraries by destination, budget, trip category (Adventure, Beach, Backpacking), and duration. Review day-by-day plans, inclusions, and accommodation details.'
            },
            {
              num: '02',
              title: 'Co-Traveler Transparency',
              desc: 'Check the profile tags, city of origin, and interests of fellow travelers who have already joined the group. Female solo travelers are matched with verified female roommates.'
            },
            {
              num: '03',
              title: 'Pre-Trip Whatsapp Group & Briefing',
              desc: '5 days before departure, you will be invited to a private group managed by your Trip Leader to coordinate packing lists, pickup spots, and ice-breaker intros.'
            },
            {
              num: '04',
              title: 'Hassle-Free Group Travel',
              desc: 'Your Trip Leader manages all logistics, permits, stay check-ins, and trail guides so you can relax, take photos, and make genuine friends.'
            }
          ].map((item) => (
            <div key={item.num} className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-2">
              <span className="text-2xl font-black text-emerald-400 font-mono block">{item.num}</span>
              <h3 className="text-base font-bold text-stone-100">{item.title}</h3>
              <p className="text-xs text-stone-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety & Verification Deep Dive */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <div>
            <h2 className="text-xl font-bold text-stone-100">Safety & Trust Standards</h2>
            <p className="text-xs text-stone-400">Strict safety mechanisms built for young adult group travel.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-1">
            <h4 className="text-xs font-bold text-stone-200">Government ID Verification</h4>
            <p className="text-xs text-stone-400">All travelers submit government ID verification prior to final booking confirmation.</p>
          </div>
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-1">
            <h4 className="text-xs font-bold text-stone-200">Certified Trip Hosts</h4>
            <p className="text-xs text-stone-400">Leaders undergo background checks, First Aid certification, and local route training.</p>
          </div>
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-1">
            <h4 className="text-xs font-bold text-stone-200">Zero Harassment Policy</h4>
            <p className="text-xs text-stone-400">Zero tolerance for misconduct, discrimination, or non-consensual behavior.</p>
          </div>
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-1">
            <h4 className="text-xs font-bold text-stone-200">Cancellation & Refunds</h4>
            <p className="text-xs text-stone-400">Full refund if cancelled 15+ days prior to start date. Transparent tier system.</p>
          </div>
        </div>
      </div>

      {/* Meet Trip Leaders Showcase */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-stone-100 border-b border-stone-800 pb-3">
          Meet Our Trip Leaders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaders.map((leader) => (
            <div key={leader.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src={leader.avatar} alt={leader.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500" />
                <div>
                  <h4 className="font-bold text-stone-100 text-sm">{leader.name}</h4>
                  <p className="text-[11px] text-emerald-400 font-medium">{leader.title}</p>
                </div>
              </div>
              <p className="text-xs text-stone-300 line-clamp-3">{leader.about}</p>
              <div className="pt-2 border-t border-stone-800 text-[10px] text-stone-400 flex justify-between">
                <span>{leader.tripsHosted} Trips Hosted</span>
                <span className="text-amber-400 font-bold">{leader.rating} ⭐ (Demo)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => setActiveTab('explore')}
          className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-extrabold px-8 py-3.5 rounded-2xl text-xs sm:text-sm inline-flex items-center gap-2"
        >
          <span>Find a Group Trip Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
