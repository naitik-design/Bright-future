import React, { useState } from 'react';

interface PremiumImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackImage?: string;
}

export function PremiumImage({ src, alt, className = '', fallbackImage, ...props }: PremiumImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  // High-quality cinematic fallback image in case of failure
  const defaultFallback = "/src/assets/images/premium_web_design_1783858409206.jpg";
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Premium Skeleton Loader */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-[#0D1117] z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      )}
      
      <img
        src={status === 'error' ? (fallbackImage || defaultFallback) : src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`${className} ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-700 ease-out z-10 relative w-full h-full object-cover`}
        {...props}
      />
      
      {/* Fallback styling for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
