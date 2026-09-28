import React, { useState } from 'react';
import { PlaneTakeoff, Clock, MapPin, Users, Car, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { FLEET_DATA, CONTACT_INFO } from '../../data/travelData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface AirportTransfersSectionProps {
  onDirectBook: (details: {
    tripType: 'Airport Transfer';
    pickupLocation: string;
    dropLocation: string;
    travelDate: string;
    passengers: number;
    preferredVehicle: string;
    flightNumber?: string;
  }) => void;
}

export const AirportTransfersSection: React.FC<AirportTransfersSectionProps> = ({
  onDirectBook,
}) => {
  const [airport, setAirport] = useState('Visakhapatnam International (VTZ)');
  const [transferType, setTransferType] = useState<'Pickup' | 'Drop'>('Drop');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('06:00');
  const [passengers, setPassengers] = useState(3);
  const [vehicle, setVehicle] = useState('Swift Dzire');
  const [flightNumber, setFlightNumber] = useState('');

  const airports = [
    'Visakhapatnam International Airport (VTZ)',
    'Vijayawada International Airport (VGA)',
    'Rajiv Gandhi International Airport Hyderabad (HYD)',
    'Tirupati International Airport (TIR)',
    'Chennai International Airport (MAA)',
    'Bengaluru Kempegowda International (BLR)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      alert('Please enter your pickup or drop address.');
      return;
    }

    const pickupLocation = transferType === 'Pickup' ? airport : address;
    const dropLocation = transferType === 'Pickup' ? address : airport;

    onDirectBook({
      tripType: 'Airport Transfer',
      pickupLocation,
      dropLocation,
      travelDate: `${date} at ${time}`,
      passengers,
      preferredVehicle: vehicle,
      flightNumber: flightNumber.trim() || undefined,
    });
  };

  return (
    <section id="airport-transfers" className="w-full py-20 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Visual & Features */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                Punctual &amp; Stress-Free
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                24/7 Dedicated Airport Transfers
              </h2>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Catching an early 4 AM red-eye flight or landing after midnight? Valli Tours and Travels tracks your flight timing and guarantees your chauffeur is waiting curbside before you exit the terminal.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <ImageWithFallback
                src="/assets/services/airport-transfers.jpg"
                alt="Chauffeur waiting at airport terminal with luxury sedan"
                aspectRatioClass="aspect-[16/10]"
              />
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero waiting charges for genuine flight delays</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Complimentary luggage assistance to and from terminal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clean sedans and MUVs with massive trunk capacity</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 ring-1 ring-blue-500/20">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                    <PlaneTakeoff className="w-5 h-5 text-amber-400" />
                    Book Airport Transfer
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Fixed rates with transparent toll inclusion</p>
                </div>

                {/* Transfer Toggle */}
                <div className="flex p-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setTransferType('Drop')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      transferType === 'Drop' ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Airport Drop
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransferType('Pickup')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      transferType === 'Pickup' ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Airport Pickup
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Airport Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Airport *</label>
                  <select
                    value={airport}
                    onChange={(e) => setAirport(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {airports.map((ap) => (
                      <option key={ap} value={ap}>{ap}</option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {transferType === 'Drop' ? 'Pickup Address (Home / Hotel / Office) *' : 'Drop Address (Home / Hotel / Office) *'}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
                    <input
                      type="text"
                      required
                      placeholder="Enter full locality or landmark"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Date of Transfer *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Scheduled Pickup Time *</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Passengers, Vehicle & Flight No */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Passengers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 12, 17].map((num) => (
                          <option key={num} value={num}>{num} Passengers</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Vehicle</label>
                    <div className="relative">
                      <Car className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <select
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                      >
                        {FLEET_DATA.map((v) => (
                          <option key={v.id} value={v.name}>{v.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Flight No. (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 6E-243"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>BOOK AIRPORT TRANSFER</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  Flight Tracking Enabled
                </span>
                <span className="text-amber-400 font-mono">Helpline: {CONTACT_INFO.phones[0].display}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
