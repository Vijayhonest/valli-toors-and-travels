import React from 'react';
import { 
  ShieldCheck, 
  Car, 
  CalendarCheck, 
  MapPin, 
  Headphones, 
  Sparkles 
} from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Sparkles,
      title: 'Comfortable Travel',
      desc: 'Deep-cleaned, sanitized AC vehicles',
      accentColor: 'text-amber-400 group-hover:text-amber-300',
      bgColor: 'bg-amber-400/10 border-amber-400/20',
    },
    {
      icon: ShieldCheck,
      title: 'Reliable Service',
      desc: 'Punctual, certified chauffeurs',
      accentColor: 'text-blue-400 group-hover:text-blue-300',
      bgColor: 'bg-blue-400/10 border-blue-400/20',
    },
    {
      icon: Car,
      title: 'Multiple Vehicle Options',
      desc: 'Sedans, MUVs, Vans & Luxury Bus',
      accentColor: 'text-emerald-400 group-hover:text-emerald-300',
      bgColor: 'bg-emerald-400/10 border-emerald-400/20',
    },
    {
      icon: CalendarCheck,
      title: 'Easy Booking',
      desc: 'Instant WhatsApp & Phone quotes',
      accentColor: 'text-purple-400 group-hover:text-purple-300',
      bgColor: 'bg-purple-400/10 border-purple-400/20',
    },
    {
      icon: MapPin,
      title: 'Local & Outstation',
      desc: 'City rides, hill stations & inter-state',
      accentColor: 'text-rose-400 group-hover:text-rose-300',
      bgColor: 'bg-rose-400/10 border-rose-400/20',
    },
    {
      icon: Headphones,
      title: 'Travel Assistance',
      desc: '24/7 dedicated dispatch helpline',
      accentColor: 'text-cyan-400 group-hover:text-cyan-300',
      bgColor: 'bg-cyan-400/10 border-cyan-400/20',
    },
  ];

  return (
    <div className="w-full pt-10 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 6-Item Elegant Trust Strip Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-200 hover:-translate-y-0.5 shadow-lg flex flex-col items-center text-center space-y-2"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.bgColor} transition-transform group-hover:scale-105`}>
                <Icon className={`w-5 h-5 ${item.accentColor}`} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
