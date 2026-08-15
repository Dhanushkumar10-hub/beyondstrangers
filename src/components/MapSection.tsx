import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Layers, 
  ArrowRight, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Loader2
} from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

// Dynamic lazy import of MapIframe to avoid shipping heavy iframe / map JS in the initial bundle
const MapIframe = lazy(() => import('./MapIframe'));

export interface WaypointItem {
  id: string;
  title: string;
  description: string;
  category?: string;
}

export interface MapSectionProps {
  title?: string;
  regionDescription?: string;
  waypoints?: WaypointItem[];
  posterWebP?: string;
  posterJpg?: string;
  posterAlt?: string;
  publicMapAllowed?: boolean;
  mapQuery?: string;
  onContactClick?: () => void;
  className?: string;
}

export const DEFAULT_JOURNEY_WAYPOINTS: WaypointItem[] = [
  {
    id: 'wp-1',
    title: 'Gavi Eco-Sanctuary & Rainforest',
    description: 'Forest trails, shola grasslands and scenic viewpoints.',
    category: 'FOREST'
  },
  {
    id: 'wp-2',
    title: 'Kochupampa Lake & Reservoir Boating',
    description: 'Calm boating on the reservoir and silent water routes.',
    category: 'BOATING'
  },
  {
    id: 'wp-3',
    title: 'Forest Streams & Natural Cascades',
    description: 'Small cascades and natural springs (details coming soon).',
    category: 'WATERFALL'
  },
  {
    id: 'wp-4',
    title: 'Thekkady & Periyar Tiger Reserve',
    description: 'Periyar region and surrounding forest areas.',
    category: 'WILDLIFE'
  },
  {
    id: 'wp-5',
    title: 'Ottakathalamedu Viewpoint',
    description: 'Panoramic viewpoints and misty roads.',
    category: 'VIEWPOINT'
  },
  {
    id: 'wp-6',
    title: 'Kumily — Spice & Culture',
    description: 'Local markets, spice heritage and cultural experiences.',
    category: 'CULTURE'
  },
  {
    id: 'wp-7',
    title: 'Chellarkovil Eco-Viewpoint & Cascades',
    description: 'Scenic outlooks and small cascades.',
    category: 'VIEWPOINT'
  }
];

