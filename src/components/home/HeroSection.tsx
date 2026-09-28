import React from 'react';
import { Calendar, Car, Phone, MessageCircle, ChevronRight, ShieldCheck, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../../data/travelData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenPhoneSelector: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenPhoneSelector,
}) => {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    CONTACT_INFO.defaultWhatsAppMessage
  )}`;

  return (
    <section id="home" className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-8 pb-24 lg:pb-32">
      {/* Background Cinematic Visual with Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/assets/hero/hero-bg.jpg"
          alt="Cinematic open road journey at golden hour by Valli Tours and Travels"
          aspectRatioClass="h-full w-full"
          className="h-full w-full"
          loading="eager"
        />
        {/* Layered Cinematic Vignette & Ambient Radial Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Subtle Animated Route-Line Graphic in the background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -100 200 C 300 150, 600 450, 1100 300 C 1400 200, 1800 500, 2200 350"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="8 8"
          className="animate-pulse"
        />
        <path
          d="M -50 400 C 400 350, 800 600, 1300 450 C 1700 350, 2000 600, 2300 480"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Brand Title Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-extrabold tracking-wider uppercase text-amber-400 font-display">
                VALLI TOURS &amp; TRAVELS
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-[11px] font-medium text-slate-300">24/7 Verified Chauffeurs</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              Your Journey... <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Our Responsibility...
              </span>
            </h1>

            {/* Supporting Text matching prompt */}
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl text-balance">
              Comfortable journeys, reliable vehicles and travel solutions for every destination.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary CTA */}
              <button
                onClick={onOpenBooking}
                className="py-4 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm tracking-wide shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK YOUR JOURNEY</span>
              </button>

              {/* Secondary CTA */}
              <a
                href="#fleet"
                className="py-4 px-6 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm tracking-wide border border-slate-700/80 hover:border-amber-400/50 flex items-center justify-center gap-2 transition-all backdrop-blur-md hover:scale-[1.02]"
              >
                <Car className="w-4 h-4 text-amber-400" />
                <span>EXPLORE OUR FLEET</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              {/* CALL NOW */}
              <button
                onClick={onOpenPhoneSelector}
                className="py-4 px-5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-amber-400 hover:text-amber-300 font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all hover:border-amber-400/40"
              >
                <Phone className="w-4 h-4" />
                <span>CALL NOW</span>
              </button>

              {/* WHATSAPP */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WHATSAPP</span>
              </a>
            </div>

            {/* Helpline quick strip */}
            <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                Direct Helpline:
              </span>
              {CONTACT_INFO.phones.map((p) => (
                <a
                  key={p.number}
                  href={`tel:${p.number}`}
                  className="font-mono text-xs text-slate-300 hover:text-amber-400 transition-colors font-medium bg-slate-900/60 px-2.5 py-0.5 rounded border border-slate-800"
                >
                  {p.display}
                </a>
              ))}
            </div>
          </div>

          {/* Right Floating Travel Details Badges (Clean, balanced, non-crowded) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 items-end">
            
            {/* Badge 1: Verified Chauffeurs */}
            <div className="p-4 rounded-2xl bg-slate-900/85 border border-slate-700/80 backdrop-blur-md shadow-2xl max-w-xs transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Hill-Road &amp; Ghat Certified</div>
                  <div className="text-[11px] text-slate-400">Safe, courteous chauffeurs</div>
                </div>
              </div>
            </div>

            {/* Badge 2: Wide Fleet Variety */}
            <div className="p-4 rounded-2xl bg-slate-900/85 border border-slate-700/80 backdrop-blur-md shadow-2xl max-w-xs transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Cars, MUVs, Vans &amp; Luxury Bus</div>
                  <div className="text-[11px] text-slate-400">4 to 45 passenger seating</div>
                </div>
              </div>
            </div>

            {/* Badge 3: Destinations */}
            <div className="p-4 rounded-2xl bg-slate-900/85 border border-slate-700/80 backdrop-blur-md shadow-2xl max-w-xs transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">South India &amp; Inter-State</div>
                  <div className="text-[11px] text-slate-400">Doorstep pickup &amp; drops</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
