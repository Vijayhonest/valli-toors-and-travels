import React, { useState } from 'react';
import { Compass, Calendar, Users, Car, CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import { FLEET_DATA, CONTACT_INFO } from '../../data/travelData';
import { TripType } from '../../types/travel';

interface TripPlannerSectionProps {
  onQuoteRequested: (summary: string) => void;
}

export const TripPlannerSection: React.FC<TripPlannerSectionProps> = ({
  onQuoteRequested,
}) => {
  const [destination, setDestination] = useState('Tirupati & Tirumala');
  const [travelDate, setTravelDate] = useState(new Date().toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState(4);
  const [tripType, setTripType] = useState<TripType>('Outstation');
  const [vehiclePref, setVehiclePref] = useState('Toyota Innova / Crysta');

  // Automatic smart vehicle recommendation based on passenger count
  const getRecommendedVehicle = (count: number) => {
    if (count <= 4) return 'Swift Dzire (Sedan)';
    if (count <= 7) return 'Toyota Innova / Ertiga (MUV)';
    if (count <= 17) return 'Force Tempo Traveller (Van)';
    return 'Luxury Tourist Coach (Bus)';
  };

  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = `${tripType} to ${destination} for ${passengers} Passengers on ${travelDate} with ${vehiclePref}`;
    onQuoteRequested(summary);
  };

  return (
    <section id="planner" className="w-full py-20 bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            Interactive Assistant
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Custom Trip &amp; Itinerary Planner
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Customize your passenger requirements and route preference. We instantly match the most fuel-efficient, spacious vehicle for your family or group.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl ring-1 ring-blue-500/20">
          <form onSubmit={handleRequestQuote} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destination *</label>
                <div className="relative">
                  <Compass className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tirupati, Araku, Ooty, Goa"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Travel Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Travel Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <select
                    value={passengers}
                    onChange={(e) => {
                      const count = Number(e.target.value);
                      setPassengers(count);
                      if (count > 7) setVehiclePref('Force Tempo Traveller');
                      else if (count > 4) setVehiclePref('Toyota Innova / Crysta');
                    }}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 12, 17, 25, 35, 45].map((n) => (
                      <option key={n} value={n}>{n} Guests</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Trip Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Trip Type</label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value as TripType)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Outstation">Outstation (Round Trip)</option>
                  <option value="One Way">One Way Drop</option>
                  <option value="Local">Local City Tour</option>
                  <option value="Airport Transfer">Airport Transfer</option>
                  <option value="Multi Day">Multi-Day Tour Package</option>
                </select>
              </div>

              {/* Vehicle Preference */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Vehicle Preference</label>
                <div className="relative">
                  <Car className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                  <select
                    value={vehiclePref}
                    onChange={(e) => setVehiclePref(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {FLEET_DATA.map((v) => (
                      <option key={v.id} value={v.name}>{v.name} ({v.seats} Seats · {v.category})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Live Journey Calculation Summary */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400">
                <span>Journey Estimation Overview</span>
                <span className="text-[11px] text-emerald-400 font-normal">Best Fit: {getRecommendedVehicle(passengers)}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400">Destination:</span> <strong className="text-white ml-1">{destination}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Departure:</span> <strong className="text-white ml-1">{travelDate}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Vehicle Selected:</span> <strong className="text-amber-400 ml-1">{vehiclePref}</strong>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Zero obligation inquiry · Direct response within 10 minutes</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>REQUEST INSTANT QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
