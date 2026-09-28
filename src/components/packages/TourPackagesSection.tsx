import React from 'react';
import { Clock, MapPin, CheckCircle2, Car, Eye, CalendarCheck } from 'lucide-react';
import { TOUR_PACKAGES_DATA } from '../../data/travelData';
import { TourPackage } from '../../types/travel';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface TourPackagesSectionProps {
  onSelectPackageForQuote: (packageTitle: string) => void;
  onViewPackageDetails: (pkg: TourPackage) => void;
}

export const TourPackagesSection: React.FC<TourPackagesSectionProps> = ({
  onSelectPackageForQuote,
  onViewPackageDetails,
}) => {
  return (
    <section id="packages" className="w-full py-20 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Curated Tour Packages
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Handcrafted Travel Circuits
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              From the divine sacred seven hills of Tirupati to the misty valleys of Araku and Ooty. Transparent vehicle arrangements, verified drivers, and customized itineraries.
            </p>
          </div>

          <div className="text-xs text-amber-400 font-semibold bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl self-start md:self-auto">
            100% Customized Tour Durations Available
          </div>
        </div>

        {/* Marketplace Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOUR_PACKAGES_DATA.map((pkg) => (
            <div
              key={pkg.id}
              className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-950/30 transition-all flex flex-col overflow-hidden"
            >
              {/* Package Image */}
              <div className="relative overflow-hidden cursor-pointer" onClick={() => onViewPackageDetails(pkg)}>
                <ImageWithFallback
                  src={pkg.imageUrl}
                  alt={pkg.altText}
                  aspectRatioClass="aspect-[16/10]"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-950/85 text-blue-200 border border-blue-600/40 backdrop-blur-md">
                  {pkg.category}
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-950/85 text-amber-400 border border-slate-700/80 backdrop-blur-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{pkg.duration}</span>
                </div>
              </div>

              {/* Package Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="truncate">{pkg.destination}</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-400 transition-colors">
                    {pkg.title}
                  </h3>

                  {/* Highlights */}
                  <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                    {pkg.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fleet Options Strip */}
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">Fleet: {pkg.suitableVehicles.join(', ')}</span>
                </div>

                {/* Marketplace Action Bar */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onViewPackageDetails(pkg)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Itinerary</span>
                  </button>

                  <button
                    onClick={() => onSelectPackageForQuote(pkg.title)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>GET CUSTOM QUOTE</span>
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
