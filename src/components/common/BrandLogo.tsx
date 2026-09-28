import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Emblem Icon with Royal Blue, Deep Navy & Gold */}
      <div className={`relative ${iconSize} shrink-0 rounded-full bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 p-[2px] shadow-lg shadow-blue-950/50 ring-1 ring-amber-400/40 flex items-center justify-center`}>
        <div className="w-full h-full rounded-full bg-slate-950/90 flex items-center justify-center overflow-hidden relative">
          {/* Stylized road & golden sun graphic */}
          <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none">
            {/* Golden rising sun */}
            <circle cx="50" cy="38" r="14" fill="#F59E0B" />
            <path d="M 28 40 A 22 22 0 0 1 72 40" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
            {/* Winding road */}
            <path d="M 24 90 L 45 46 L 55 46 L 76 90 Z" fill="#334155" />
            <path d="M 49 46 L 51 46 L 52 90 L 48 90 Z" fill="#FBBF24" />
            {/* Destination Pin */}
            <path d="M 50 18 L 54 26 L 50 24 L 46 26 Z" fill="#FCD34D" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-display font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 ${titleSize}`}>
            VALLI
          </span>
          <span className={`font-bold tracking-widest text-slate-100 ${subSize} uppercase`}>
            TOURS &amp; TRAVELS
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] italic tracking-wide text-blue-300/90 font-medium">
            Your Journey... Our Responsibility...
          </span>
        )}
      </div>
    </div>
  );
};
