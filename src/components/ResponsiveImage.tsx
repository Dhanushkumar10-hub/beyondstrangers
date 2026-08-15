import React, { useState, useEffect, useRef } from 'react';

export interface ResponsiveImageProps {
  src: string;
  mobileSrc?: string;
  webpSrc?: string;
  avifSrc?: string;
  alt: string;
  sizes?: string;
  className?: string;
  isLcp?: boolean;
  aspectRatio?: string;
  width?: number;
  height?: number;
}

/**
 * Helper to build responsive srcset parameters for CDN providers (Cloudinary, Unsplash, Imgix)
 */
export function generateCdnSrcSet(baseUrl: string, widths: number[] = [480, 768, 1024, 1600]): string {
  if (!baseUrl) return '';
  return widths.map(w => `${baseUrl} ${w}w`).join(', ');
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  mobileSrc,
  webpSrc,
  avifSrc,
  alt,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className = 'w-full h-full object-cover',
  isLcp = false,
  aspectRatio,
  width,
  height
}) => {
  const [isIntersected, setIsIntersected] = useState(isLcp);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isLcp) return;

    if (typeof IntersectionObserver !== 'undefined' && imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsIntersected(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px' }
      );
      observer.observe(imgRef.current);
      return () => observer.disconnect();
    } else {
      setIsIntersected(true);
    }
  }, [isLcp]);

  // If LCP, inject link rel="preload" into document head
  useEffect(() => {
    if (isLcp && src) {
      const preloadId = `preload-${src.slice(-16).replace(/[^a-zA-Z0-9]/g, '')}`;
      if (!document.getElementById(preloadId)) {
        const link = document.createElement('link');
        link.id = preloadId;
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
    }
  }, [isLcp, src]);

  const desktopSrcSet = generateCdnSrcSet(src);
  const mobileSrcSet = mobileSrc ? generateCdnSrcSet(mobileSrc, [360, 480, 640]) : undefined;

  return (
    <picture style={aspectRatio ? { aspectRatio } : undefined} className="block w-full h-full">
      {/* AVIF Next-gen format */}
      {avifSrc && isIntersected && (
        <source srcSet={generateCdnSrcSet(avifSrc)} type="image/avif" sizes={sizes} />
      )}

      {/* WebP format */}
      {webpSrc && isIntersected && (
        <source srcSet={generateCdnSrcSet(webpSrc)} type="image/webp" sizes={sizes} />
      )}

      {/* Mobile-specific viewports */}
      {mobileSrcSet && isIntersected && (
        <source media="(max-width: 640px)" srcSet={mobileSrcSet} sizes="100vw" />
      )}

      {/* Default source */}
      {desktopSrcSet && isIntersected && (
        <source srcSet={desktopSrcSet} sizes={sizes} />
      )}

      <img
        ref={imgRef}
        src={isIntersected ? src : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU1ZTUiLz48L3N2Zz4='}
        alt={alt}
        loading={isLcp ? 'eager' : 'lazy'}
        fetchPriority={isLcp ? 'high' : 'auto'}
        decoding="async"
        width={width}
        height={height}
        className={className}
      />
    </picture>
  );
};
