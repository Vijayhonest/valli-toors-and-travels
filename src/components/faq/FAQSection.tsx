import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { FAQ_DATA, CONTACT_INFO } from '../../data/travelData';

interface FAQSectionProps {
  onCall: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onCall }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-20 bg-slate-900/60 text-slate-100 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Clear, transparent answers about our bookings, vehicle fleet, and trip policies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white flex items-center gap-3">
                    <span className="text-amber-400 text-xs font-mono font-normal">0{idx + 1}.</span>
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions prompt */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white">Have a specific question about your route?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Speak directly with our operations manager at any time.</p>
          </div>

          <button
            onClick={onCall}
            className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-wide flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 7372993999</span>
          </button>
        </div>
      </div>
    </section>
  );
};
