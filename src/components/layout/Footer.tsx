import React from 'react';
import { Phone, MessageCircle, CalendarCheck, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { CONTACT_INFO } from '../../data/travelData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPhoneSelector: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenPhoneSelector,
}) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Taglines */}
          <div className="space-y-4">
            <BrandLogo size="lg" showTagline={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              “{CONTACT_INFO.tagline}”
            </p>
            <p className="text-amber-400/90 text-xs font-semibold">
              {CONTACT_INFO.secondaryTagline}
            </p>
            <div className="flex items-center gap-2 text-slate-300 text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Registered, Verified Chauffeurs &amp; Quality Assured Vehicles</span>
            </div>
          </div>

          {/* Col 2: Fleet Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Our Premium Fleet
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Maruti Suzuki Swift (Hatchback)</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Swift Dzire (Executive Sedan)</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Maruti Suzuki Ertiga (7-Seater MUV)</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Toyota Innova / Crysta (Luxury MPV)</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Force Tempo Traveller (12-17 Seater)</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Luxury Tourist Coach Bus (32-45 Seater)</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Tata Magic Passenger Van</a></li>
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Travel Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Family Vacation Trips</a></li>
              <li><a href="#packages" className="hover:text-amber-400 transition-colors">All-Inclusive Tour Packages</a></li>
              <li><a href="#airport-transfers" className="hover:text-amber-400 transition-colors">24/7 Airport Transfers</a></li>
              <li><a href="#corporate" className="hover:text-amber-400 transition-colors">Corporate Mobility &amp; Events</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Hill Station Ghat-Road Trips</a></li>
              <li><a href="#pilgrimage" className="hover:text-amber-400 transition-colors">Spiritual Pilgrimage Circuits</a></li>
              <li><a href="#self-drive" className="hover:text-amber-400 transition-colors">Self Drive Rental Cars</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Local Hourly &amp; Outstation Rides</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Phone numbers */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
              Official Helpline Numbers
            </h4>
            <div className="space-y-2">
              {CONTACT_INFO.phones.map((phone) => (
                <a
                  key={phone.number}
                  href={`tel:${phone.number}`}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-mono text-xs transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{phone.display}</span>
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-500/10"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>REQUEST A QUOTE</span>
              </button>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(CONTACT_INFO.defaultWhatsAppMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WHATSAPP US</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {CONTACT_INFO.brandName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Your Journey... Our Responsibility...</span>
            <span aria-hidden="true">·</span>
            <span>24/7 Travel Assistance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
