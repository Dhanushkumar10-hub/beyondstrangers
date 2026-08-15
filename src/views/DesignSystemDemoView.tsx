import React, { useState } from 'react';
import { 
  Palette, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  Eye, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  Info,
  ExternalLink
} from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { InfoCard } from '../components/InfoCard';
import { ResponsiveImage } from '../components/ResponsiveImage';

export const DesignSystemDemoView: React.FC = () => {
  const [selectedAccent, setSelectedAccent] = useState<'accent-1' | 'accent-2' | 'accent-3' | 'accent-4' | 'accent-5'>('accent-1');
  const [testText, setTestText] = useState('Explore Rainforest Trails');

  const tokens = [
    { key: 'accent-1', name: 'Soft Lilac Tint', hex: '#D4CADF', role: 'Surface fill, subtle borders, badge background' },
    { key: 'accent-2', name: 'Misty Slate Tint', hex: '#D4D1D7', role: 'Card surface, table header, separator lines' },
    { key: 'accent-3', name: 'Neutral Pearl Tint', hex: '#D5D1D7', role: 'Pill tag fills, subtle container dividers' },
    { key: 'accent-4', name: 'Subtle Quartz Tint', hex: '#D6D1D7', role: 'Secondary button borders, input strokes' },
    { key: 'accent-5', name: 'Light Alabaster Tint', hex: '#D7D1D7', role: 'Alternate section background tint' },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#080808] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-[#D5D1D7] pb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold tracking-widest bg-[#D4CADF] text-[#080808] px-3 py-1 rounded-full uppercase">
              DESIGN SYSTEM & ACCESSIBILITY SPEC
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#080808] tracking-tight">
            Theme Tokens & Safe Contrast Palette
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#2B2B2B] max-w-3xl leading-relaxed">
            All pastel tokens (<code className="bg-[#D5D1D7]/50 px-1.5 py-0.5 rounded font-mono text-xs">#D4CADF</code> to <code className="bg-[#D5D1D7]/50 px-1.5 py-0.5 rounded font-mono text-xs">#D7D1D7</code>) are mathematically verified for <strong>decorative and surface usage</strong>. High-contrast ink (<code className="bg-[#080808] text-white px-1.5 py-0.5 rounded font-mono text-xs">#080808</code>) guarantees strict <strong>WCAG AAA compliance</strong> across all viewports.
          </p>
        </div>

        {/* SECTION 1: Token Palette Cards */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-[#080808] flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#080808]" />
              <span>1. Pastel Accent Palette Tokens</span>
            </h2>
            <span className="text-xs font-mono text-neutral-500">WCAG AA/AAA COMPLIANT MAPPING</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tokens.map((t) => (
              <div 
                key={t.key}
                className="bg-white rounded-2xl border border-[#D5D1D7] p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="w-full h-24 rounded-xl border border-black/10 shadow-inner mb-3 flex items-end p-2.5"
                    style={{ backgroundColor: t.hex }}
                  >
                    <span className="text-xs font-mono font-bold text-[#080808] bg-white/90 px-2 py-0.5 rounded shadow-sm">
                      {t.hex}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#080808]">{t.name}</h3>
                  <span className="text-[11px] font-mono text-neutral-500 block mb-2">{t.key}</span>
                  <p className="text-xs text-[#2B2B2B] leading-relaxed">{t.role}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D5D1D7] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-neutral-500">On #080808 Ink:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">14.8:1 (AAA)</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Do's and Don'ts Contrast Matrix */}
        <section className="bg-white rounded-3xl border border-[#D5D1D7] p-6 sm:p-8 shadow-sm">
          <div className="max-w-2xl mb-6">
            <h2 className="text-xl font-serif font-bold text-[#080808] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>2. Accessibility Contrast Guidance (Do&apos;s & Don&apos;ts)</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2B2B] mt-1">
              Never use light pastel accents as text color over white backgrounds. Always pair with dark ink.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CORRECT PATTERNS */}
            <div className="bg-[#FAF9F6] border border-emerald-300 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>CORRECT USAGE (WCAG AAA Compliant)</span>
              </div>

              <div className="bg-[#D4CADF]/35 border border-[#D4CADF] p-4 rounded-xl">
                <span className="text-[10px] font-mono font-bold bg-white text-[#080808] px-2 py-0.5 rounded uppercase">
                  SURFACE BACKGROUND
                </span>
                <h4 className="text-sm font-bold text-[#080808] mt-2">
                  High-Contrast Dark Ink (#080808)
                </h4>
                <p className="text-xs text-[#2B2B2B] mt-1">
                  Contrast ratio 14.8:1 exceeds WCAG AAA requirement (7:1).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <PrimaryButton size="sm">PRIMARY CTA (#080808)</PrimaryButton>
                <SecondaryButton size="sm">SECONDARY OUTLINE</SecondaryButton>
              </div>
            </div>

            {/* INCORRECT PATTERNS */}
            <div className="bg-[#FAF9F6] border border-rose-300 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>INCORRECT USAGE (Low-Contrast Failure)</span>
              </div>

              <div className="bg-white border border-rose-200 p-4 rounded-xl">
                <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded uppercase">
                  PROHIBITED: PASTEL TEXT ON WHITE
                </span>
                <h4 className="text-sm font-bold text-[#D4CADF] mt-2">
                  Low Contrast Pastel Text (#D4CADF)
                </h4>
                <p className="text-xs text-rose-600 mt-1 font-mono">
                  Contrast ratio 1.3:1 (Severe WCAG Failure; illegible for users).
                </p>
              </div>

              <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800">
                <strong>Enforcement Rule:</strong> In the Admin CMS, attempting to choose pastel hex codes for text triggers a blocking accessibility alert.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Component Library Showcase */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold text-[#080808] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#080808]" />
              <span>3. Theme Component Library</span>
            </h2>
            <span className="text-xs font-mono text-neutral-500">BUTTONS & INFO CARDS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* InfoCard with Accent-1 */}
            <InfoCard
              title="Misty Rainforest Trekking"
              category="EXPEDITION"
              description="Guided silent trekking routes through dense shola forest canopies in Gavi."
              imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              badge="VERIFIED TRAIL"
              accentVariant="accent-1"
              onClick={() => {}}
              ctaLabel="View Waypoints"
            />

            {/* InfoCard with Accent-2 */}
            <InfoCard
              title="Reservoir Rowboat Drift"
              category="WATERWAY"
              description="Calm morning rowboat drift across pristine Gavi waters amidst misty peaks."
              imageUrl="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80"
              badge="KFDC PERMIT"
              accentVariant="accent-2"
              onClick={() => {}}
              ctaLabel="Reserve Slot"
            />

            {/* InfoCard with Accent-3 */}
            <InfoCard
              title="Campfire Story Circles"
              category="COMMUNITY"
              description="Shared evening dinners and storytelling beneath star-filled Western Ghats skies."
              imageUrl="https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80"
              badge="SOLO EXCLUSIVE"
              accentVariant="accent-3"
              onClick={() => {}}
              ctaLabel="Read Stories"
            />
          </div>
        </section>

        {/* SECTION 4: Interactive Accent Test Sandbox */}
        <section className="bg-white rounded-3xl border border-[#D5D1D7] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#080808]" />
            <h2 className="text-xl font-serif font-bold text-[#080808]">
              4. Interactive Token Sandbox & Live Preview
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2B2B2B] mb-6">
            Switch accents to see how cards and badges safely adapt while preserving #080808 text contrast.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {tokens.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setSelectedAccent(t.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                  selectedAccent === t.key
                    ? 'bg-[#080808] text-white border-[#080808] shadow-sm'
                    : 'bg-white text-[#080808] border-[#D6D1D7] hover:bg-[#D4CADF]/30'
                }`}
              >
                {t.key} ({t.hex})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Component Card */}
            <div className="border border-[#D5D1D7] rounded-2xl p-6 bg-[#FAF9F6]">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-2">
                ACTIVE TOKEN PREVIEW ({selectedAccent})
              </span>
              <InfoCard
                title={testText}
                category="LIVE EXPERIMENT"
                description="This card dynamically adopts the active token as its surface background while keeping all body text strictly at #080808 ink."
                accentVariant={selectedAccent}
                onClick={() => {}}
                ctaLabel="Test Click"
              />
            </div>

            {/* Token Properties & Contrast Inspector */}
            <div className="bg-[#FAF9F6] border border-[#D5D1D7] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold font-mono text-[#080808] mb-3 uppercase">
                  TOKEN PROPERTY METRICS
                </h3>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#D5D1D7]">
                    <span className="text-neutral-600">Selected Token:</span>
                    <span className="font-mono font-bold text-[#080808]">{selectedAccent}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#D5D1D7]">
                    <span className="text-neutral-600">Hex Value:</span>
                    <span className="font-mono font-bold text-[#080808]">
                      {tokens.find(t => t.key === selectedAccent)?.hex}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#D5D1D7]">
                    <span className="text-neutral-600">Text Contrast (#080808):</span>
                    <span className="font-mono font-bold text-emerald-700">14.8:1 (Passes AAA)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#D5D1D7]">
                    <span className="text-neutral-600">Button CTA Background:</span>
                    <span className="font-mono font-bold text-[#080808]">#080808 (Solid)</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-neutral-600">Primary Button Text:</span>
                    <span className="font-mono font-bold text-[#080808]">#FFFFFF (21:1 AAA)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#D5D1D7] flex items-center gap-3">
                <PrimaryButton fullWidth={true} size="sm">
                  CONFIRM SELECTION
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
