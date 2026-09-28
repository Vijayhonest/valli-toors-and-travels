import React, { useState } from 'react';
import { Key, Users, Cog, Fuel, Calendar, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { FLEET_DATA } from '../../data/travelData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface SelfDriveSectionProps {
  onRequestSelfDrive: (vehicleName: string, duration: string) => void;
}

export const SelfDriveSection: React.FC<SelfDriveSectionProps> = ({
  onRequestSelfDrive,
}) => {
  const selfDriveFleet = FLEET_DATA.filter((v) => v.availableForSelfDrive);
  const [selectedVehicle, setSelectedVehicle] = useState(selfDriveFleet[0]?.name || 'Maruti Suzuki Swift');
  const [duration, setDuration] = useState('24 Hours (1 Day)');

  const durations = [
    '12 Hours (Half Day)',
    '24 Hours (1 Day)',
    '48 Hours (2 Days)',
    '3-5 Days (Weekend Getaway)',
    '7+ Days (Weekly Rental)',
  ];

  const currentVehicleObj = selfDriveFleet.find((v) => v.name === selectedVehicle) || selfDriveFleet[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestSelfDrive(selectedVehicle, duration);
  };

  return (
    <section id="self-drive" className="w-full py-20 bg-slate-900/60 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            Your Privacy · Your Pace
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Self Drive Car Rentals
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Take the steering wheel into your own hands. Clean, mechanically inspected, and sanitized self-drive hatchbacks, sedans, and MUVs for your private holidays and road trips.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Vehicle Selector Cards */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Available Self-Drive Vehicles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {selfDriveFleet.map((v) => {
                const isSelected = selectedVehicle === v.name;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v.name)}
                    className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-950/70 border-amber-400 ring-2 ring-amber-400/40 shadow-xl'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="rounded-lg overflow-hidden mb-3 aspect-[16/10]">
                      <ImageWithFallback
                        src={v.imageUrl}
                        fallbackSrc={v.fallbackSvg}
                        alt={v.altText}
                        aspectRatioClass="h-full w-full"
                      />
                    </div>

                    <div className="text-sm font-bold text-white leading-snug">{v.name}</div>
                    <div className="text-[11px] text-amber-400 mt-1">{v.seats} Seats · {v.transmission}</div>
                    
                    <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{v.fuel}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {isSelected ? 'Selected' : 'Choose'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Verification checklist note */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Simple Verification &amp; Safe Handover</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Requires valid Driving License (minimum 1 year old) and Aadhaar/Govt ID verification. Vehicle joint inspection checklist completed prior to journey.
              </p>
            </div>
          </div>

          {/* Right: Quick Request Box */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 ring-1 ring-blue-500/20">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-white">Request Self Drive</h3>
                  <p className="text-xs text-slate-400">Direct enquiry with custom duration</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Selected Vehicle</label>
                  <input
                    type="text"
                    readOnly
                    value={selectedVehicle}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-semibold text-amber-400 cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>{currentVehicleObj?.seats} Seats</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Cog className="w-4 h-4 text-purple-400" />
                    <span>{currentVehicleObj?.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Fuel className="w-4 h-4 text-emerald-400" />
                    <span>{currentVehicleObj?.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Comprehensive Insurance</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Rental Duration *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      {durations.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>REQUEST SELF DRIVE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
