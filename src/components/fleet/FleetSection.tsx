import React, { useState } from 'react';
import { Users, Briefcase, Eye, CalendarCheck, ShieldCheck } from 'lucide-react';
import { FLEET_DATA } from '../../data/travelData';
import { Vehicle } from '../../types/travel';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface FleetSectionProps {
  onSelectVehicleForBooking: (vehicleName: string) => void;
  onViewVehicleDetails: (vehicle: Vehicle) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  onSelectVehicleForBooking,
  onViewVehicleDetails,
}) => {
  const [filter, setFilter] = useState<'All' | 'Cars' | 'Vans' | 'Bus' | 'Family' | 'Group Travel'>('All');

  const filteredFleet = FLEET_DATA.filter((v) => {
    if (filter === 'All') return true;
    if (filter === 'Cars') return v.category === 'Cars';
    if (filter === 'Vans') return v.category === 'Vans';
    if (filter === 'Bus') return v.category === 'Bus';
    if (filter === 'Family') return v.segment === 'Family';
    if (filter === 'Group Travel') return v.segment === 'Group Travel';
    return true;
  });

  return (
    <section id="fleet" className="w-full py-20 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Our Well-Maintained Fleet
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Comfortable Travel for Every Group Size
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              From nimble hatchbacks to premium Innova Crystas and spacious 45-seater luxury coaches, every vehicle is deep-cleaned and chauffeur-verified before your trip.
            </p>
          </div>

          {/* Filter Bar (Segmented Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            {(['All', 'Cars', 'Vans', 'Bus', 'Family', 'Group Travel'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  filter === cat
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredFleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/40 flex flex-col overflow-hidden"
            >
              {/* Vehicle Image Container */}
              <div className="relative overflow-hidden cursor-pointer" onClick={() => onViewVehicleDetails(vehicle)}>
                <ImageWithFallback
                  src={vehicle.imageUrl}
                  fallbackSrc={vehicle.fallbackSvg}
                  alt={vehicle.altText}
                  aspectRatioClass="aspect-[16/10]"
                />
                
                {/* Visual Category overlay tag */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-amber-300 border border-slate-700/80 backdrop-blur-md">
                    {vehicle.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-blue-950/80 text-blue-200 border border-blue-700/50 backdrop-blur-md">
                    {vehicle.segment}
                  </span>
                </div>

                {/* Quick View overlay button */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 backdrop-blur-sm">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    View Details
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-400">{vehicle.brand}</span>
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      AC &amp; Sanitized
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">
                    {vehicle.name}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {vehicle.suitableFor}
                  </p>
                </div>

                {/* Capacity & Specs Strip (Clean unboxed metadata) */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{vehicle.seats} Seats</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    <span>{vehicle.luggage}</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{vehicle.fuel.split(' ')[0]}</span>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onViewVehicleDetails(vehicle)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-colors text-center"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onSelectVehicleForBooking(vehicle.name)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>BOOK NOW</span>
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
