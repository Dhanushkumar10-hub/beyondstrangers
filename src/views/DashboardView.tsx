import React from 'react';
import { Compass, Sparkles, Check, ArrowRight, User } from 'lucide-react';
import { BookingDetails, TravelerProfile, ActiveTab } from '../types';

interface DashboardViewProps {
  userBookings: BookingDetails[];
  userProfile: TravelerProfile | null;
  onOpenJoinModal: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  userBookings, 
  userProfile, 
  onOpenJoinModal,
  setActiveTab
}) => {
  return (
    <div className="bg-[#0B0F17] text-[#F3F4F6] pt-24 pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF5A36] font-bold">
            MEMBER PORTAL
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#F3F4F6] tracking-tight">
            My Cohorts & Pass
          </h1>
        </div>

        {/* Profile / Pass Header */}
        <div className="bg-[#161F2E] border border-[#1E293B] rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={userProfile ? userProfile.avatar : 'assets/images/stories/sarah.jpg'}
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-[#1E293B]"
              />
              <div className="space-y-1">
                <h2 className="text-2xl font-bold font-serif text-[#F3F4F6]">
                  {userProfile ? userProfile.name : 'Solo Explorer'}
                </h2>
                <div className="text-xs text-[#FF5A36] font-mono font-bold">
                  {userProfile ? userProfile.tribePersonality : 'The Stranger Society Member'}
                </div>
                <div className="text-xs text-[#9CA3AF]">
                  {userProfile ? userProfile.city : 'Tamil Nadu'} • {userProfile ? userProfile.instagramHandle : '@beyondstrangers.in'}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9CA3AF] italic">
              "{userProfile ? userProfile.favoriteQuote : 'Arrive as strangers. Leave with stories.'}"
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col justify-center gap-3">
            {!userProfile ? (
              <button
                onClick={onOpenJoinModal}
                className="btn-primary text-xs py-3 px-5"
              >
                CREATE MEMBER PASS
              </button>
            ) : (
              <div className="p-4 bg-[#0B0F17] border border-[#10B981]/30 rounded-xl text-center space-y-1">
                <span className="text-[10px] text-[#10B981] font-mono block uppercase font-bold">MEMBERSHIP STATUS</span>
                <div className="font-bold text-xs text-[#F3F4F6]">ACTIVE COHORT PASS</div>
              </div>
            )}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6 pt-6 border-t border-[#1E293B]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#F3F4F6]">
              My Reserved Journeys ({userBookings.length})
            </h2>

            <button
              onClick={() => setActiveTab('experiences')}
              className="text-xs font-bold uppercase tracking-wider text-[#FF5A36] hover:underline"
            >
              + Browse Experiences
            </button>
          </div>

          {userBookings.length === 0 ? (
            <div className="bg-[#161F2E] border border-[#1E293B] rounded-2xl p-10 sm:p-14 text-center space-y-4">
              <Compass className="w-10 h-10 text-[#9CA3AF] mx-auto" />
              <div className="text-lg font-serif font-bold text-[#F3F4F6]">
                No Journeys Reserved Yet
              </div>
              <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto leading-relaxed">
                Explore our upcoming small-group chapters across Kodaikanal, Ooty, Valparai, and Kolli Hills.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('experiences')}
                  className="btn-primary text-xs py-2.5 px-6"
                >
                  View South India Trips
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {userBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-[#161F2E] border border-[#1E293B] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-[#FF5A36] uppercase tracking-wider font-bold">
                      REF: {booking.bookingReference} • STATUS: {booking.status}
                    </div>
                    <h3 className="text-lg font-bold font-serif text-[#F3F4F6]">
                      {booking.tripTitle}
                    </h3>
                    <div className="text-xs text-[#9CA3AF]">
                      {booking.contactName} • {booking.travelerCount} Person(s) • {booking.specialNotes || 'Twin Sharing'}
                    </div>
                  </div>

                  <div className="text-left sm:text-right space-y-0.5">
                    <span className="text-lg font-bold font-serif text-[#F3F4F6] block">
                      ₹{booking.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-mono text-[#9CA3AF]">
                      Date: {booking.bookingDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
