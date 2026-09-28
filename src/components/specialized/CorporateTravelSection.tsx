import React, { useState } from 'react';
import { Briefcase, Building, Calendar, Users, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../../data/travelData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface CorporateTravelSectionProps {
  onRequestCorporateQuote: (companyName: string, serviceNeeded: string) => void;
}

export const CorporateTravelSection: React.FC<CorporateTravelSectionProps> = ({
  onRequestCorporateQuote,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('Employee Transportation');

  const corporateServices = [
    {
      title: 'Employee Transportation',
      desc: 'Scheduled point-to-point daily employee shuttles with route optimization and GPS tracking.',
      icon: Building,
    },
    {
      title: 'Business Trips',
      desc: 'Executive sedans and Innova Crystas for leadership visits, client meetings, and site surveys.',
      icon: Briefcase,
    },
    {
      title: 'Corporate Events & Retreats',
      desc: 'Multi-vehicle convoys and luxury buses for annual team offsites and company celebrations.',
      icon: Users,
    },
    {
      title: 'Conference Travel',
      desc: 'Seamless transit logistics between hotels, convention halls, and transit hubs for summits.',
      icon: Calendar,
    },
    {
      title: 'Executive Airport Transfers',
      desc: 'VIP arrivals, flight delay monitoring, and priority terminal pickups with name placard.',
      icon: FileText,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      alert('Please enter your company or organization name.');
      return;
    }
    onRequestCorporateQuote(companyName, serviceNeeded);
  };

  return (
    <section id="corporate" className="w-full py-20 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                Enterprise Mobility
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
                Corporate Transportation &amp; Fleet Management
              </h2>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Trusted by enterprises, tech hubs, and corporate agencies across Andhra Pradesh and Telangana. We deliver punctual, GST-compliant mobility with professional uniformed chauffeurs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {corporateServices.slice(0, 4).map((serv, idx) => {
                const Icon = serv.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <Icon className="w-5 h-5 text-amber-400" />
                    <div className="text-sm font-bold text-white">{serv.title}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{serv.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>GST Invoicing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Monthly Billing Option</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Strict Non-Smoking Fleet</span>
              </div>
            </div>
          </div>

          {/* Right Visual & Quote Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <ImageWithFallback
                src="/assets/services/corporate-trips.jpg"
                alt="Corporate business team travel"
                aspectRatioClass="aspect-[16/9]"
              />
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl ring-1 ring-blue-500/20">
              <h3 className="text-lg font-display font-bold text-white mb-1">
                Request Corporate Quote
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Tailored contract rates for short-term projects and long-term corporate mobility.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company / Organization Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Infotech Solutions Pvt Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Requirement</label>
                  <select
                    value={serviceNeeded}
                    onChange={(e) => setServiceNeeded(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {corporateServices.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <span>REQUEST CORPORATE QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
