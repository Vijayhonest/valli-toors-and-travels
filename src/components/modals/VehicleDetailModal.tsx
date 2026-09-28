import React from 'react';
import { X, Users, Briefcase, Fuel, Cog, ShieldCheck, CheckCircle2, Phone, CalendarCheck, MessageCircle } from 'lucide-react';
import { Vehicle } from '../../types/travel';
import { CONTACT_INFO } from '../../data/travelData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBookVehicle: (vehicleName: string) => void;
  onCall: () => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  onBookVehicle,
  onCall,
}) => {
  if (!vehicle) return null;

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Valli Tours & Travels, I would like to enquire about booking the ${vehicle.name} (${vehicle.seats} Seats, ${vehicle.category}).`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl my-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-100 ring-1 ring-blue-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
          aria-label="Close vehicle details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Vehicle Header & Image */}
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-slate-700/60 shadow-lg">
            <ImageWithFallback
              src={vehicle.imageUrl}
              fallbackSrc={vehicle.fallbackSvg}
              alt={vehicle.altText}
              aspectRatioClass="aspect-[16/9]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {vehicle.category} · {vehicle.segment}
                </span>
                <h2 className="text-2xl font-display font-bold text-white mt-0.5">
                  {vehicle.name}
                </h2>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-900/40 border border-blue-500/30 text-xs font-semibold text-blue-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Verified Fleet
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {vehicle.suitableFor}
            </p>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-slate-800">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-center">
              <Users className="w-5 h-5 mx-auto text-amber-400 mb-1" />
              <div className="text-[10px] text-slate-400">Capacity</div>
              <div className="text-xs font-bold text-white mt-0.5">{vehicle.seats} Passengers</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-center">
              <Briefcase className="w-5 h-5 mx-auto text-blue-400 mb-1" />
              <div className="text-[10px] text-slate-400">Luggage Space</div>
              <div className="text-xs font-bold text-white mt-0.5">{vehicle.luggage}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-center">
              <Fuel className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
              <div className="text-[10px] text-slate-400">Fuel Type</div>
              <div className="text-xs font-bold text-white mt-0.5">{vehicle.fuel}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-center">
              <Cog className="w-5 h-5 mx-auto text-purple-400 mb-1" />
              <div className="text-[10px] text-slate-400">Drive / Mode</div>
              <div className="text-xs font-bold text-white mt-0.5">{vehicle.transmission}</div>
            </div>
          </div>

          {/* Key Amenities */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2.5">Key Vehicle Amenities &amp; Standards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {vehicle.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sanitized Before Every Departure</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Uniformed Professional Chauffeur Available</span>
              </div>
            </div>
          </div>

          {/* Action CTAs: Booking CTA, Call CTA, WhatsApp CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                onClose();
                onBookVehicle(vehicle.name);
              }}
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book {vehicle.name}</span>
            </button>

            <button
              onClick={onCall}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs sm:text-sm transition-colors border border-slate-700 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-md shadow-emerald-950/40 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
