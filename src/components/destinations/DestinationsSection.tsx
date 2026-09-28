import React, { useState } from 'react';
import { MapPin, Calendar, Car, ArrowRight } from 'lucide-react';
import { DESTINATIONS_DATA } from '../../data/travelData';
import { Destination } from '../../types/travel';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface DestinationsSectionProps {
  onPlanTripToDestination: (destination: Destination) => void;
  onViewDestinationDetails?: (destination: Destination) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onPlanTripToDestination,
  onViewDestinationDetails,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'All' | 'Beach' | 'Hill Station' | 'Pilgrimage' | 'Nature' | 'Weekend' | 'City'
  >('All');

  const categories = ['All', 'Beach', 'Hill Station', 'Pilgrimage', 'Nature', 'Weekend', 'City'] as const;

  const filteredDestinations = DESTINATIONS_DATA.filter((dest) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Weekend') {
      return dest.recommendedDuration === '2 Days' || dest.category === 'City';
    }
    return dest.category === activeCategory;
  });

  return (
    <section id="destinations" className="w-full py-20 bg-slate-900/50 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Explore More with Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Popular Travel Destinations
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Browse top spots across coastal beaches, hill stations, wildlife sanctuaries, and sacred pilgrimage centers.
            </p>
          </div>

          {/* Category Tabs */}
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

        {/* Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/20 flex flex-col overflow-hidden"
            >
              <div 
                className="relative overflow-hidden aspect-[4/3] cursor-pointer"
                onClick={() => onViewDestinationDetails && onViewDestinationDetails(dest)}
              >
                <ImageWithFallback
                  src={dest.imageUrl}
                  alt={dest.altText}
                  aspectRatioClass="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-amber-300 border border-slate-700/60 backdrop-blur-md">
                  {dest.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[11px] font-semibold text-blue-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>{dest.state}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white leading-snug">
                    {dest.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {dest.popularFor}
                </p>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-amber-400" /> Best Season:</span>
                    <span className="text-slate-200">{dest.bestTimeToVisit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Car className="w-3 h-3 text-blue-400" /> Fleet:</span>
                    <span className="text-slate-200 truncate max-w-[120px]">{dest.recommendedFleet}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {onViewDestinationDetails && (
                    <button
                      type="button"
                      onClick={() => onViewDestinationDetails(dest)}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
                    >
                      Details
                    </button>
                  )}
                  <button
                    onClick={() => onPlanTripToDestination(dest)}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Plan Route</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
