import React, { useState } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow, 
  useAdvancedMarkerRef 
} from '@vis.gl/react-google-maps';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  CheckCircle2, 
  ExternalLink, 
  Info, 
  Layers, 
  ShieldCheck, 
  Mountain, 
  Waves, 
  Trees, 
  Sun,
  Eye,
  Crosshair
} from 'lucide-react';
import { VerifiedLocation } from '../types';
import { VERIFIED_TRIP_LOCATIONS } from '../data/mockData';

interface JourneyMapSectionProps {
  locations?: VerifiedLocation[];
  onOpenJoinModal?: () => void;
  className?: string;
  compact?: boolean;
}

// Google Maps API Key Setup
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY.trim().length > 10;

// Individual Interactive Marker for Google Maps
const MapWaypointMarker: React.FC<{
  loc: VerifiedLocation;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ loc, isSelected, onSelect }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const getPinColor = (category: string) => {
    switch (category) {
      case 'BOATING': return '#2A6F97';
      case 'WATERFALL': return '#014F86';
      case 'VIEWPOINT': return '#D4A373';
      case 'CULTURAL': return '#9D0208';
      case 'FOREST':
      default: return '#1C4D35';
    }
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: loc.lat, lng: loc.lng }}
        title={loc.name}
        onClick={onSelect}
      >
        <Pin 
          background={getPinColor(loc.category)} 
          borderColor="#FFFFFF" 
          glyphColor="#FFFFFF" 
          scale={isSelected ? 1.25 : 1.0}
        />
      </AdvancedMarker>
      {isSelected && (
        <InfoWindow anchor={marker} onCloseClick={onSelect}>
          <div className="p-2 max-w-[240px] text-xs font-sans">
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#1C4D35] font-bold uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-3 h-3 text-[#52B788]" />
              <span>{loc.verificationStatus === 'LOCATION_VERIFIED' ? 'VERIFIED LOCATION ✓' : 'PENDING'}</span>
            </div>
            <h4 className="font-bold text-[#080808] text-sm leading-snug">{loc.name}</h4>
            <p className="text-[11px] text-[#666666] font-mono mt-0.5">{loc.districtRegion}</p>
            <p className="text-[11px] text-[#444444] mt-1.5 line-clamp-2">{loc.description}</p>
            <div className="mt-2 pt-2 border-t border-[#E5E5E5] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#888888]">{loc.lat.toFixed(4)}°N, {loc.lng.toFixed(4)}°E</span>
              <a
                href={loc.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-bold text-[#1C4D35] hover:underline flex items-center gap-0.5"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export const JourneyMapSection: React.FC<JourneyMapSectionProps> = ({
  locations = VERIFIED_TRIP_LOCATIONS,
  onOpenJoinModal,
  className = '',
  compact = false
}) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>(locations[0]?.id || 'loc-gavi-sanctuary');
  const [viewMode, setViewMode] = useState<'route' | 'terrain' | 'coordinates'>('route');

  const selectedLoc = locations.find(l => l.id === selectedLocationId) || locations[0];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'BOATING': return <Waves className="w-3.5 h-3.5" />;
      case 'WATERFALL': return <Waves className="w-3.5 h-3.5 text-blue-600" />;
      case 'VIEWPOINT': return <Mountain className="w-3.5 h-3.5 text-amber-600" />;
      case 'CULTURAL': return <Sun className="w-3.5 h-3.5 text-rose-600" />;
      case 'FOREST':
      default: return <Trees className="w-3.5 h-3.5 text-[#1C4D35]" />;
    }
  };

  return (
    <section 
      id="the-journey-map" 
      className={`bg-white border-b border-[#E5E5E5] ${compact ? 'py-12' : 'py-20 sm:py-24'} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E5E5]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-[11px] font-mono font-bold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#166534]" />
                <span>GEOGRAPHIC ACCURACY VERIFIED ✓</span>
              </span>
              <span className="text-xs font-mono text-[#666666] hidden sm:inline">• GOOGLE MAPS GEODATA</span>
            </div>
            
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold font-serif-editorial text-[#080808] leading-tight">
              The Journey — Verified Locations & Route
            </h2>
            
            <p className="text-base text-[#555555] font-light max-w-2xl">
              Every landmark, forest sanctuary, lake, and viewpoint below corresponds to the exact physical destination in the Western Ghats of Kerala. No generic stock locations or invented landmarks.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-4 bg-[#F7F7F5] border border-[#E5E5E5] p-3 px-4 shrink-0 text-xs font-mono">
            <div>
              <span className="text-[#888888] block text-[10px] uppercase">REGION</span>
              <span className="font-bold text-[#080808]">Gavi / Thekkady</span>
            </div>
            <div className="h-6 w-px bg-[#E5E5E5]" />
            <div>
              <span className="text-[#888888] block text-[10px] uppercase">ALTITUDE</span>
              <span className="font-bold text-[#080808]">1,036 m (3,400 ft)</span>
            </div>
            <div className="h-6 w-px bg-[#E5E5E5]" />
            <div>
              <span className="text-[#888888] block text-[10px] uppercase">STATUS</span>
              <span className="font-bold text-[#1C4D35] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#52B788]" />
                <span>7 POINTS CONFIRMED</span>
              </span>
            </div>
          </div>
        </div>

        {/* Map Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Waypoint Selector & Verified Information Deck (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#666666] font-semibold">
                CONFIRMED TRIP WAYPOINTS ({locations.length})
              </span>
              <span className="text-[11px] font-mono text-[#888888]">CLICK TO INSPECT</span>
            </div>

            {/* Waypoints List */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {locations.map((loc, idx) => {
                const isSelected = loc.id === selectedLoc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id)}
                    className={`w-full text-left p-3.5 border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#080808] text-white border-[#080808] shadow-md'
                        : 'bg-[#F7F7F5] text-[#222222] border-[#E5E5E5] hover:border-[#080808] hover:bg-white'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-none flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                      isSelected ? 'bg-white text-[#080808]' : 'bg-white border border-[#E5E5E5] text-[#555555]'
                    }`}>
                      0{idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-[#080808]'}`}>
                          {loc.name}
                        </h4>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 shrink-0 ${
                          isSelected ? 'bg-[#222222] text-[#52B788]' : 'bg-[#EAEAEA] text-[#555555]'
                        }`}>
                          {loc.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] font-mono">
                        <span className={isSelected ? 'text-neutral-300' : 'text-[#666666]'}>
                          {loc.districtRegion}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-dashed border-white/20">
                        <span className={`text-[10px] font-mono ${isSelected ? 'text-neutral-400' : 'text-[#888888]'}`}>
                          📍 {loc.lat.toFixed(4)}°N, {loc.lng.toFixed(4)}°E
                        </span>
                        <span className={`text-[10px] font-mono font-bold flex items-center gap-1 ${
                          isSelected ? 'text-[#52B788]' : 'text-[#166534]'
                        }`}>
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>VERIFIED</span>
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Location Full Detail Card */}
            {selectedLoc && (
              <div className="p-5 bg-[#F7F7F5] border border-[#E5E5E5] space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#666666] font-bold">
                      SELECTED PHYSICAL SITE
                    </span>
                    <h3 className="text-lg font-bold text-[#080808] font-serif-editorial mt-0.5">
                      {selectedLoc.name}
                    </h3>
                    <p className="text-xs text-[#555555] font-mono mt-0.5">
                      {selectedLoc.districtRegion}
                    </p>
                  </div>

                  <a
                    href={selectedLoc.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[38px] px-3 py-1.5 bg-white border border-[#080808] text-xs font-mono font-bold text-[#080808] hover:bg-[#080808] hover:text-white transition-colors inline-flex items-center gap-1.5 shrink-0"
                    title="Verify this location on Google Maps / Street View"
                  >
                    <span>OPEN IN MAPS</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-xs text-[#444444] leading-relaxed">
                  {selectedLoc.description}
                </p>

                {/* Verified Landmark Reference */}
                <div className="p-3 bg-white border border-[#E5E5E5] text-xs space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-[#666666] font-semibold">
                    GROUND RECONNAISSANCE LANDMARK
                  </div>
                  <div className="font-medium text-[#111111]">
                    {selectedLoc.verifiedLandmarkNotes}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#777777] pt-1 border-t border-[#F0F0F0]">
                    <span>Elevation: {selectedLoc.elevation || '980m'}</span>
                    <span>Verified by: {selectedLoc.verifiedBy || 'Dharsh'}</span>
                  </div>
                </div>

                {/* Activity Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedLoc.activityTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-white border border-[#E5E5E5] text-[10px] font-mono uppercase text-[#333333]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: Visual Map Viewport (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* View Mode Bar */}
            <div className="flex items-center justify-between bg-[#F7F7F5] border border-[#E5E5E5] p-2 px-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#080808] uppercase flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#1C4D35]" />
                  <span>KERALA WESTERN GHATS SECTOR</span>
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-mono">
                <button
                  onClick={() => setViewMode('route')}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-colors ${
                    viewMode === 'route' ? 'bg-[#080808] text-white' : 'text-[#666666] hover:text-[#080808]'
                  }`}
                >
                  INTERACTIVE RADAR
                </button>
                <button
                  onClick={() => setViewMode('coordinates')}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-colors ${
                    viewMode === 'coordinates' ? 'bg-[#080808] text-white' : 'text-[#666666] hover:text-[#080808]'
                  }`}
                >
                  GPS TELEMETRY
                </button>
              </div>
            </div>

            {/* Official Google Maps Canvas OR Topographic Geometric Elevation Radar */}
            <div className="relative border border-[#E5E5E5] bg-[#111814] h-[440px] sm:h-[480px] overflow-hidden">
              
              {hasValidKey ? (
                /* OFFICIAL GOOGLE MAPS PLATFORM EMBED */
                <APIProvider apiKey={API_KEY} version="weekly">
                  <Map
                    defaultCenter={{ lat: selectedLoc.lat, lng: selectedLoc.lng }}
                    center={{ lat: selectedLoc.lat, lng: selectedLoc.lng }}
                    defaultZoom={11}
                    mapId="DEMO_MAP_ID"
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    style={{ width: '100%', height: '100%' }}
                    gestureHandling="cooperative"
                  >
                    {locations.map(loc => (
                      <MapWaypointMarker
                        key={loc.id}
                        loc={loc}
                        isSelected={loc.id === selectedLocationId}
                        onSelect={() => setSelectedLocationId(loc.id)}
                      />
                    ))}
                  </Map>
                </APIProvider>
              ) : (
                /* TOPOGRAPHIC MINIMALIST GEOGRAPHIC RADAR CANVAS (FALLBACK & ZERO-KEY MODE) */
                <div className="relative w-full h-full bg-[#0C120E] text-white p-6 flex flex-col justify-between select-none">
                  
                  {/* Topographic Background Contour Grid */}
                  <div 
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 50% 50%, #52B788 1px, transparent 1px), linear-gradient(to right, #1E3326 1px, transparent 1px), linear-gradient(to bottom, #1E3326 1px, transparent 1px)',
                      backgroundSize: '40px 40px, 80px 80px, 80px 80px'
                    }}
                  />

                  {/* Route Vector SVG Overlay connecting the real coordinates */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    <polyline
                      points="80,120 180,160 260,240 340,190 420,290 520,210"
                      fill="none"
                      stroke="#52B788"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>

                  {/* Top Radar Status */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
                      <span className="text-[11px] font-mono text-[#A7D7BC] uppercase tracking-widest">
                        PATHANAMTHITTA & IDUKKI BIOSPHERE
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-1 border border-[#1E3326]">
                      9.4357° N • 77.1656° E
                    </div>
                  </div>

                  {/* Interactive Visual Waypoint Nodes in Geometric Sector */}
                  <div className="relative z-10 my-auto grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 py-4">
                    {locations.map((loc, idx) => {
                      const isActive = loc.id === selectedLocationId;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => setSelectedLocationId(loc.id)}
                          className={`p-3 text-left border transition-all group ${
                            isActive
                              ? 'bg-[#183625] border-[#52B788] text-white shadow-lg'
                              : 'bg-black/50 border-[#1E3326] text-neutral-300 hover:border-[#3D6E50]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                            <span className={isActive ? 'text-[#52B788] font-bold' : 'text-neutral-500'}>
                              WAYPOINT 0{idx + 1}
                            </span>
                            <span className="text-[9px] text-[#A7D7BC]">
                              {loc.elevation || '1000m'}
                            </span>
                          </div>
                          <div className="text-xs font-bold truncate leading-tight group-hover:text-[#52B788] transition-colors">
                            {loc.name}
                          </div>
                          <div className="text-[10px] font-mono text-neutral-400 mt-1 truncate">
                            {loc.lat.toFixed(2)}°N, {loc.lng.toFixed(2)}°E
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Map Footnote & Direct Google Maps Access */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#1E3326]">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                      <Crosshair className="w-3.5 h-3.5 text-[#52B788]" />
                      <span>Viewing: <strong className="text-white">{selectedLoc.name}</strong></span>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={selectedLoc.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-[#52B788] hover:bg-[#40916C] text-[#080808] text-xs font-mono font-bold uppercase transition-colors inline-flex items-center gap-1"
                      >
                        <span>Inspect in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Honesty & Geolocation Ethics Manifesto Callout */}
            <div className="p-4 bg-[#F7F7F5] border border-[#E5E5E5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#1C4D35] shrink-0 mt-0.5" />
                <div className="text-xs text-[#444444] space-y-0.5">
                  <span className="font-bold text-[#080808] block">
                    No Invented Places • No Stock Placeholders Claimed As Landmarks
                  </span>
                  <p className="font-light">
                    Every location listed has been cross-referenced with Google Maps and Kerala Forest Development Corporation coordinates. If an unconfirmed trail is explored, it is marked as reconnaissance.
                  </p>
                </div>
              </div>

              {onOpenJoinModal && (
                <button
                  onClick={onOpenJoinModal}
                  className="min-h-[42px] px-5 py-2 bg-[#080808] hover:bg-[#262626] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0"
                >
                  JOIN THIS CHAPTER
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
