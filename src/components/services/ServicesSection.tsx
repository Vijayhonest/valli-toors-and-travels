import React from 'react';
import { 
  Users, 
  Compass, 
  PlaneTakeoff, 
  Briefcase, 
  Mountain, 
  Flame, 
  Navigation, 
  Key, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/travelData';
import { ServiceItem } from '../../types/travel';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ServicesSectionProps {
  onExploreService: (service: ServiceItem) => void;
  onViewServiceDetails?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onExploreService,
  onViewServiceDetails,
}) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'PlaneTakeoff': return <PlaneTakeoff className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Mountain': return <Mountain className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Navigation': return <Navigation className="w-5 h-5" />;
      case 'Key': return <Key className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="w-full py-20 bg-slate-900/60 text-slate-100 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            Tailored Travel Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Comprehensive Services For Every Travel Need
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Whether embarking on a spiritual yatra, catching an early morning flight, or gathering family for a hill station holiday, Valli Tours and Travels ensures your journey is smooth and memorable.
          </p>
        </div>

        {/* 8 Distinct Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col overflow-hidden"
            >
              {/* Service Visual */}
              <div 
                className="relative overflow-hidden aspect-[16/10] cursor-pointer"
                onClick={() => onViewServiceDetails && onViewServiceDetails(service)}
              >
                <ImageWithFallback
                  src={service.imageUrl}
                  alt={service.altText}
                  aspectRatioClass="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating Service Icon */}
                <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-blue-900/90 text-amber-400 border border-blue-500/40 backdrop-blur-md flex items-center justify-center shadow-lg">
                  {getServiceIcon(service.iconName)}
                </div>
              </div>

              {/* Service Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-blue-300 mt-0.5">
                    {service.tagline}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Key feature bullet */}
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
                  {service.features.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 line-clamp-1">
                      <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {onViewServiceDetails && (
                    <button
                      type="button"
                      onClick={() => onViewServiceDetails(service)}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
                    >
                      Details
                    </button>
                  )}
                  <button
                    onClick={() => onExploreService(service)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 group-hover:bg-amber-400 group-hover:text-slate-950 text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Explore &amp; Book</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
