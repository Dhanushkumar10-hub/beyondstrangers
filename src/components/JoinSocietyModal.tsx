import React, { useState } from 'react';
import { X, Check, Sparkles, Shield, Heart } from 'lucide-react';
import { TribePersonality } from '../types';

interface JoinSocietyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (memberData: any) => void;
}

export const JoinSocietyModal: React.FC<JoinSocietyModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [personality, setPersonality] = useState<TribePersonality>('THE ADVENTURER');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSuccess({ name, email, city, personality });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183A2A]/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#F7F5EF] border border-[#A8BFA3] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 text-[#202622]">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#202622]/60 hover:text-[#202622] transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div className="space-y-2 border-b border-[#A8BFA3]/40 pb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#D8C3A5] text-[#202622] text-[10px] font-mono font-bold uppercase">
                <Sparkles className="w-3 h-3 text-[#183A2A]" />
                INVITATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#183A2A]">
                Join The Society
              </h2>
              <p className="text-xs text-[#202622]/80 leading-relaxed">
                Connect with verified solo travelers across South India. Get early access to upcoming weekend batches.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[#202622] font-mono font-semibold block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Deepika Rao"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#A8BFA3] rounded-xl px-3.5 py-2.5 text-xs text-[#202622] focus:border-[#183A2A] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#202622] font-mono font-semibold block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="deepika@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#A8BFA3] rounded-xl px-3.5 py-2.5 text-xs text-[#202622] focus:border-[#183A2A] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#202622] font-mono font-semibold block mb-1">Home City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Chennai / Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-[#A8BFA3] rounded-xl px-3.5 py-2.5 text-xs text-[#202622] focus:border-[#183A2A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#202622] font-mono font-semibold block mb-1">Your Travel Energy</label>
                <select
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value as TribePersonality)}
                  className="w-full bg-white border border-[#A8BFA3] rounded-xl px-3 py-2.5 text-xs text-[#202622] focus:border-[#183A2A] outline-none"
                >
                  <option value="THE ADVENTURER">The Adventurer (Trails, viewpoints & hikes)</option>
                  <option value="THE CHILL SEEKER">The Chill Seeker (Campfire, music & slow tea)</option>
                  <option value="THE PHOTOGRAPHER">The Storyteller (Visual moments & perspectives)</option>
                  <option value="THE FOODIE">The Food Explorer (Local Tamil cuisine & coffee)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-primary text-xs py-3 w-full"
                >
                  SUBMIT INVITATION REQUEST
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-[#2F6B45]/20 text-[#2F6B45] rounded-full flex items-center justify-center mx-auto border border-[#2F6B45]/30">
              <Check className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-serif text-[#183A2A]">
                Request Confirmed
              </h2>
              <p className="text-xs text-[#202622]/80 max-w-sm mx-auto leading-relaxed">
                Thank you for applying to join The Stranger Society. We will review your profile and send chapter invitations to your email.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="btn-primary text-xs py-2.5 px-6"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
