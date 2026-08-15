import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { Trip, BookingDetails, TribePersonality } from '../types';

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
  const depositAmount = Math.round(totalAmount * 0.3);

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
      city: city || 'Bengaluru',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#0A0A0A] p-6 sm:p-10 shadow-2xl space-y-6 my-8 text-[#0A0A0A]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#777777] hover:text-[#0A0A0A] transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          <div className="space-y-8">
            <div className="space-y-2 border-b border-[#E5E5E5] pb-5">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
                CHAPTER RESERVATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#0A0A0A]">
                Reserve: {trip.title}
              </h2>
              <div className="text-sm sm:text-base text-[#555555]">
                {trip.dates} • {trip.durationDays}D / {trip.durationNights}N • {trip.destination}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-sm sm:text-base">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[#333333] font-semibold block mb-2">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#F7F7F5] border border-[#E5E5E5] px-4 py-3 text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                <div>
                  <label className="text-[#333333] font-semibold block mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ananya@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-[#F7F7F5] border border-[#E5E5E5] px-4 py-3 text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-[#333333] font-semibold block mb-2">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-[#F7F7F5] border border-[#E5E5E5] px-4 py-3 text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                <div>
                  <label className="text-[#333333] font-semibold block mb-2">Current City *</label>
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
                  <label className="text-[#333333] font-semibold block mb-2">Travelers</label>
                  <select
                    value={travelerCount}
                    onChange={(e) => setTravelerCount(Number(e.target.value))}
                    className="w-full bg-[#F7F7F5] border border-[#E5E5E5] px-4 py-3 text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  >
                    <option value={1}>1 Traveler (Solo)</option>
                    <option value={2}>2 Travelers</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#333333] font-semibold block mb-2">Room Preference</label>
                <select
                  value={roomPreference}
                  onChange={(e) => setRoomPreference(e.target.value)}
                  className="w-full bg-[#F7F7F5] border border-[#E5E5E5] px-4 py-3 text-base text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                >
                  <option value="Twin-Sharing (Same Gender)">Twin-Sharing (Matched with verified same-gender solo traveler)</option>
                  <option value="Private Room Upgrade (+₹3,500)">Private Solo Room Upgrade (+₹3,500)</option>
                </select>
              </div>

              {/* Price Calculation */}
              <div className="p-6 bg-[#F7F7F5] border border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-[#666666] uppercase font-medium">Total Cost</div>
                  <div className="text-3xl font-bold font-serif-editorial text-[#0A0A0A]">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs sm:text-sm text-[#666666]">Deposit today: ₹{depositAmount.toLocaleString('en-IN')}</div>
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 bg-[#0A0A0A] hover:bg-[#262626] text-white font-bold text-sm sm:text-base uppercase tracking-widest transition-colors shadow-sm"
                >
                  CONFIRM SPOT
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-8">
            <div className="w-16 h-16 bg-[#0A0A0A] text-white flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <div className="text-sm font-mono uppercase tracking-widest text-[#666666] font-semibold">
                RESERVATION CONFIRMED
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#0A0A0A]">
                Welcome to the Chapter
              </h2>
              <p className="text-base sm:text-lg text-[#555555] max-w-md mx-auto leading-relaxed">
                Your reservation ref is <strong className="font-mono text-[#0A0A0A]">{bookingRef}</strong>. Our trip captain will reach out via WhatsApp 7 days prior to coordinate arrival logistics.
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={onClose}
                className="px-10 py-4 bg-[#0A0A0A] text-white text-sm sm:text-base font-bold uppercase tracking-widest hover:bg-[#262626] transition-colors"
              >
                VIEW RESERVATION
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