export const MapSection: React.FC<MapSectionProps> = ({
  title = 'THE JOURNEY',
  regionDescription = 'Gavi / Thekkady region — forests, boating, waterfalls and viewpoints.',
  waypoints = DEFAULT_JOURNEY_WAYPOINTS,
  posterWebP = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  posterJpg = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  posterAlt = 'Regional topographical overview of Gavi and Thekkady, Western Ghats',
  publicMapAllowed = true,
  mapQuery = 'Gavi+Thekkady+Kerala',
  onContactClick,
  className = ''
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [expandedWaypoint, setExpandedWaypoint] = useState<string | null>(waypoints[0]?.id || null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size on client
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Desktop automatic load on viewport intersection (if public map is permitted)
  useEffect(() => {
    if (!publicMapAllowed || isMapLoaded || !isDesktop || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMapLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [publicMapAllowed, isMapLoaded, isDesktop]);

  const toggleWaypoint = (id: string) => {
    setExpandedWaypoint(prev => (prev === id ? null : id));
  };

  return (
    <section 
      ref={sectionRef}
      id="the-journey"
      aria-labelledby="journey-heading"
      className={`py-14 sm:py-20 bg-white border-b border-[#D5D1D7] ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold tracking-widest bg-[#D4CADF] text-[#080808] px-2.5 py-0.5 rounded uppercase">
              ROUTE & REGION
            </span>
          </div>
          <h2 
            id="journey-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#080808] tracking-tight"
          >
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#2B2B2B] mt-2 leading-relaxed font-sans">
            {regionDescription}
          </p>
        </div>

        {/* Two-Column Grid: Left Map Display, Right Waypoint Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive / Static Poster Map Display (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="relative w-full h-[360px] sm:h-[460px] rounded-3xl overflow-hidden border border-[#D5D1D7] bg-[#FAF9F6] shadow-sm">
              
              {/* If map is loaded and allowed, render lazily imported MapIframe */}
              {isMapLoaded && publicMapAllowed ? (
                <Suspense
                  fallback={
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF9F6] text-[#080808] p-6 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#080808]" />
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                        Loading Regional Map Embed...
                      </span>
                    </div>
                  }
                >
                  <MapIframe 
                    query={mapQuery}
                    title={`Regional map for ${title}`}
                    className="w-full h-full border-0"
                  />
                </Suspense>
              ) : (
                /* Static Responsive Poster Image with Picture / srcset */
                <div className="relative w-full h-full group">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${posterWebP} 1200w, ${posterWebP} 800w, ${posterWebP} 480w`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 700px"
                    />
                    <source
                      type="image/jpeg"
                      srcSet={`${posterJpg} 1200w, ${posterJpg} 800w, ${posterJpg} 480w`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 700px"
                    />
                    <img
                      src={posterJpg}
                      alt={posterAlt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter saturate-90 brightness-95"
                    />
                  </picture>

                  {/* Accessible Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-[#080808]/30 to-transparent pointer-events-none" />

                  {/* Poster Badge / Overlay Content */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div className="text-white">
                      <span className="text-[10px] font-mono font-bold tracking-widest bg-white/20 backdrop-blur-md px-2 py-0.5 rounded uppercase block w-fit mb-1.5 border border-white/20">
                        REGIONAL POSTER VIEW
                      </span>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight">
                        Western Ghats Highlands
                      </h3>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        Highland trails, misty valleys & serene reservoirs
                      </p>
                    </div>

                    {/* On-Demand Interactive Map Trigger Button */}
                    {publicMapAllowed && (
                      <button
                        type="button"
                        onClick={() => setIsMapLoaded(true)}
                        aria-label="Load interactive regional map"
                        className="
                          btn-primary
                          bg-[#080808] hover:bg-neutral-900 text-white 
                          text-xs font-semibold px-4 py-2.5 rounded-xl 
                          shadow-lg flex items-center gap-2 border border-white/20
                          focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
                          transition-transform active:scale-95
                        "
                      >
                        <Compass className="w-4 h-4 text-[#D4CADF]" />
                        <span>Load interactive map</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Performance & Privacy Notice Bar */}
            <div className="flex items-center justify-between text-xs text-neutral-500 px-2 font-sans">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Optimized on-demand map loading</span>
              </span>
              <span className="text-[11px] font-mono">
                {waypoints.length} WAYPOINTS HIGHLIGHTED
              </span>
            </div>
          </div>

          {/* Right Column: Waypoint Accordion (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#080808]">
                EXPEDITION WAYPOINTS ({waypoints.length})
              </h3>
              <span className="text-[11px] text-neutral-500 font-mono">Tap to expand</span>
            </div>

            {/* Accessible Waypoint Accordion List */}
            <div className="space-y-2">
              {waypoints.map((wp, index) => {
                const isExpanded = expandedWaypoint === wp.id;
                const panelId = `waypoint-panel-${wp.id}`;
                const buttonId = `waypoint-btn-${wp.id}`;

                return (
                  <div
                    key={wp.id}
                    className={`
                      rounded-2xl border transition-all duration-200 overflow-hidden
                      ${isExpanded 
                        ? 'bg-[#D4CADF]/25 border-[#080808] shadow-sm' 
                        : 'bg-white border-[#D6D1D7] hover:border-[#080808]/40 hover:bg-[#FAF9F6]'
                      }
                    `}
                  >
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => toggleWaypoint(wp.id)}
                      className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#080808] focus-visible:ring-offset-1 rounded-2xl"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Numerical Step Index */}
                        <div className={`
                          w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold shrink-0 transition-colors
                          ${isExpanded ? 'bg-[#080808] text-white' : 'bg-[#D5D1D7] text-[#080808]'}
                        `}>
                          {index + 1}
                        </div>
                        
                        <div className="truncate">
                          <h4 className="text-xs sm:text-sm font-bold text-[#080808] truncate">
                            {wp.title}
                          </h4>
                          {wp.category && (
                            <span className="text-[10px] font-mono text-neutral-500 uppercase">
                              {wp.category}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-[#080808] p-1 rounded-lg bg-white/60 border border-[#D6D1D7]">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {/* Accordion Panel Content (Strictly title + description; NO coords, NO verification claims) */}
                    {isExpanded && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="px-4 pb-4 pt-1 text-xs text-[#2B2B2B] leading-relaxed border-t border-[#D5D1D7]/60"
                      >
                        <p>{wp.description}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Secondary CTA Linking to Inquiries / Contact */}
            <div className="pt-4 border-t border-[#D5D1D7] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#2B2B2B]">
                <span className="font-semibold block text-[#080808]">Have questions about the trail?</span>
                <span className="text-neutral-500 text-[11px]">Connect with our expedition leaders</span>
              </div>

              <button
                type="button"
                onClick={onContactClick}
                aria-label="Contact expedition team regarding route details"
                className="
                  btn-secondary
                  w-full sm:w-auto text-xs font-semibold px-4 py-2.5 rounded-xl
                  flex items-center justify-center gap-2 border border-[#D6D1D7] hover:border-[#080808]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#080808]
                "
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#080808]" />
                <span>Inquire About Route</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default MapSection;
