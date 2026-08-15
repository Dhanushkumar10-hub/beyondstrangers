import React from 'react';

export interface MapIframeProps {
  query?: string;
  height?: string | number;
  className?: string;
  title?: string;
}

export const MapIframe: React.FC<MapIframeProps> = ({
  query = 'Gavi+Thekkady+Kerala',
  height = '100%',
  className = 'w-full h-full min-h-[320px] rounded-2xl border-0',
  title = 'The Journey Map - Gavi / Thekkady Region'
}) => {
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div className="relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden bg-neutral-100 shadow-inner">
      <iframe
        title={title}
        src={embedUrl}
        width="100%"
        height={typeof height === 'number' ? `${height}px` : height}
        className={className}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen={false}
        aria-label={title}
      />
    </div>
  );
};

export default MapIframe;
