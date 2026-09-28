import React from 'react';
import { Phone, MessageCircle, X, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../../data/travelData';

interface PhoneSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneSelectorModal: React.FC<PhoneSelectorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-2xl border border-slate-800 ring-1 ring-blue-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-900/40 text-amber-400 border border-blue-500/30 mb-3">
            <Phone className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-xl font-display font-bold text-white">Call Valli Tours &amp; Travels</h3>
          <p className="text-xs text-slate-400 mt-1">24/7 Direct line support for instant bookings &amp; enquiries</p>
        </div>

        {/* Verified Phone Numbers */}
        <div className="space-y-3 mb-6">
          {CONTACT_INFO.phones.map((phone, idx) => (
            <a
              key={phone.number}
              href={`tel:${phone.number}`}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 hover:bg-blue-950/60 border border-slate-700/60 hover:border-amber-400/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white tracking-wide font-mono">
                    {phone.display}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {idx === 0 ? 'Primary Helpline (24/7)' : idx === 1 ? 'Dispatch & Booking Line' : 'Emergency & Fleet Support'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-amber-400 px-3 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                Call Now
              </span>
            </a>
          ))}
        </div>

        {/* WhatsApp Alternative */}
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(CONTACT_INFO.defaultWhatsAppMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-950/40"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          Chat on WhatsApp
        </a>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Official Verified Customer Contact of Valli Tours &amp; Travels</span>
        </div>
      </div>
    </div>
  );
};
