import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Play, 
  Pause, 
  ChevronRight, 
  Flame, 
  Waves, 
  Compass, 
  Trees, 
  CheckCircle2, 
  Users,
  Eye,
  ChevronDown,
  ChevronUp,
  Instagram,
  HelpCircle,
  Mail,
  ExternalLink,
  Sparkles,
  Heart,
  Send,
  Check
} from 'lucide-react';
import { 
  Trip, 
  ActiveTab, 
  MediaItem, 
  SiteSettings, 
  Destination,
  VerifiedLocation
} from '../types';
import { 
  DEMO_TRIPS, 
  DEMO_DESTINATIONS,
  VERIFIED_TRIP_LOCATIONS 
} from '../data/mockData';
import { Hero } from '../components/Hero';
import { QuickFacts } from '../components/QuickFacts';
import { MapSection } from '../components/MapSection';
import { TripStickyMobileCTA } from '../components/TripStickyMobileCTA';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectTrip: (trip: Trip) => void;
  onOpenJoinModal: () => void;
  trips?: Trip[];
  mediaLibrary?: MediaItem[];
  siteSettings?: SiteSettings;
  destinations?: Destination[];
  verifiedLocations?: VerifiedLocation[];
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  setActiveTab, 
  onSelectTrip, 
  onOpenJoinModal,
  trips = DEMO_TRIPS,
  mediaLibrary = [],
  siteSettings,
  destinations = DEMO_DESTINATIONS,
  verifiedLocations = VERIFIED_TRIP_LOCATIONS
}) => {
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [selectedVideoModal, setSelectedVideoModal] = useState<string | null>(null);

  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  // -------------------------------------------------------------
  // DYNAMIC FEATURED / MOST RECENT TRIP RESOLUTION
  // -------------------------------------------------------------
  const featuredTrip: Trip = 
    trips.find(t => t.id === siteSettings?.featuredTripId) ||
    trips.find(t => t.featured) ||
    trips.find(t => t.status === 'AVAILABLE' || t.status === 'FEW_SPOTS_LEFT') ||
    trips[0] ||
    DEMO_TRIPS[0];

  // Helper date formatter
  const formatDateDisplay = (startStr: string, endStr: string) => {
    try {
      const s = new Date(startStr);
      const e = new Date(endStr);
      const startDay = s.getDate();
      const endDay = e.getDate();
      const month = s.toLocaleString('default', { month: 'short' }).toUpperCase();
      const year = s.getFullYear();
      return `${startDay} — ${endDay} ${month} ${year}`;
    } catch {
      return `${startStr} — ${endStr}`;
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryContact.trim()) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryContact('');
      setInquiryMessage('');
      setInquirySubmitted(false);
    }, 4000);
  };

  const toggleHeroPlay = () => {
    if (!heroVideoRef.current) return;
    if (heroVideoPlaying) {
      heroVideoRef.current.pause();
      setHeroVideoPlaying(false);
    } else {
      heroVideoRef.current.play();
      setHeroVideoPlaying(true);
    }
  };

  // 6-7 Curated Real Experience Highlights for the active featured chapter
  const experienceHighlights = [
    {
      id: 'boating',
      title: 'Forest & Reservoir Boating',
      category: 'Water Experience',
      icon: <Waves className="w-4 h-4 text-[#1C4D35]" />,
      desc: 'Gliding across serene forest reservoir waters flanked by dense tropical evergreen slopes.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      location: 'Gavi Reservoir, Kerala'
    },
    {
      id: 'waterfalls',
      title: 'Private Mountain Falls',
      category: 'Natural Cascade',
      icon: <Trees className="w-4 h-4 text-[#1C4D35]" />,
      desc: 'Secluded freshwater streams and natural swimming pools away from commercial tourist crowds.',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      location: 'Western Ghats Waterfalls'
    },
    {
      id: 'rainforest',
      title: 'Tropical Forest Trekking',
      category: 'Nature & Trails',
      icon: <Compass className="w-4 h-4 text-[#1C4D35]" />,
      desc: 'Canopy walking routes through cardamom estates, shola forest patches, and elephant corridors.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      location: 'Gavi Reserve Forest'
    },
    {
      id: 'wildlife',
      title: 'Sanctuary Wildlife Spotting',
      category: 'Fauna Observation',
      icon: <Eye className="w-4 h-4 text-[#1C4D35]" />,
      desc: 'Spotting Malabar giant squirrels, Great Indian hornbills, sambar deer, and Nilgiri langurs.',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      location: 'Thekkady Sanctuary Corridor'
    },
    {
      id: 'misty-roads',
      title: 'Misty Ridge Mountain Drives',
      category: 'Scenic Journey',
      icon: <MapPin className="w-4 h-4 text-[#1C4D35]" />,
      desc: 'High-elevation curves where monsoon clouds roll over lush green tea slopes and valleys.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      location: 'Vandiperiyar Ridge Route'
    },
    {
      id: 'culture',
      title: 'Kerala Heritage & Local Flavors',
      category: 'Living Traditions',
      icon: <Sparkles className="w-4 h-4 text-[#1C4D35]" />,
      desc: 'Authentic Kerala plantation meals, spice garden tours, and traditional cultural arts.',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      location: 'Kumily Spice Enclave'
    },
    {
      id: 'campfire',
      title: 'Starlit Campfire & Unfiltered Talks',
      category: 'Night Circle',
      icon: <Flame className="w-4 h-4 text-[#1C4D35]" />,
      desc: 'Night circle under clear mountain skies sharing travel stories, music, and honest conversations.',
      image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      location: 'Forest Base Camp'
    }
  ];

  const homeFaqs = [
    {
      q: 'Who can join the trip? Is there an age restriction?',
      a: 'Anyone with an open mind and love for travel! There is strictly NO AGE RESTRICTION. Over 85% of travelers join solo. Whether you are taking a college break, working in the city, or just seeking nature, you are welcomed.'
    },
    {
      q: `What are the dates and duration of the ${featuredTrip.title} trip?`,
      a: `The journey runs for ${featuredTrip.durationNights} Nights / ${featuredTrip.durationDays} Days from ${formatDateDisplay(featuredTrip.startDate, featuredTrip.endDate)}.`
    },
    {
      q: `How much does it cost and what is included?`,
      a: `₹${featuredTrip.price.toLocaleString('en-IN')} per person all-inclusive. This includes curated accommodation, private forest & local transfers, forest permissions, guided boating, activities, and group hosting with zero hidden surcharges.`
    },
    {
      q: 'I am traveling alone. Will I feel awkward?',
      a: 'Not at all! 85%+ of our community joins completely solo. Within 2 hours of meeting the cohort at the start point, conversations flow naturally and strangers become close friends.'
    },
    {
      q: 'How do I contact Founder Dharsh or ask specific questions?',
      a: 'You can DM Founder Dharsh directly on Instagram at @dharsh_here__, email us, or submit a note through the contact desk right on this page.'
    },
    {
      q: 'How do I reserve a spot?',
      a: 'Click "Join This Journey", fill out your basic contact details, and our coordination desk will reach out via WhatsApp/Phone to verify your spot.'
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen">

      {/* ========================================================================= */}
      {/* SECTION 2: HERO SECTION (Mobile-First 55-70vh, Accessible, Clamp, Preloaded) */}
      {/* ========================================================================= */}
      <Hero
        media={{
          type: featuredTrip.videoUrl ? 'video' : 'image',
          urls: {
            poster: featuredTrip.heroImage,
            desktop: featuredTrip.videoUrl || featuredTrip.heroImage,
            mobile: featuredTrip.heroImage
          },
          alt: `${featuredTrip.title} - ${featuredTrip.destination}`
        }}
        trip={{
          title: featuredTrip.title,
          subtitle: featuredTrip.chapterTitle || 'THE STRANGER SOCIETY',
          destination: featuredTrip.destination,
          dates: formatDateDisplay(featuredTrip.startDate, featuredTrip.endDate),
          duration: `${featuredTrip.durationNights} NIGHTS / ${featuredTrip.durationDays} DAYS`,
          price: `₹${featuredTrip.price.toLocaleString('en-IN')}`,
          age: featuredTrip.ageRestriction || 'NO AGE RESTRICTION'
        }}
        onJoin={() => onSelectTrip(featuredTrip)}
        onExplore={() => {
          const el = document.getElementById('about-trip');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* ========================================================================= */}
      {/* SECTION 3: QUICK FACTS COMPACT OVERVIEW BAR                              */}
      {/* ========================================================================= */}
      <QuickFacts
        destination={featuredTrip.destination}
        dates={formatDateDisplay(featuredTrip.startDate, featuredTrip.endDate)}
        duration={`${featuredTrip.durationDays}D / ${featuredTrip.durationNights}N`}
        price={`₹${featuredTrip.price.toLocaleString('en-IN')}`}
        age={featuredTrip.ageRestriction || 'NO AGE RESTRICTION'}
        onViewDetails={() => onSelectTrip(featuredTrip)}
        onJoin={() => onSelectTrip(featuredTrip)}
      />

      {/* ========================================================================= */}
      {/* SECTION 4: WHAT THE TRIP IS ABOUT (EDITORIAL & PHILOSOPHY)                */}
      {/* ========================================================================= */}
      <section id="about-trip" className="py-16 md:py-20 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Narrative & Intent */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#1C4D35] uppercase">
                  THE JOURNEY PHILOSOPHY
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 leading-tight">
                  Travel that brings people together, not commercial tour bus itineraries.
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
                <p>
                  Beyond Strangers was founded around a simple, honest truth: the most meaningful travel memories are never about crowded tourist viewpoints or rigid schedules. They are about the people you share the journey with.
                </p>
                <p>
                  In our upcoming <strong className="text-neutral-900 font-semibold">{featuredTrip.title}</strong> chapter, we take an intimate cohort of solo explorers deep into the rainforests and waters of the Western Ghats. You drift across serene reservoir lakes, step into secluded waterfalls, walk misty plantation trails, and gather around a warm campfire under mountain stars.
                </p>
                <p>
                  Over 85% of our guests arrive alone. Within hours, you find yourself laughing over traditional Kerala meals, sharing unfiltered stories, and forming friendships that last long after the journey ends.
                </p>
              </div>

              {/* Founder Quote Card */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  alt="Founder Dharsh"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#1C4D35]"
                />
                <div>
                  <p className="text-xs italic text-neutral-700">
                    "We do not sell tour packages. We create a high-trust space where curious people connect with nature and each other."
                  </p>
                  <p className="text-xs font-semibold text-neutral-900 mt-1">
                    Dharsh <span className="text-neutral-500 font-normal">• Founder, Beyond Strangers</span>
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onSelectTrip(featuredTrip)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C4D35] hover:text-[#256647] group"
                >
                  <span>See complete itinerary & inclusions</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column: 2 Clean Editorial Trip Photographs */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md group">
                <img
                  src={featuredTrip.heroImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'}
                  alt={featuredTrip.title}
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-mono bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded uppercase">
                    REAL DESTINATION
                  </span>
                  <p className="text-white text-xs font-semibold mt-1">{featuredTrip.destination}</p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-md group">
                <img
                  src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80"
                  alt="Secluded Waterfalls"
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-mono bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded uppercase">
                    PRIVATE WATERFALLS
                  </span>
                  <p className="text-white text-xs font-semibold mt-1">Natural Cascades & Mountain Pools</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: EXPERIENCE HIGHLIGHTS (6-7 CORE AUTHENTIC EXPERIENCES)        */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white border-y border-neutral-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#1C4D35] uppercase">
                EXPERIENCE HIGHLIGHTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-1">
                What you will actually experience in {featuredTrip.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mt-3 md:mt-0">
              Curated experiences built around untouched nature, water activities, and deep conversations.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experienceHighlights.map((item) => (
              <div 
                key={item.id}
                className="bg-[#FAF9F6] rounded-2xl overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-all hover:shadow-md group flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono bg-white/90 backdrop-blur-md text-neutral-800 font-semibold px-2 py-0.5 rounded shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-3">
                    <span className="text-[10px] text-white/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded font-mono">
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      {item.icon}
                      <h3 className="text-base font-bold text-neutral-900 font-serif">{item.title}</h3>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onSelectTrip(featuredTrip)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C4D35] hover:bg-[#256647] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>View Full Day-by-Day Itinerary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: THE JOURNEY — REGIONAL ON-DEMAND MAP & WAYPOINTS               */}
      {/* ========================================================================= */}
      <MapSection 
        title="THE JOURNEY"
        regionDescription={`${featuredTrip.title} region — forests, boating, waterfalls and viewpoints.`}
        publicMapAllowed={true}
        onContactClick={() => {
          setActiveTab('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* ========================================================================= */}
      {/* SECTION 7: WHY BEYOND STRANGERS (4 CORE PILLARS)                          */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#1C4D35] uppercase">
              OUR PROMISE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-1">
              Why Travel With Beyond Strangers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Designed from the ground up for curious solo travelers seeking authentic companionship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#1C4D35] flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 font-serif mb-2">85%+ Solo Travelers</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Most people join completely on their own. You never have to wait for friends to match calendars or approve plans.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] font-mono text-[#1C4D35] font-semibold">
                NO AWKWARD SILENCES
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#1C4D35] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 font-serif mb-2">Intimate Cohorts</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  We cap groups strictly at 12–16 people. No 50-person tour buses or megaphone guides. You truly get to know everyone.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] font-mono text-[#1C4D35] font-semibold">
                MAX 12–16 PEOPLE
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#1C4D35] flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 font-serif mb-2">Transparent Pricing</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Fixed ₹{featuredTrip.price.toLocaleString('en-IN')} all-inclusive. Stays, local forest transport, permits, boating, and hosting are covered.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] font-mono text-[#1C4D35] font-semibold">
                ZERO HIDDEN CHARGES
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#1C4D35] flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 font-serif mb-2">Founder-Led Hosting</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Founder Dharsh hosts and coordinates the trip directly, ensuring a safe, respectful, and inclusive atmosphere for everyone.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] font-mono text-[#1C4D35] font-semibold">
                COMMUNITY FIRST
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: THE STRANGER SOCIETY (COMMUNITY ADMISSION)                     */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-[#0F1812] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#74C69D] uppercase">
                THE STRANGER SOCIETY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                A curated community of curious explorers, creators, and professionals.
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                We believe who you travel with defines where you go. Our community includes software developers, architects, doctors, photographers, writers, designers, and students from across India.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-neutral-200 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#74C69D]" />
                  <span>High-Trust & Respectful Environment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#74C69D]" />
                  <span>Solo Female Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#74C69D]" />
                  <span>No Age Restrictions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#74C69D]" />
                  <span>Lifelong Alumni Network</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenJoinModal}
                  className="px-6 py-3 bg-[#74C69D] hover:bg-[#86D4AC] text-[#0A170F] rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-colors"
                >
                  Apply to Join The Society
                </button>
                <button
                  onClick={() => setActiveTab('society')}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-medium transition-colors"
                >
                  Read Member Stories
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#14231A] p-6 rounded-2xl border border-[#203D2B]">
              <h3 className="text-base font-bold text-white font-serif mb-3">Community Principles</h3>
              <ul className="space-y-3 text-xs text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#74C69D] font-bold font-mono">01.</span>
                  <span><strong>Arrive with Openness:</strong> Leave preconceived notions and city stress at the airport or meeting point.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#74C69D] font-bold font-mono">02.</span>
                  <span><strong>Respect the Wilderness:</strong> Zero plastic waste in sanctuaries, strict leave-no-trace outdoor ethics.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#74C69D] font-bold font-mono">03.</span>
                  <span><strong>Embrace Real Conversations:</strong> Listen deeply, celebrate each other’s life journeys around the fire.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: OTHER CHAPTERS & DESTINATIONS                                  */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#FAF9F6] border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#1C4D35] uppercase">
                EXPLORE ALL JOURNEYS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-1">
                Other Upcoming & Past Chapters
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('experiences')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1C4D35] hover:underline mt-3 sm:mt-0"
            >
              <span>View All Experiences ({trips.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.filter(t => t.id !== featuredTrip.id).slice(0, 3).map((trip) => (
              <div
                key={trip.id}
                onClick={() => onSelectTrip(trip)}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-neutral-100">
                    <img
                      src={trip.heroImage}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded uppercase">
                        {trip.chapterTitle}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-mono bg-[#1C4D35] text-white px-2 py-0.5 rounded font-bold">
                        ₹{trip.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-neutral-900 font-serif">{trip.title}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">{trip.destination}</p>
                    <p className="text-xs text-neutral-600 mt-2 line-clamp-2">{trip.overview}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs border-t border-neutral-100">
                  <span className="text-neutral-500 font-mono">
                    {trip.durationDays}D / {trip.durationNights}N
                  </span>
                  <span className="text-[#1C4D35] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: FREQUENTLY ASKED QUESTIONS (FAQ)                              */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#1C4D35] uppercase">
              CLEAR & HONEST ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Everything you need to know before stepping onto the trail with us.
            </p>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-200 overflow-hidden bg-[#FAF9F6] transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-neutral-900 text-sm sm:text-base hover:bg-neutral-100/60 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#1C4D35] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200/60 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11: FOUNDER CONTACT & INQUIRY DESK                                */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#FAF9F6] border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Contact Info & Instagram DM */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#1C4D35] uppercase">
                  DIRECT COORDINATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-1">
                  Have a question? Reach out anytime.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                  We are always happy to chat about trail difficulty, packing lists, flight options, or single occupancy details.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://instagram.com/dharsh_here__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-[#1C4D35] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block uppercase">INSTAGRAM DIRECT DM</span>
                    <span className="text-sm font-bold text-neutral-900 group-hover:text-[#1C4D35] transition-colors">
                      @dharsh_here__
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#1C4D35] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block uppercase">COMMUNITY INBOX</span>
                    <span className="text-sm font-semibold text-neutral-900">
                      {siteSettings?.contactEmail || 'beyondstrangers.in@gmail.com'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Clean Inquiry Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-900 font-serif mb-1">
                Ask a Question or Request Itinerary PDF
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                Our coordination desk responds directly within a few hours.
              </p>

              {inquirySubmitted ? (
                <div className="p-6 bg-[#E8F5EE] rounded-xl border border-[#B7E4C7] text-center space-y-2 animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-[#1C4D35] mx-auto" />
                  <h4 className="text-sm font-bold text-[#1C4D35]">Message Received!</h4>
                  <p className="text-xs text-neutral-700">
                    Founder Dharsh and our team will get in touch with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#1C4D35]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">WhatsApp / Phone or Email</label>
                      <input
                        type="text"
                        required
                        placeholder="+91 98765 43210"
                        value={inquiryContact}
                        onChange={(e) => setInquiryContact(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#1C4D35]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Question or Note</label>
                    <textarea
                      rows={3}
                      placeholder="Ask anything about the dates, meeting point, pickup from airport, or travel with us..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl p-3.5 text-xs text-neutral-900 focus:outline-none focus:border-[#1C4D35]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#1C4D35] hover:bg-[#256647] text-white rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry to Dharsh</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12: FINAL CALL TO ACTION CARD                                     */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#1C4D35] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#A7F3D0] uppercase">
            YOUR NEXT CHAPTER AWAITS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Step onto the trail in {featuredTrip.title}.
          </h2>
          <p className="text-sm sm:text-base text-neutral-200 max-w-xl mx-auto font-sans leading-relaxed">
            {formatDateDisplay(featuredTrip.startDate, featuredTrip.endDate)} • {featuredTrip.durationNights} Nights / {featuredTrip.durationDays} Days • ₹{featuredTrip.price.toLocaleString('en-IN')} All-Inclusive.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onSelectTrip(featuredTrip)}
              className="px-8 py-4 bg-white hover:bg-neutral-100 text-[#1C4D35] rounded-xl text-sm font-bold tracking-wide transition-all shadow-xl"
            >
              JOIN THIS JOURNEY
            </button>
            <button
              onClick={onOpenJoinModal}
              className="px-6 py-4 bg-[#256647] hover:bg-[#2D7A55] text-white rounded-xl text-sm font-semibold tracking-wide transition-colors border border-white/20"
            >
              Apply to The Stranger Society
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Booking Action Bar */}
      <TripStickyMobileCTA
        tripTitle={featuredTrip.title}
        price={`₹${featuredTrip.price.toLocaleString('en-IN')}`}
        onJoin={() => onSelectTrip(featuredTrip)}
      />

    </div>
  );
};
