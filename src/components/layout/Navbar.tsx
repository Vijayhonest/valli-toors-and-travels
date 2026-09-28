import React, { useState } from 'react';
import { Phone, Calendar, Menu, X } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenPhoneSelector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenPhoneSelector,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Planner', href: '#planner' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single element wordmark brand lockup */}
          <a href="#home" className="shrink-0 flex items-center focus:outline-none">
            <BrandLogo size="md" showTagline={false} />
          </a>

          {/* Zone 2: Clean 4-6 text navigation links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.slice(0, 7).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-amber-400 transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
            <div className="relative group">
              <button className="hover:text-amber-400 transition-colors flex items-center gap-1 text-sm font-medium">
                More
                <span className="text-[10px] text-slate-400">▾</span>
              </button>
              <div className="absolute right-0 top-full pt-2 hidden group-hover:block w-44">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col gap-1 text-xs">
                  {navLinks.slice(7).map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                  <a
                    href="#airport-transfers"
                    className="px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    Airport Transfers
                  </a>
                  <a
                    href="#self-drive"
                    className="px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    Self Drive
                  </a>
                  <a
                    href="#pilgrimage"
                    className="px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    Pilgrimage Yatra
                  </a>
                  <a
                    href="#corporate"
                    className="px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    Corporate Travel
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Zone 3: Primary actions (Call Now & Book Now) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onOpenPhoneSelector}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/50 text-xs font-semibold text-slate-200 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Now</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 transition-all whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>BOOK NOW</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-amber-400 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPhoneSelector();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-amber-400"
            >
              <Phone className="w-4 h-4" />
              <span>Direct Call (7372993999 / 7093989993 / 7399883999)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs tracking-wide"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK A JOURNEY</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
