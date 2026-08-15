import React, { useState } from 'react';
import { RefreshCw, Check, MessageSquare, Mail, ChevronDown, ChevronUp, Instagram, Phone, ArrowRight, Send } from 'lucide-react';
import { ActiveTab } from '../types';
import { FOUNDER_DATA } from '../data/mockData';

interface PolicyViewProps {
  type: 'cancellation' | 'privacy' | 'terms' | 'contact';
  setActiveTab: (tab: ActiveTab) => void;
}

export const PolicyView: React.FC<PolicyViewProps> = ({ type, setActiveTab }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  const faqs = [
    {
      q: 'Who can join the trip? Is there an age restriction?',
      a: 'Anyone with a spirit of curiosity! Beyond Strangers trips have NO AGE RESTRICTION. Over 85% of travelers join solo. Whether you are in college, working in tech/design, or taking a life break, you are warmly welcomed.'
    },
    {
      q: 'What is the duration and date of the upcoming Gavi / Thekkady trip?',
      a: 'The upcoming chapter runs for 2 Nights / 3 Days from 21 — 23 August.'
    },
    {
      q: 'What is the price per person?',
      a: '₹9,999 per person all-inclusive of curated activities, local stays, and team coordination. Zero hidden booking fees.'
    },
    {
      q: 'Where is the destination located?',
      a: 'Gavi Sanctuary & Thekkady in the pristine Western Ghats of Kerala, renowned for its evergreen rainforests, waterfalls, and peaceful lake waterways.'
    },
    {
      q: 'How do I contact Founder Dharsh or the Beyond Strangers team?',
      a: 'You can DM Dharsh directly on Instagram at @dharsh_here__ or send us a WhatsApp message / inquiry using the direct buttons on this page.'
    },
    {
      q: 'How do I join the trip?',
      a: 'Click any "Join This Journey" button on the website, submit your basic details, and our team will get in touch with you with cohort confirmation.'
    },
    {
      q: 'What happens after I register?',
      a: 'You will receive immediate booking confirmation, pre-trip packing guidelines, and an invite to the cohort group before departure.'
    },
    {
      q: 'What is the group size for each chapter?',
      a: 'We strictly cap every single journey to 10–12 travelers to ensure genuine conversations, safety, and an intimate experience.'
    },
    {
      q: 'What is your cancellation policy?',
      a: '100% full refund or free rescheduling to any future chapter with 15+ days notice. We believe in human-first flexibility.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setFormSubmitted(true);
  };

  return (
    <div className="bg-white text-[#0A0A0A] pt-24 pb-28 min-h-screen selection:bg-[#0A0A0A] selection:text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#666666] font-medium">
            {type === 'cancellation' && 'TRANSPARENCY & ASSURANCE'}
            {type === 'privacy' && 'CONFIDENTIALITY'}
            {type === 'terms' && 'SOCIETY CODE'}
            {type === 'contact' && 'DIRECT INQUIRIES & FOUNDER ACCESS'}
          </div>
          <h1 className="text-[clamp(36px,5vw,64px)] font-bold font-serif-editorial text-[#0A0A0A] leading-tight">
            {type === 'cancellation' && 'Cancellation & Rescheduling'}
            {type === 'privacy' && 'Privacy Policy'}
            {type === 'terms' && 'Terms & Society Conduct'}
            {type === 'contact' && 'Contact Beyond Strangers'}
          </h1>
          <p className="text-base sm:text-lg text-[#555555] font-light max-w-2xl mx-auto leading-relaxed">
            {type === 'cancellation' && 'Flexible, human-friendly refund guidelines designed for peace of mind.'}
            {type === 'privacy' && 'How Beyond Strangers protects your privacy and personal data.'}
            {type === 'terms' && 'Community standards and mutual respect principles across every expedition.'}
            {type === 'contact' && 'Reach out directly to Founder Dharsh (@dharsh_here__) or our experience coordination desk.'}
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-[#F7F7F5] border border-[#E5E5E5] p-6 sm:p-12 space-y-10 text-base sm:text-lg text-[#333333] font-light leading-relaxed shadow-xs">
          
          {/* CANCELLATION */}
          {type === 'cancellation' && (
            <div className="space-y-8">
              <div className="p-6 bg-white border border-[#E5E5E5] flex items-start gap-4">
                <RefreshCw className="w-7 h-7 text-[#0A0A0A] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[#0A0A0A] text-lg sm:text-xl">Flexible Rescheduling Guarantee</h3>
                  <p className="text-base text-[#555555] mt-2 leading-relaxed">
                    Life happens. You can transfer 100% of your booking amount to any future chapter with 15+ days notice without any penalty.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#0A0A0A] pt-6 border-t border-[#E5E5E5]">
                Refund Timeline Breakdown
              </h3>
              <ul className="space-y-5 text-base sm:text-lg">
                <li className="flex items-start gap-3.5">
                  <Check className="w-6 h-6 text-[#0A0A0A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0A0A0A] font-semibold">15+ Days Before Journey:</strong> 100% full refund or free transfer to any future chapter.
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <Check className="w-6 h-6 text-[#0A0A0A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0A0A0A] font-semibold">7 to 14 Days Before Journey:</strong> 50% refund or 75% credit voucher towards any future chapter.
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <Check className="w-6 h-6 text-[#777777] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0A0A0A] font-semibold">Under 7 Days:</strong> Non-refundable due to boutique stays & transport locks, but transferable to a verified friend.
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* PRIVACY */}
          {type === 'privacy' && (
            <div className="space-y-8">
              <p>
                At Beyond Strangers, we respect your privacy. We will never sell, rent, or trade your personal contact details, government ID verification docs, or emergency contact info to third parties.
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#0A0A0A]">Data Encryption</h3>
              <p>
                All sensitive documents provided during the member pass vetting flow are stored securely and accessed strictly by the expedition captains for safety reasons during active journeys.
              </p>
            </div>
          )}

          {/* TERMS */}
          {type === 'terms' && (
            <div className="space-y-8">
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#0A0A0A]">1. The Stranger Society Pledge</h3>
              <p>
                Every participant commits to arriving with an open mind, showing kindness to locals and fellow travelers, and actively fostering an inclusive, welcoming atmosphere.
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#0A0A0A]">2. Zero Tolerance Safety</h3>
              <p>
                Harassment, unwanted advances, or disrespectful behavior towards fellow travelers or local communities will result in immediate removal from the trip at the traveler's own expense.
              </p>
            </div>
          )}

          {/* CONTACT */}
          {type === 'contact' && (
            <div className="space-y-10">
              
              {/* Founder Direct Badge */}
              <div className="p-6 bg-white border border-[#E5E5E5] space-y-4">
                <div className="text-xs font-mono uppercase tracking-widest text-[#666666]">
                  FOUNDER DIRECT CONTACT
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#0A0A0A]">
                      {FOUNDER_DATA.name}
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-[#555555]">
                      Founder, Beyond Strangers • The Stranger Society
                    </div>
                  </div>

                  <a
                    href="https://instagram.com/dharsh_here__"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A0A0A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#262626] transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>DM @dharsh_here__</span>
                  </a>
                </div>
              </div>

              {/* Direct Channels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <a
                  href="https://instagram.com/dharsh_here__"
                  target="_blank"
                  rel="noreferrer"
                  className="p-6 bg-white border border-[#E5E5E5] block hover:border-[#0A0A0A] transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase text-[#666666] font-semibold">Instagram Channel</span>
                    <Instagram className="w-5 h-5 text-[#1C4D35]" />
                  </div>
                  <span className="font-bold text-lg text-[#0A0A0A] block group-hover:underline">@dharsh_here__</span>
                  <span className="text-xs text-[#666666] font-mono mt-1 block">Direct DM for fast trip responses</span>
                </a>

                <a
                  href="mailto:tribe@beyondstrangers.in"
                  className="p-6 bg-white border border-[#E5E5E5] block hover:border-[#0A0A0A] transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase text-[#666666] font-semibold">Official Email</span>
                    <Mail className="w-5 h-5 text-[#1C4D35]" />
                  </div>
                  <span className="font-bold text-lg text-[#0A0A0A] block group-hover:underline">tribe@beyondstrangers.in</span>
                  <span className="text-xs text-[#666666] font-mono mt-1 block">Cohort queries and partnerships</span>
                </a>
              </div>

              {/* Quick Contact Form */}
              <div className="p-8 bg-white border border-[#E5E5E5] space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#0A0A0A]">
                    Send a Quick Message
                  </h3>
                  <p className="text-sm text-[#555555]">
                    Have a question about Gavi / Thekkady or upcoming trips? Leave your note below.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-6 bg-[#F7F7F5] border border-[#1C4D35] space-y-2 text-center">
                    <div className="text-base font-bold text-[#1C4D35] font-mono">
                      ✓ MESSAGE RECEIVED
                    </div>
                    <p className="text-sm text-[#555555]">
                      Thank you! Founder Dharsh or the coordination desk will respond to your contact details shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-sm font-sans">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#555555] mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Verma"
                          className="w-full bg-[#F7F7F5] border border-[#E5E5E5] p-3 text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#555555] mb-1">WhatsApp / Phone or Email</label>
                        <input
                          type="text"
                          required
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          placeholder="e.g. +91 98765 43210 or name@email.com"
                          className="w-full bg-[#F7F7F5] border border-[#E5E5E5] p-3 text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#555555] mb-1">Your Question or Note</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="e.g. I want to join solo for the 21-23 August trip to Gavi. What should I prepare?"
                        className="w-full bg-[#F7F7F5] border border-[#E5E5E5] p-3 text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="min-h-[48px] px-8 py-3 bg-[#0A0A0A] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#262626] transition-colors flex items-center gap-2"
                    >
                      <span>SEND INQUIRY</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

        </div>

        {/* FAQs */}
        <div className="space-y-8 pt-6 border-t border-[#E5E5E5]">
          <div className="space-y-2 text-center sm:text-left">
            <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#666666]">
              CLARITY & DETAILS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#0A0A0A]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#E5E5E5] bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between text-base sm:text-lg font-bold text-[#0A0A0A]"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-[#666666] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#666666] shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="p-6 pt-0 text-base text-[#444444] font-light leading-relaxed border-t border-[#F0F0EE]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
