import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../../types/travel';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  onClose,
  onNext,
  onPrev,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/60"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next controls */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700/60"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700/60"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center">
        <img
          src={item.imageUrl}
          alt={item.altText}
          referrerPolicy="no-referrer"
          className="max-h-[70vh] w-auto object-contain rounded-xl border border-slate-800 shadow-2xl"
        />
        <div className="mt-4 text-center">
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">{item.category}</span>
          <h4 className="text-lg font-bold text-white mt-0.5">{item.title}</h4>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">{item.caption}</p>
        </div>
      </div>
    </div>
  );
};
