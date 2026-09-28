import React from 'react';
import { Flame, Users, Calendar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface PilgrimageSectionProps {
  onPlanPilgrimage: (type: string) => void;
}

export const PilgrimageSection: React.FC<PilgrimageSectionProps> = ({
  onPlanPilgrimage,
}) => {
  const pilgrimageTypes = [
    {
      title: 'Temple Trips',
      desc: 'Dedicated day trips to nearby sacred shrines with darshan timing coordination.',
      audience: 'Couples & Small Families',
      suitableFleet: 'Dzire / Swift',
    },
    {
      title: 'Family Pilgrimage',
      desc: 'Comfortable pace for grandparents and youngsters with regular food and refreshment stops.',
      audience: 'Extended Family (6-7 Guests)',
      suitableFleet: 'Ertiga / Innova Crysta',
    },
    {
      title: 'Group Pilgrimage',
      desc: 'Affordable, community sangham journeys to prominent national holy centers.',
      audience: 'Sangham Groups (12-45 Guests)',
      suitableFleet: 'Tempo Traveller / Coach Bus',
    },
    {
      title: 'Multi-Day Pilgrimage',
      desc: 'Comprehensive multi-temple circuits covering Jyotirlingas, Shakti Peethas, and Divya Desams.',
      audience: 'All Devotees',
      suitableFleet: 'Innova / Traveller / Bus',
    },
  ];

  return (
    <section id="pilgrimage" className="w-full py-20 bg-slate-900/60 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            Spiritual Devotion · Peaceful Journeys
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Pilgrimage &amp; Sacred Temple Yatras
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Travel with complete peace of mind. Our respectful chauffeurs understand fasting rituals, holy dip locations, pooja schedules, and provide elderly passengers with gentle care throughout the sacred path.
          </p>
        </div>

        {/* 4 Pilgrimage Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pilgrimageTypes.map((pilgrim, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center mb-3">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display font-bold text-white">
                  {pilgrim.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {pilgrim.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>👥 <strong>Audience:</strong> {pilgrim.audience}</div>
                <div>🚗 <strong>Fleet:</strong> {pilgrim.suitableFleet}</div>
              </div>

              <button
                onClick={() => onPlanPilgrimage(pilgrim.title)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Plan This Yatra</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Major Temple Shrines Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-slate-800 p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Popular Devotional Routes</span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Tirupati, Srisailam, Varanasi, Madurai, Vijayawada Kanaka Durga &amp; Shirdi
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complete support for token timings, special entry queue coordination, laddu prasadam collection, and senior citizen assistance.
            </p>
          </div>

          <button
            onClick={() => onPlanPilgrimage('Custom Sacred Yatra')}
            className="shrink-0 py-4 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Flame className="w-4 h-4" />
            <span>PLAN PILGRIMAGE</span>
          </button>
        </div>
      </div>
    </section>
  );
};
