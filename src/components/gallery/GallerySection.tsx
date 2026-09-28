import React, { useState } from 'react';
import { Maximize2, Camera } from 'lucide-react';
import { GALLERY_DATA } from '../../data/travelData';
import { GalleryItem } from '../../types/travel';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface GallerySectionProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onOpenLightbox,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'All' | 'Vehicles' | 'Destinations' | 'Road Trips' | 'Family Travel' | 'Group Travel'
  >('All');

  const categories = ['All', 'Vehicles', 'Destinations', 'Road Trips', 'Family Travel', 'Group Travel'] as const;

  const filteredItems = GALLERY_DATA.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="gallery" className="w-full py-20 bg-slate-900/60 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Visual Journey
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Moments on the Road
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Glimpses of pristine vehicles, majestic hill climbs, sacred temple pilgrimages, and joyful family expeditions with Valli Tours and Travels.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer shadow-lg hover:border-slate-700 transition-all duration-300"
            >
              <ImageWithFallback
                src={item.imageUrl}
                alt={item.altText}
                aspectRatioClass="aspect-[4/3]"
              />

              {/* Hover Dark Overlay & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">
                  {item.caption}
                </p>

                <div className="pt-2 flex items-center justify-between text-[10px] text-amber-300 font-semibold">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    Enlarge Photo
                  </span>
                  <Maximize2 className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
