import React, { useState } from 'react';
import { Phone, MessageCircle, CalendarCheck, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../../data/travelData';

interface ContactSectionProps {
  onOpenBooking: () => void;
  onOpenPhoneSelector: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenBooking,
  onOpenPhoneSelector,
}) => {
  const [fastName, setFastName] = useState('');
  const [fastPhone, setFastPhone] = useState('');
  const [fastQuery, setFastQuery] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleFastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fastName || !fastPhone) {
      alert('Please enter your name and phone number.');
      return;
    }
    setIsSent(true);
  };

  const whatsappDirectUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    CONTACT_INFO.defaultWhatsAppMessage
  )}`;

  return (
    <section id="contact" className="w-full py-20 bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Contact Info & Verified Phone Numbers */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
                {CONTACT_INFO.brandName}
              </h2>
              <p className="text-sm text-slate-300 italic mt-2">
                “{CONTACT_INFO.tagline}”
              </p>
              <p className="text-xs text-amber-400 font-semibold mt-1">
                {CONTACT_INFO.secondaryTagline}
              </p>
            </div>

            {/* 3 Verified Phone Numbers Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official 24/7 Helpline Numbers
              </h3>

              {CONTACT_INFO.phones.map((p, idx) => (
                <div
                  key={p.number}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-amber-400 border border-blue-500/30 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <a
                        href={`tel:${p.number}`}
                        className="text-lg font-bold font-mono text-white hover:text-amber-400 transition-colors"
                      >
                        {p.display}
                      </a>
                      <div className="text-[11px] text-slate-400">
                        {idx === 0 ? 'Primary 24/7 Helpline' : idx === 1 ? 'Dispatch & Booking Support' : 'Fleet & Drivers Line'}
                      </div>
                    </div>
                  </div>

                  <a
                    href={`tel:${p.number}`}
                    className="py-1.5 px-3.5 rounded-lg bg-amber-400/10 hover:bg-amber-400 hover:text-slate-950 text-amber-400 text-xs font-bold border border-amber-400/30 transition-all"
                  >
                    CALL
                  </a>
                </div>
              ))}
            </div>

            {/* Primary Action Buttons Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <button
                onClick={onOpenPhoneSelector}
                className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 font-bold text-xs tracking-wide flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>CALL</span>
              </button>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WHATSAPP</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="py-3 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>REQUEST A QUOTE</span>
              </button>
            </div>
          </div>

          {/* Right: Quick Direct Callback Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl ring-1 ring-blue-500/20">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                <Clock className="w-4 h-4" />
                <span>Quick Response Guarantee</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Request an Immediate Callback
              </h3>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                Leave your details and our team will get back to you with transparent per-KM pricing.
              </p>

              {!isSent ? (
                <form onSubmit={handleFastSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suresh Varma"
                      value={fastName}
                      onChange={(e) => setFastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 7372993999"
                      value={fastPhone}
                      onChange={(e) => setFastPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Trip Details / Query (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Innova required for 3-day Araku trip with family next Friday..."
                      value={fastQuery}
                      onChange={(e) => setFastQuery(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>REQUEST A QUOTE</span>
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Callback Request Sent</h4>
                  <p className="text-xs text-slate-300">
                    Thank you, <span className="text-amber-400 font-semibold">{fastName}</span>. Our team will call you on <span className="font-mono text-white font-semibold">{fastPhone}</span> promptly!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSent(false);
                      setFastName('');
                      setFastPhone('');
                      setFastQuery('');
                    }}
                    className="text-xs text-slate-400 hover:text-white underline pt-2"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  Privacy Guaranteed · No Spam
                </span>
                <span>24/7 Operations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
