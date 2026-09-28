import React from 'react';
import { X, Clock, MapPin, CheckCircle2, Phone, CalendarCheck, Car, MessageCircle } from 'lucide-react';
import { TourPackage } from '../../types/travel';
import { CONTACT_INFO } from '../../data/travelData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface TourPackageModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onRequestQuote: (packageTitle: string) => void;
  onCall: () => void;
}

export const TourPackageModal: React.FC<TourPackageModalProps> = ({
  pkg,
  onClose,
  onRequestQuote,
  onCall,
}) => {
  if (!pkg) return null;

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Valli Tours & Travels, I am interested in the ${pkg.title} (${pkg.duration}, ${pkg.destination}) tour package.`
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
          aria-label="Close package details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-slate-700/60 shadow-lg">
            <ImageWithFallback
              src={pkg.imageUrl}
              alt={pkg.altText}
              aspectRatioClass="aspect-[16/9]"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">{pkg.category}</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {pkg.duration}
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white mt-1">
              {pkg.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{pkg.destination}</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Package Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {pkg.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day by Day Itinerary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Planned Itinerary</h3>
            <div className="space-y-3">
              {pkg.itinerary.map((dayItem, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 border border-blue-500/30">
                      {dayItem.day}
                    </span>
                    <span className="text-xs font-bold text-white">{dayItem.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-1">
                    {dayItem.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Fleet */}
          <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
            <Car className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Recommended Vehicles: <strong className="text-white">{pkg.suitableVehicles.join(', ')}</strong></span>
          </div>

          {/* Actions: Request Quote, Call, WhatsApp */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                onClose();
                onRequestQuote(pkg.title);
              }}
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Get Custom Quote</span>
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
