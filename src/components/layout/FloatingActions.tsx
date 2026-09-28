import React from 'react';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { CONTACT_INFO } from '../../data/travelData';

interface FloatingActionsProps {
  onOpenBooking: () => void;
  onOpenPhoneSelector: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenBooking,
  onOpenPhoneSelector,
}) => {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    CONTACT_INFO.defaultWhatsAppMessage
  )}`;

  return (
    <>
      {/* Floating WhatsApp Button for Desktop and Tablet (hidden on small mobile to avoid layout clutter) */}
      <aside aria-label="Quick contact" className="hidden sm:block fixed bottom-6 right-6 z-30">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all group ring-2 ring-emerald-300/40"
          aria-label="Enquire via WhatsApp"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageCircle className="w-5 h-5 fill-slate-950" />
          <span className="tracking-wide">Chat with Us</span>
        </a>
      </aside>

      {/* Mobile Bottom Navigation Bar (Active strictly on mobile screens, height < 60px ensuring <= 15% viewport height) */}
      <nav aria-label="Mobile quick actions" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2 shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          {/* CALL button */}
          <button
            onClick={onOpenPhoneSelector}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 border border-slate-800 active:bg-slate-800 text-amber-400 font-semibold text-[11px] transition-colors"
          >
            <Phone className="w-4 h-4 mb-0.5" />
            <span>CALL</span>
          </button>

          {/* WHATSAPP button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600/90 active:bg-emerald-500 text-white font-semibold text-[11px] transition-colors"
          >
            <MessageCircle className="w-4 h-4 mb-0.5 fill-current" />
            <span>WHATSAPP</span>
          </a>

          {/* BOOK NOW button */}
          <button
            onClick={onOpenBooking}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 active:from-amber-400 active:to-amber-500 text-slate-950 font-bold text-[11px] shadow-md shadow-amber-500/20 transition-all"
          >
            <CalendarCheck className="w-4 h-4 mb-0.5" />
            <span>BOOK NOW</span>
          </button>
        </div>
      </nav>
    </>
  );
};
