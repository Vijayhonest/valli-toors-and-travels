import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Car, 
  PlaneTakeoff, 
  Key, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle, 
  Phone 
} from 'lucide-react';
import { FLEET_DATA, CONTACT_INFO, DESTINATIONS_DATA } from '../../data/travelData';

export type BookingBarTab = 'LOCAL' | 'OUTSTATION' | 'AIRPORT' | 'SELF DRIVE' | 'TOUR PACKAGE';

interface SmartBookingWidgetProps {
  onDirectQuote?: (details: any) => void;
}

export const SmartBookingWidget: React.FC<SmartBookingWidgetProps> = () => {
  const [activeTab, setActiveTab] = useState<BookingBarTab>('OUTSTATION');

  // Common and tab-specific fields
  const [pickup, setPickup] = useState('');
  const [dropOrDest, setDropOrDest] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState('');
  const [time, setTime] = useState('06:00');
  const [passengers, setPassengers] = useState(4);
  const [vehicle, setVehicle] = useState('Swift Dzire');
  const [tripType, setTripType] = useState('Round Trip');
  
  // Airport specific
  const [airport, setAirport] = useState('Visakhapatnam International (VTZ)');
  const [airportTransferType, setAirportTransferType] = useState<'Pickup' | 'Drop'>('Pickup');
  const [flightNumber, setFlightNumber] = useState('');

  // Self Drive specific
  const [selfDriveVehicle, setSelfDriveVehicle] = useState('Maruti Suzuki Swift');
  const [duration, setDuration] = useState('24 Hours (1 Day)');

  // Tour Package specific
  const [packageDest, setPackageDest] = useState('Tirupati Balaji Pilgrimage');

  // Modal / Quote Workflow Stage
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const airports = [
    'Visakhapatnam International (VTZ)',
    'Vijayawada International (VGA)',
    'Rajiv Gandhi International Hyderabad (HYD)',
    'Tirupati International (TIR)',
    'Chennai International (MAA)',
    'Bengaluru Kempegowda (BLR)',
  ];

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const getJourneySummary = () => {
    switch (activeTab) {
      case 'LOCAL':
        return {
          category: 'Local City Journey',
          route: `${pickup || 'Local City'} → ${dropOrDest || 'Local Stops'}`,
          timing: `${date} at ${time}`,
          details: `Vehicle: ${vehicle}`,
        };
      case 'OUTSTATION':
        return {
          category: `Outstation (${tripType})`,
          route: `${pickup || 'Origin'} → ${dropOrDest || 'Destination'}`,
          timing: `${date} ${returnDate ? `to ${returnDate}` : ''}`,
          details: `${passengers} Passengers · Vehicle: ${vehicle}`,
        };
      case 'AIRPORT':
        return {
          category: `Airport ${airportTransferType}`,
          route: airportTransferType === 'Pickup' ? `${airport} → ${dropOrDest || 'Destination Address'}` : `${pickup || 'Pickup Address'} → ${airport}`,
          timing: `${date} at ${time}`,
          details: `${passengers} Passengers · Flight: ${flightNumber || 'Not specified'}`,
        };
      case 'SELF DRIVE':
        return {
          category: 'Self Drive Car Rental',
          route: `Vehicle: ${selfDriveVehicle}`,
          timing: `Pickup: ${date} ${returnDate ? `| Return: ${returnDate}` : ''}`,
          details: `Duration: ${duration}`,
        };
      case 'TOUR PACKAGE':
        return {
          category: 'Curated Tour Package',
          route: `Destination: ${packageDest}`,
          timing: `Start Date: ${date}`,
          details: `${passengers} Passengers · Vehicle: ${vehicle}`,
        };
    }
  };

  const generateWhatsAppUrl = () => {
    const summary = getJourneySummary();
    const text = `*New Booking & Availability Request - Valli Tours & Travels*
- *Type:* ${summary.category}
- *Route/Destination:* ${summary.route}
- *Travel Dates:* ${summary.timing}
- *Specifications:* ${summary.details}
- *Passenger Name:* ${customerName}
- *Contact Phone:* ${customerPhone}
${specialNotes ? `- *Special Notes:* ${specialNotes}` : ''}`;
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <section className="relative z-30 -mt-14 sm:-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Floating Booking Panel Container with Gold Trim & Deep Glass */}
      <div className="rounded-3xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl ring-1 ring-blue-500/20 overflow-hidden">
        
        {/* Top 5 Dynamic Booking Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-slate-950/80 border-b border-slate-800 text-xs font-bold divide-x divide-slate-800/80">
          {(['LOCAL', 'OUTSTATION', 'AIRPORT', 'SELF DRIVE', 'TOUR PACKAGE'] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-3 text-center transition-all flex items-center justify-center gap-2 relative ${
                  isSelected
                    ? 'bg-blue-950/80 text-amber-400 font-extrabold shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                {tab === 'LOCAL' && <MapPin className="w-3.5 h-3.5 shrink-0" />}
                {tab === 'OUTSTATION' && <Car className="w-3.5 h-3.5 shrink-0" />}
                {tab === 'AIRPORT' && <PlaneTakeoff className="w-3.5 h-3.5 shrink-0" />}
                {tab === 'SELF DRIVE' && <Key className="w-3.5 h-3.5 shrink-0" />}
                {tab === 'TOUR PACKAGE' && <Compass className="w-3.5 h-3.5 shrink-0" />}
                
                <span className="truncate">{tab}</span>
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400 shadow-md shadow-amber-400/50" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab-Specific Dynamic Form Area */}
        <form onSubmit={handleCheckAvailability} className="p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: LOCAL */}
          {activeTab === 'LOCAL' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pickup Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter pickup locality"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Drop / Stops *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter destination area"
                    value={dropOrDest}
                    onChange={(e) => setDropOrDest(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Travel Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pickup Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Vehicle</label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {FLEET_DATA.map((v) => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* TAB 2: OUTSTATION */}
          {activeTab === 'OUTSTATION' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pickup City *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Visakhapatnam"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destination *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tirupati, Araku, Ooty"
                    value={dropOrDest}
                    onChange={(e) => setDropOrDest(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Trip Type</label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Round Trip">Round Trip</option>
                  <option value="One Way">One Way</option>
                  <option value="Multi Day">Multi Day Tour</option>
                </select>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Travel Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Passengers</label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 12, 17, 25, 35, 45].map((n) => (
                    <option key={n} value={n}>{n} Guests</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* TAB 3: AIRPORT */}
          {activeTab === 'AIRPORT' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Airport *</label>
                <select
                  value={airport}
                  onChange={(e) => setAirport(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {airports.map((ap) => (
                    <option key={ap} value={ap}>{ap}</option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pickup / Drop</label>
                <select
                  value={airportTransferType}
                  onChange={(e) => setAirportTransferType(e.target.value as 'Pickup' | 'Drop')}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Pickup">Airport Pickup (to City)</option>
                  <option value="Drop">Airport Drop (from City)</option>
                </select>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Time *</label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Flight No. (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 6E-452"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* TAB 4: SELF DRIVE */}
          {activeTab === 'SELF DRIVE' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Vehicle *</label>
                <select
                  value={selfDriveVehicle}
                  onChange={(e) => setSelfDriveVehicle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Maruti Suzuki Swift">Maruti Suzuki Swift (Hatchback)</option>
                  <option value="Maruti Suzuki Dzire">Maruti Suzuki Dzire (Sedan)</option>
                  <option value="Maruti Suzuki Ertiga">Maruti Suzuki Ertiga (7-Seater)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pickup Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Rental Duration *</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="12 Hours (Half Day)">12 Hours (Half Day)</option>
                  <option value="24 Hours (1 Day)">24 Hours (1 Day)</option>
                  <option value="48 Hours (2 Days)">48 Hours (2 Days)</option>
                  <option value="3-5 Days (Weekend Getaway)">3-5 Days (Weekend Getaway)</option>
                  <option value="7+ Days (Weekly Rental)">7+ Days (Weekly Rental)</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB 5: TOUR PACKAGE */}
          {activeTab === 'TOUR PACKAGE' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Destination / Package *</label>
                <select
                  value={packageDest}
                  onChange={(e) => setPackageDest(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Tirupati Balaji Pilgrimage (2D/1N)">Tirupati Balaji Pilgrimage (2D/1N)</option>
                  <option value="Araku Valley & Vizag Coastal (3D/2N)">Araku Valley & Vizag Coastal (3D/2N)</option>
                  <option value="Ooty & Coonoor Queen of Nilgiris (4D/3N)">Ooty & Coonoor Queen of Nilgiris (4D/3N)</option>
                  <option value="Kerala God's Own Country (5D/4N)">Kerala God's Own Country (5D/4N)</option>
                  <option value="Srisailam Mallikarjuna Yatra (2D/1N)">Srisailam Mallikarjuna Yatra (2D/1N)</option>
                  <option value="Hyderabad Heritage & Film City (2D/1N)">Hyderabad Heritage & Film City (2D/1N)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Travel Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Passengers</label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 12, 17, 25, 35, 45].map((n) => (
                    <option key={n} value={n}>{n} Guests</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Vehicle Preference</label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {FLEET_DATA.map((v) => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct transparent quote · Zero automated fake surges · 24/7 dispatcher verification</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>CHECK AVAILABILITY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Availability / Quote Workflow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-lg my-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-100 ring-1 ring-blue-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
            >
              ✕
            </button>

            {!isSubmitted ? (
              <div>
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Journey Availability Request
                  </span>
                  <h3 className="text-xl font-display font-bold text-white mt-0.5">
                    Review Journey &amp; Request Quote
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Submitted directly to our 24/7 dispatch office for real vehicle assignment.
                  </p>
                </div>

                {/* Journey Summary Box */}
                {(() => {
                  const summary = getJourneySummary();
                  return (
                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs mb-5">
                      <div className="flex justify-between pb-1.5 border-b border-slate-700/60">
                        <span className="text-slate-400">Category:</span>
                        <span className="font-semibold text-amber-400">{summary.category}</span>
                      </div>
                      <div className="flex justify-between pb-1.5 border-b border-slate-700/60">
                        <span className="text-slate-400">Route / Vehicle:</span>
                        <span className="font-medium text-white">{summary.route}</span>
                      </div>
                      <div className="flex justify-between pb-1.5 border-b border-slate-700/60">
                        <span className="text-slate-400">Schedule:</span>
                        <span className="font-medium text-white">{summary.timing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Details:</span>
                        <span className="font-medium text-white">{summary.details}</span>
                      </div>
                    </div>
                  );
                })()}

                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 7372993999"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Special Requirements / Notes</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Early morning departure, temple darshan stop..."
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Submit Availability Request</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-white">Request Received!</h3>
                  <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-amber-400">{customerName}</span>. Your request has been forwarded to Valli Tours &amp; Travels operations.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-950/40"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Send Request to WhatsApp Dispatch
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phones[0].number}`}
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-sm transition-all border border-slate-700"
                  >
                    <Phone className="w-4 h-4" />
                    Call Dispatch Directly (7372993999)
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-xs text-slate-400 hover:text-slate-200 underline pt-2"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
