import React, { useEffect, useState, useRef } from 'react';

interface BotanicalLeavesProps {
  reducedMotion?: boolean;
  activeDestination?: string | null;
  activeTab?: string;
}

export const BotanicalLeaves: React.FC<BotanicalLeavesProps> = ({ 
  reducedMotion = false,
  activeDestination,
  activeTab = 'home'
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const velocityDecayRef = useRef<number | null>(null);

  // Mouse parallax
  useEffect(() => {
    if (reducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  // Scroll velocity physics engine
  useEffect(() => {
    if (reducedMotion) return;

    let targetVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = Math.max(currentTime - lastScrollTime.current, 12);
      const rawVelocity = (currentScrollY - lastScrollY.current) / timeDiff;

      targetVelocity = Math.min(Math.max(rawVelocity * 8, -20), 20);
      setScrollY(currentScrollY);
      setScrollVelocity(targetVelocity);

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;
    };

    const decayLoop = () => {
      setScrollVelocity(prev => {
        if (Math.abs(prev) < 0.04) return 0;
        return prev * 0.94; // friction
      });
      velocityDecayRef.current = requestAnimationFrame(decayLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    velocityDecayRef.current = requestAnimationFrame(decayLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (velocityDecayRef.current) cancelAnimationFrame(velocityDecayRef.current);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  // Gentle parallax calculations
  const heroLeafY = scrollY * 0.08 + mousePos.y * 0.15;
  const heroLeafRotate = scrollVelocity * 0.2 + mousePos.x * 0.1;

  const sideBranchY = -scrollY * 0.06 - mousePos.y * 0.1;
  const sideBranchRotate = -scrollVelocity * 0.15;

  const bottomLeafY = scrollY * 0.12 + mousePos.y * 0.2;
  const bottomLeafRotate = scrollVelocity * 0.25;

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none" 
      aria-hidden="true"
    >
      {/* 1. Subtle, Restrained Micro-Particle Atmosphere */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="nature-particles particle-layer-subtle" />
      </div>

      {/* 2. Top-Right Editorial Botanical Silhouette (Very subtle, dark charcoal silhouette) */}
      <div
        className="hidden md:block absolute -top-12 -right-8 w-72 lg:w-96 text-[#1A1A1A] opacity-[0.06] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.2}px, ${heroLeafY}px, 0) rotate(${12 + heroLeafRotate}deg)`,
          transformOrigin: 'top right'
        }}
      >
        <svg viewBox="0 0 200 400" fill="currentColor" className="w-full h-auto drop-shadow-sm">
          {/* Detailed Monstera / Palm Leaf Silhouette */}
          <path d="M100 10 C100 10 110 50 140 70 C160 85 180 110 170 140 C160 165 130 170 120 190 C110 210 150 240 140 280 C130 310 105 350 100 390 C95 350 70 310 60 280 C50 240 90 210 80 190 C70 170 40 165 30 140 C20 110 40 85 60 70 C90 50 100 10 100 10 Z" />
          <path d="M100 20 L100 380" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <path d="M100 90 Q130 80 155 95" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
          <path d="M100 140 Q60 135 45 150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
          <path d="M100 200 Q140 195 145 220" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
          <path d="M100 260 Q65 255 55 275" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* 3. Left-Edge Subtle Olive-Black Botanical Branch Silhouette (Middle viewport) */}
      <div
        className="hidden lg:block absolute top-[40%] -left-12 w-64 text-[#262C24] opacity-[0.05] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${-mousePos.x * 0.15}px, ${sideBranchY}px, 0) rotate(${-15 + sideBranchRotate}deg)`,
          transformOrigin: 'left center'
        }}
      >
        <svg viewBox="0 0 300 200" fill="currentColor" className="w-full h-auto">
          <path d="M10 100 Q120 90 280 80" stroke="currentColor" strokeWidth="3" fill="none" />
          <ellipse cx="70" cy="80" rx="25" ry="12" transform="rotate(-25 70 80)" />
          <ellipse cx="120" cy="115" rx="28" ry="14" transform="rotate(30 120 115)" />
          <ellipse cx="170" cy="70" rx="30" ry="13" transform="rotate(-20 170 70)" />
          <ellipse cx="220" cy="105" rx="26" ry="12" transform="rotate(25 220 105)" />
          <ellipse cx="270" cy="75" rx="22" ry="10" transform="rotate(-15 270 75)" />
        </svg>
      </div>

      {/* 4. Bottom-Right Elegant Botanical Leaf Silhouette (Revealed near footer/CTA) */}
      <div
        className="hidden md:block absolute bottom-6 right-6 w-56 text-[#141414] opacity-[0.06] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.1}px, ${bottomLeafY}px, 0) rotate(${8 + bottomLeafRotate}deg)`,
          transformOrigin: 'bottom right'
        }}
      >
        <svg viewBox="0 0 160 220" fill="currentColor" className="w-full h-auto">
          <path d="M80 10 C120 60 150 120 140 170 C130 200 95 215 80 220 C65 215 30 200 20 170 C10 120 40 60 80 10 Z" />
          <path d="M80 20 L80 215" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />
          <path d="M80 70 Q110 65 125 75" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
          <path d="M80 110 Q50 105 35 120" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
          <path d="M80 150 Q110 145 120 160" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
        </svg>
      </div>
    </div>
  );
};
