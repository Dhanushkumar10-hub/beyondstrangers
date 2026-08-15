import React, { useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { TribePersonality, TravelerProfile } from '../types';

interface JoinSocietyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinSuccess: (profile: TravelerProfile) => void;
}

export const JoinSocietyModal: React.FC<JoinSocietyModalProps> = ({ isOpen, onClose, onJoinSuccess }) => {
  const [step, setStep] = useState<'form' | 'pass'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [instagram, setInstagram] = useState('');
  const [personality, setPersonality] = useState<TribePersonality>('THE SOCIAL ONE');
  const [createdProfile, setCreatedProfile] = useState<TravelerProfile | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newProfile: TravelerProfile = {
      id: 'soc-' + Date.now(),
      name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      city: city || 'Mumbai',
      occupation: 'Member of The Society',
      bio: `Joined The Stranger Society as ${personality}.`,
      tribePersonality: personality,
      interests: ['Wilderness', 'Photography', 'Campfire Acoustic'],
      travelStyle: ['Solo Explorer', 'Slow Travel'],
      journeysJoinedCount: 0,
      badges: ['Society Pioneer', 'Verified Member'],
      isDemo: true,
      instagramHandle: instagram ? (instagram.startsWith('@') ? instagram : '@' + instagram) : '@beyondstrangers.in',
      favoriteQuote: 'Arrive as strangers. Leave with stories.',
      verifiedTraits: ['Identity Verified', 'Digital Pass Issued']
    };

    setCreatedProfile(newProfile);
    onJoinSuccess(newProfile);
    setStep('pass');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white border border-[#0A0A0A] p-6 sm:p-10 shadow-2xl space-y-6 text-[#0A0A0A]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#777777] hover:text-[#0A0A0A] transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="space-y-8">
            <div className="space-y-2 border-b border-[#E5E5E5] pb-5">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
                THE STRANGER SOCIETY
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#0A0A0A]">
                Apply for Member Pass
              </h2>
              <p className="text-base text-[#555555]">
                Unlock access to unannounced small-group expeditions and alumni campfire weekends.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-sm sm:text-base">
              <div>
                <label className="text-[#333333] font-semibold block mb-2">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F7F7F5] border border-[#E5E5E5] px-4 py-3 text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>

              <div>
                <label className="text-[#333333] font-semibold block mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ananya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F7F7F5] border border-[#E5E5E5] px-4 py-3 text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[#333333] font-semibold block mb-2">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#F7F7F5] border border-[#E5E5E5] px-4 py-3 text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                <div>
                  <label className="text-[#333333] font-semibold block mb-2">Instagram (Optional)</label>
                  <input
                    type="text"
                    placeholder="@yourhandle"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full bg-[#F7F7F5] border border-[#E5E5E5] px-4 py-3 text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#333333] font-semibold block mb-2">Travel Persona</label>
                <select
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value as TribePersonality)}
                  className="w-full bg-[#F7F7F5] border border-[#E5E5E5] px-4 py-3 text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                >
                  <option value="THE SOCIAL ONE">THE SOCIAL ONE</option>
                  <option value="THE ADVENTURER">THE ADVENTURER</option>
                  <option value="THE EXPLORER">THE EXPLORER</option>
                  <option value="THE SLOW TRAVELLER">THE SLOW TRAVELLER</option>
                  <option value="THE STORYTELLER">THE STORYTELLER</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#0A0A0A] text-white font-bold text-base uppercase tracking-widest hover:bg-[#262626] transition-colors shadow-sm"
                >
                  GENERATE MEMBER PASS
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-8">
            <div className="p-8 bg-[#F7F7F5] border border-[#E5E5E5] space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#666666] font-semibold">THE STRANGER SOCIETY</span>
                <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">VERIFIED PASS</span>
              </div>
              <div className="pt-2 space-y-1">
                <h3 className="text-3xl font-bold font-serif-editorial text-[#0A0A0A]">{name}</h3>
                <div className="text-sm sm:text-base text-[#555555] font-mono">{personality} • {city}</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-10 py-4 bg-[#0A0A0A] text-white text-base font-bold uppercase tracking-widest hover:bg-[#262626] transition-colors"
            >
              CLOSE & EXPLORE
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
