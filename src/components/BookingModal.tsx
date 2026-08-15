import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Trip, BookingDetails, TribePersonality } from '../types';
import { TripHighlightBadge } from './TripHighlightBadge';

interface BookingModalProps {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: BookingDetails) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ trip, isOpen, onClose, onBookingSuccess }) => {
  const [travelerCount, setTravelerCount] = useState(1);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [city, setCity] = useState('');
  const [personality, setPersonality] = useState<TribePersonality>('THE ADVENTURER');
  const [specialNotes, setSpecialNotes] = useState('');
  const [roomPreference, setRoomPreference] = useState('Twin-Sharing (Same Gender)');
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen || !trip) return null;

  const totalAmount = trip.price * travelerCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'STRANGER-' + Math.floor(100000 + Math.random() * 900000);
    const booking: BookingDetails = {
      id: 'book-' + Date.now(),
      tripId: trip.id,
      tripTitle: trip.title,
      contactName,
      contactEmail,
      contactPhone,
      city: city || 'Chennai',
      tribePersonality: personality,
      travelerCount,
      totalAmount,
      status: 'CONFIRMED',
      specialNotes: `${roomPreference}. ${specialNotes}`,
      bookingReference: ref,
      bookingDate: new Date().toISOString().split('T')[0],
      isDemo: true
    };

    setBookingRef(ref);
    setConfirmed(true);
    onBookingSuccess(booking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183A2A]/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#F7F5EF] border border-[#A8BFA3] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 text-[#202622]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#202622]/60 hover:text-[#202622] transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          <div className="space-y-6">
            <div className="space-y-2 border-b border-[#A8BFA3]/40 pb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#D8C3A5] text-[#202622] text-[10px] font-mono font-bold uppercase">
                <Sparkles className="w-3 h-3 text-[#183A2A]" />
                RESERVATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#183A2A]">
                {trip.title}
              </h2>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <TripHighlightBadge size="sm" location={trip.destination} />
                <TripHighlightBadge size="sm" duration={`${trip.durationDays}D / ${trip.durationNights}N`} />
                <TripHighlightBadge size="sm" price={trip.price} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#202622] font-mono font-semibold block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-white border border-[#A8BFA3] rounded-xl px-3.5 py-2.5 text-xs text-[#202622] focus:border-[#183A2A] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#202622] font-mono font-semibold block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-white border border-[#A8BFA3] rounded-xl px-3.5 py-2.5 text-xs text-[#202622] focus:border-[#183A2A] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[#202622] font-mono font-semibold block mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-white border border-[#A8BFA3] rounded-xl px-3.5 py-2.5 text-xs text-[#202622] focus:border-[#183A2A] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[#202622] font-mono font-semibold block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Chennai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-[#A8BFA3] rounded-xl px-3.5 py-2.5 text-xs text-[#202622] focus:border-[#183A2A] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#202622] font-mono font-semibold block mb-1">Travelers</label>
                  <select
                    value={travelerCount}
                    onChange={(e) => setTravelerCount(Number(e.target.value))}
                    className="w-full bg-white border border-[#A8BFA3] rounded-xl px-3 py-2.5 text-xs text-[#202622] focus:border-[#183A2A] outline-none"
                  >
                    <option value={1}>1 Solo Explorer</option>
                    <option value={2}>2 Travelers</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#202622] font-mono font-semibold block mb-1">Room Preference</label>
                <select
                  value={roomPreference}
                  onChange={(e) => setRoomPreference(e.target.value)}
                  className="w-full bg-white border border-[#A8BFA3] rounded-xl px-3 py-2.5 text-xs text-[#202622] focus:border-[#183A2A] outline-none"
                >
                  <option value="Twin-Sharing (Same Gender)">Twin-Sharing (Matched with verified same-gender solo traveler)</option>
                  <option value="Private Room Upgrade (+₹3,500)">Private Room Upgrade (+₹3,500)</option>
                </select>
              </div>

              {/* Price Calculation Box */}
              <div className="p-4 bg-[#D8C3A5]/40 border border-[#A8BFA3] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono text-[#202622]/80 uppercase font-bold">Total All-Inclusive</div>
                  <div className="text-2xl font-bold font-serif text-[#183A2A]">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary text-xs py-2.5 px-6"
                >
                  CONFIRM RESERVATION
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-12 h-12 bg-[#2F6B45]/20 text-[#2F6B45] rounded-full flex items-center justify-center mx-auto border border-[#2F6B45]/30">
              <Check className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#2F6B45] uppercase">
                RESERVATION RECEIVED
              </span>
              <h2 className="text-2xl font-bold font-serif text-[#183A2A]">
                Welcome to the Cohort
              </h2>
              <p className="text-xs text-[#202622]/80 max-w-sm mx-auto leading-relaxed">
                Your reservation reference is <strong className="font-mono text-[#183A2A] font-bold">{bookingRef}</strong>. Our team will connect with you via WhatsApp to coordinate group arrival.
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
