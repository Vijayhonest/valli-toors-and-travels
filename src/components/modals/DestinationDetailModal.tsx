import React from 'react';
import { X, MapPin, Calendar, Car, Sparkles, Phone, CalendarCheck, ShieldCheck, MessageCircle } from 'lucide-react';
import { Destination } from '../../types/travel';
import { CONTACT_INFO } from '../../data/travelData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanRoute: (destination: Destination) => void;
  onCall: () => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onPlanRoute,
  onCall,
}) => {
  if (!destination) return null;

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Valli Tours & Travels, I want to plan a trip to ${destination.name}, ${destination.state} (${destination.category}).`
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
          aria-label="Close destination details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-slate-700/60 shadow-lg">
            <ImageWithFallback
              src={destination.imageUrl}
              alt={destination.altText}
              aspectRatioClass="aspect-[16/9]"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span className="px-2.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
                {destination.category}
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                {destination.state}
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white mt-1">
              {destination.name}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {destination.popularFor}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 border-y border-slate-800 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="text-slate-400 flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Best Season</span>
              </div>
              <div className="font-bold text-white">{destination.bestTimeToVisit}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="text-slate-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Duration</span>
              </div>
              <div className="font-bold text-white">{destination.recommendedDuration}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="text-slate-400 flex items-center gap-1.5 mb-1">
                <Car className="w-3.5 h-3.5 text-emerald-400" />
                <span>Recommended Fleet</span>
              </div>
              <div className="font-bold text-white truncate">{destination.recommendedFleet}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Route Coordination by Valli Tours</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Our seasoned highway and hill-station certified chauffeurs will pick you up directly from your doorstep and handle interstate permits, tolls, and optimal scenic stopovers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                onClose();
                onPlanRoute(destination);
              }}
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Plan Journey</span>
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
