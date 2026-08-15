import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;
    const updateTrail = () => {
      setTrailPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25,
      }));
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision Core Dot (Inverted difference blending) */}
      <div
        className="pointer-events-none fixed z-50 rounded-full bg-white mix-blend-difference transition-opacity duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '5px',
          height: '5px',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Subtle Trailing Geometric Ring */}
      <div
        className="pointer-events-none fixed z-50 rounded-full border border-black/30 mix-blend-difference transition-transform duration-200 ease-out"
        style={{
          left: `${trailPos.x}px`,
          top: `${trailPos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.6 : 1})`,
          width: '28px',
          height: '28px',
        }}
      />
    </>
  );
};
