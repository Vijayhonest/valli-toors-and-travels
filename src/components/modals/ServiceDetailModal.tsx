import React from 'react';
import { X, CheckCircle2, Phone, CalendarCheck, ShieldCheck, MessageCircle } from 'lucide-react';
import { ServiceItem } from '../../types/travel';
import { CONTACT_INFO } from '../../data/travelData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (service: ServiceItem) => void;
  onCall: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
  onCall,
}) => {
  if (!service) return null;

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Valli Tours & Travels, I am enquiring about your ${service.title} service (${service.tagline}).`
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
          aria-label="Close service details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-slate-700/60 shadow-lg">
            <ImageWithFallback
              src={service.imageUrl}
              alt={service.altText}
              aspectRatioClass="aspect-[16/9]"
            />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Valli Tours &amp; Travels Service
            </span>
            <h2 className="text-2xl font-display font-bold text-white mt-0.5">
              {service.title}
            </h2>
            <div className="text-xs font-semibold text-blue-300 mt-1">
              {service.tagline}
            </div>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5">
              Service Highlights &amp; Standards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sanitized Air-Conditioned Interiors</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Transparent Per-KM &amp; Fixed Estimates</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
            <span>24/7 Dispatch Control &amp; Roadside Assistance Guarantee</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                onClose();
                onBookService(service);
              }}
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book {service.title}</span>
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
