import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, MessageCircle, Calendar, MapPin, Users, Car, ArrowRight, ShieldCheck } from 'lucide-react';
import { TripType, BookingEnquiry } from '../../types/travel';
import { FLEET_DATA, CONTACT_INFO } from '../../data/travelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<BookingEnquiry>;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState<BookingEnquiry>({
    tripType: 'Outstation',
    pickupLocation: '',
    dropLocation: '',
    travelDate: new Date().toISOString().split('T')[0],
    returnDate: '',
    passengers: 4,
    preferredVehicle: 'Swift Dzire',
    customerName: '',
    customerPhone: '',
    flightNumber: '',
    specialNotes: '',
  });

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const tripTypes: TripType[] = [
    'Local',
    'Outstation',
    'Airport Transfer',
    'One Way',
    'Round Trip',
    'Multi Day',
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.pickupLocation || !formData.dropLocation) {
        alert('Please provide both Pickup and Drop locations.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!formData.customerName || !formData.customerPhone) {
        alert('Please provide your name and phone number to confirm your booking enquiry.');
        return;
      }
      setSubmitted(true);
    }
  };

  const generateWhatsAppText = () => {
    const text = `*New Booking Enquiry - Valli Tours & Travels*
- *Trip Type:* ${formData.tripType}
- *Pickup:* ${formData.pickupLocation}
- *Drop:* ${formData.dropLocation}
- *Travel Date:* ${formData.travelDate} ${formData.returnDate ? `to ${formData.returnDate}` : ''}
- *Passengers:* ${formData.passengers}
- *Vehicle:* ${formData.preferredVehicle}
- *Customer:* ${formData.customerName} (${formData.customerPhone})
${formData.flightNumber ? `- *Flight No:* ${formData.flightNumber}` : ''}
${formData.specialNotes ? `- *Notes:* ${formData.specialNotes}` : ''}`;
    return encodeURIComponent(text);
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl my-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-100 ring-1 ring-blue-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={resetForm}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Heading & Step Indicator */}
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                Booking Enquiry Request
              </div>
              <h2 className="text-2xl font-display font-bold text-white">
                {step === 1 && '1. Choose Journey Details'}
                {step === 2 && '2. Select Your Vehicle'}
                {step === 3 && '3. Review & Contact Details'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time review by our dispatchers. Zero fake availability — genuine human quote.
              </p>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 mt-4">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      step >= s ? 'bg-amber-400' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step 1: Journey Details */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                {/* Trip Type Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Trip Type</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {tripTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, tripType: type })}
                        className={`py-2 px-2 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                          formData.tripType === type
                            ? 'bg-blue-600 border-amber-400 text-white shadow-md'
                            : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pickup Location *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g., Visakhapatnam, Vijayawada, Hyderabad"
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Drop / Destination *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g., Tirupati, Araku, Ooty, Airport"
                        value={formData.dropLocation}
                        onChange={(e) => setFormData({ ...formData, dropLocation: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Travel Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        required
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {(formData.tripType === 'Round Trip' || formData.tripType === 'Multi Day') && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Return Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="date"
                          value={formData.returnDate || ''}
                          onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Passengers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <select
                        value={formData.passengers}
                        onChange={(e) => setFormData({ ...formData, passengers: Number(e.target.value) })}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 12, 17, 25, 35, 45].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Passenger' : 'Passengers'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {formData.tripType === 'Airport Transfer' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Flight Number (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 6E 452 / AI 831 (for flight delay tracking)"
                      value={formData.flightNumber || ''}
                      onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Choose Vehicle</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Choose Vehicle */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {FLEET_DATA.map((v) => {
                    const isSelected = formData.preferredVehicle === v.name;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setFormData({ ...formData, preferredVehicle: v.name })}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-950/70 border-amber-400 ring-1 ring-amber-400/50'
                            : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-9 rounded-lg bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                            <Car className="w-5 h-5 text-amber-400" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                              {v.name}
                              <span className="text-[10px] font-medium text-blue-300/80">({v.category})</span>
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{v.seats} Seats</span>
                              <span>·</span>
                              <span>{v.luggage}</span>
                              <span>·</span>
                              <span>{v.fuel}</span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 pl-2">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                            isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {isSelected ? 'Selected' : 'Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Proceed to Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Contact */}
            {step === 3 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                {/* Summary Card */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-700/60">
                    <span className="text-slate-400">Trip &amp; Vehicle</span>
                    <span className="font-semibold text-amber-400">{formData.tripType} · {formData.preferredVehicle}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Route</span>
                    <span className="font-medium text-white">{formData.pickupLocation} → {formData.dropLocation}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Date</span>
                    <span className="font-medium text-white">{formData.travelDate} {formData.returnDate ? `to ${formData.returnDate}` : ''}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Passengers</span>
                    <span className="font-medium text-white">{formData.passengers} Guests</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Special Requests or Notes (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Child seat needed, temple stop en route, early 4 AM pickup..."
                    value={formData.specialNotes || ''}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Submit Booking Request</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Submission Success State */
          <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-white">Booking Enquiry Received!</h3>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-amber-400">{formData.customerName}</span>. Your request for <span className="font-semibold text-white">{formData.pickupLocation} to {formData.dropLocation}</span> with <span className="font-semibold text-white">{formData.preferredVehicle}</span> has been logged with Valli Tours &amp; Travels dispatch.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-left text-xs space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between"><span className="text-slate-400">Date:</span> <span className="font-medium text-white">{formData.travelDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Vehicle:</span> <span className="font-medium text-white">{formData.preferredVehicle}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Contact:</span> <span className="font-medium text-white">{formData.customerPhone}</span></div>
            </div>

            <div className="space-y-3 pt-2 max-w-md mx-auto">
              {/* WhatsApp Instant Send */}
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${generateWhatsAppText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Send Request via WhatsApp
              </a>

              {/* Direct Call Button */}
              <a
                href={`tel:${CONTACT_INFO.phones[0].number}`}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-sm transition-all border border-slate-700"
              >
                <Phone className="w-4 h-4" />
                Call Dispatch Directly (7372993999)
              </a>

              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-slate-400 hover:text-slate-200 underline pt-2"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>24/7 Verified Chauffeurs &amp; Direct Support</span>
          </div>
          <span className="font-mono text-slate-400">Call: 7372993999</span>
        </div>
      </div>
    </div>
  );
};
