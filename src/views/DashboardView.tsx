import React from 'react';
import { Compass, Sparkles, Check, ArrowRight } from 'lucide-react';
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
    <div className="bg-white text-[#0A0A0A] pt-24 pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-[#666666] font-medium">
            MEMBER PORTAL
          </div>
          <h1 className="text-[clamp(40px,5.5vw,72px)] font-bold font-serif-editorial text-[#0A0A0A] tracking-tight leading-[1.06]">
            My Journeys & Pass
          </h1>
        </div>

        {/* Profile / Pass Header */}
        <div className="bg-[#F7F7F5] border border-[#E5E5E5] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center shadow-xs">
          <div className="md:col-span-8 space-y-5">
            <div className="flex items-center gap-6">
              <img
                src={userProfile ? userProfile.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover border border-[#CCCCCC]"
              />
              <div className="space-y-1">
                <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#0A0A0A]">
                  {userProfile ? userProfile.name : 'Explorer Guest'}
                </h2>
                <div className="text-sm sm:text-base text-[#555555] font-mono font-medium">
                  {userProfile ? userProfile.tribePersonality : 'The Stranger Society'}
                </div>
                <div className="text-xs sm:text-sm text-[#777777]">
                  {userProfile ? userProfile.city : 'India'} • {userProfile ? userProfile.instagramHandle : '@beyondstrangers.in'}
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#555555] italic font-light">
              "{userProfile ? userProfile.favoriteQuote : 'Arrive as strangers. Leave with stories.'}"
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col justify-center gap-4">
            {!userProfile ? (
              <button
                onClick={onOpenJoinModal}
                className="w-full py-4 px-6 bg-[#0A0A0A] text-white font-bold text-sm sm:text-base uppercase tracking-widest hover:bg-[#262626] transition-colors shadow-sm"
              >
                CREATE MEMBER PASS
              </button>
            ) : (
              <div className="p-6 bg-white border border-[#E5E5E5] text-center space-y-2 shadow-xs">
                <span className="text-xs text-[#666666] font-mono block uppercase font-medium">MEMBERSHIP PASS</span>
                <div className="font-bold text-sm sm:text-base tracking-wider text-[#0A0A0A]">ACTIVE VERIFIED STATUS</div>
              </div>
            )}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-10 pt-10 border-t border-[#E5E5E5]">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#0A0A0A]">
              My Reserved Journeys ({userBookings.length})
            </h2>

            <button
              onClick={() => setActiveTab('experiences')}
              className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#0A0A0A] hover:underline"
            >
              + Browse Experiences
            </button>
          </div>

          {userBookings.length === 0 ? (
            <div className="bg-[#F7F7F5] border border-[#E5E5E5] p-12 sm:p-16 text-center space-y-5 shadow-xs">
              <Compass className="w-12 h-12 text-[#888888] mx-auto" />
              <div className="text-2xl font-serif-editorial font-bold text-[#222222]">
                No Journeys Reserved Yet
              </div>
              <p className="text-base text-[#555555] max-w-md mx-auto leading-relaxed">
                Explore our upcoming small-group chapters in Munnar, Coorg, Meghalaya, or Goa.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('experiences')}
                  className="px-8 py-4 bg-[#0A0A0A] text-white text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-[#262626] transition-colors"
                >
                  View Upcoming Chapters
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {userBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white border border-[#E5E5E5] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8 shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-[#666666] uppercase tracking-wider font-medium">
                      REF: {booking.bookingReference} • STATUS: {booking.status}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#0A0A0A]">
                      {booking.tripTitle}
                    </h3>
                    <div className="text-sm sm:text-base text-[#555555] font-light">
                      {booking.contactName} • {booking.travelerCount} Person(s) • {booking.specialNotes || 'Twin Sharing'}
                    </div>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <span className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#0A0A0A] block">
                      ₹{booking.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-[#666666]">
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
