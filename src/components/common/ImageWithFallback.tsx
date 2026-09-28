import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  loading?: 'lazy' | 'eager';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  aspectRatioClass = 'aspect-[16/10]',
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);
  const [fallbackHasError, setFallbackHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If initial load fails and fallback is provided, switch to fallback
  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden bg-slate-800 ${aspectRatioClass} ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
      )}

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : fallbackSrc && !fallbackHasError ? (
        <img
          src={fallbackSrc}
          alt={alt}
          loading="lazy"
          onError={() => setFallbackHasError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        /* Fallback decorative container complying with Zero-Broken-Image Policy */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4 text-center">
          <svg className="w-10 h-10 text-amber-400 mb-2 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
          <span className="text-xs font-semibold text-slate-300">{alt}</span>
          <span className="text-[10px] text-amber-400/80 mt-1">Valli Tours and Travels</span>
        </div>
      )}
    </div>
  );
};
