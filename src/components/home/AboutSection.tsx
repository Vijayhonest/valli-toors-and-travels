import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Phone, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../../data/travelData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface AboutSectionProps {
  onOpenPhoneSelector: () => void;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenPhoneSelector,
  onOpenBooking,
}) => {
  const pillars = [
    {
      title: 'Our Responsibility',
      desc: 'When you step into a Valli Tours vehicle, your safety, timetable, and comfort are our topmost priority from pickup to drop-off.',
      icon: ShieldCheck,
    },
    {
      title: 'Seasoned Chauffeurs',
      desc: 'All our drivers have rigorous highway and mountain ghat certifications, courteous manners, and extensive local route expertise.',
      icon: Award,
    },
    {
      title: 'Sanitized & Pristine Fleet',
      desc: 'Each vehicle undergoes vacuuming, surface sanitization, and tire/mechanical checks before embarking on any long journey.',
      icon: Sparkles,
    },
    {
      title: 'Transparent Pricing',
      desc: 'No hidden surge multipliers, no inflated night charges. Honest per-kilometer rates and clear toll/permit explanations.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="about" className="w-full py-20 bg-slate-900/40 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: About Imagery & Trust Marks */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <ImageWithFallback
                src="/assets/services/family-trips.jpg"
                alt="Happy passengers on road trip with Valli Tours and Travels"
                aspectRatioClass="aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Trust Badge Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-400">24/7 Service Across India</div>
                  <div className="text-sm font-extrabold text-white">Valli Tours and Travels</div>
                </div>
                <button
                  onClick={onOpenPhoneSelector}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Brand Story & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                About Valli Tours and Travels
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
                Your Journey... <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                  Our Responsibility...
                </span>
              </h2>
              <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                Founded with a commitment to redefining passenger transportation in South India and inter-state corridors, <strong className="text-white">VALLI TOURS AND TRAVELS</strong> has grown into a trusted travel partner for families, corporations, pilgrims, and explorers.
              </p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Whether you need a swift city cab, an executive sedan for airport transit, an Innova for a serene hill station climb, or a 45-seater luxury coach for a wedding celebration, our modern fleet and experienced drivers stand ready 24/7.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <Icon className="w-5 h-5 text-amber-400" />
                    <div className="text-sm font-bold text-white">{pillar.title}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-amber-400/20"
              >
                Book Your Ride Today
              </button>
              <a
                href="#services"
                className="text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors"
              >
                View All Travel Services →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
