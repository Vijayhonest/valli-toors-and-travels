import React from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../../data/travelData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full py-16 bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-900/30 text-amber-400 border border-blue-500/30 mb-4">
          <Heart className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
          Traveler Experiences
        </h2>

        {/* Strict prompt compliance: "Customer stories will appear here." */}
        <div className="mt-6 p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl max-w-xl mx-auto">
          <p className="text-base text-slate-300 italic font-medium">
            “Customer stories will appear here.”
          </p>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Have you traveled with Valli Tours and Travels? We would love to hear about your experience! Share your feedback with us after your trip.
          </p>

          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello Valli Tours and Travels, I traveled with you and would like to share my feedback.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Submit your journey review via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
