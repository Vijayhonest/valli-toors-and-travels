/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/layout/FloatingActions';
import { HeroSection } from './components/home/HeroSection';
import { SmartBookingWidget } from './components/booking/SmartBookingWidget';
import { AboutSection } from './components/home/AboutSection';
import { FleetSection } from './components/fleet/FleetSection';
import { ServicesSection } from './components/services/ServicesSection';
import { TourPackagesSection } from './components/packages/TourPackagesSection';
import { DestinationsSection } from './components/destinations/DestinationsSection';
import { AirportTransfersSection } from './components/specialized/AirportTransfersSection';
import { SelfDriveSection } from './components/specialized/SelfDriveSection';
import { CorporateTravelSection } from './components/specialized/CorporateTravelSection';
import { PilgrimageSection } from './components/specialized/PilgrimageSection';
import { TripPlannerSection } from './components/planner/TripPlannerSection';
import { GallerySection } from './components/gallery/GallerySection';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { FAQSection } from './components/faq/FAQSection';
import { ContactSection } from './components/contact/ContactSection';

import { BookingModal } from './components/modals/BookingModal';
import { PhoneSelectorModal } from './components/modals/PhoneSelectorModal';
import { VehicleDetailModal } from './components/modals/VehicleDetailModal';
import { TourPackageModal } from './components/modals/TourPackageModal';
import { ServiceDetailModal } from './components/modals/ServiceDetailModal';
import { DestinationDetailModal } from './components/modals/DestinationDetailModal';
import { GalleryLightbox } from './components/modals/GalleryLightbox';
import { TrustStrip } from './components/home/TrustStrip';

import { Vehicle, TourPackage, ServiceItem, Destination, GalleryItem, BookingEnquiry } from './types/travel';
import { GALLERY_DATA } from './data/travelData';

export default function App() {
  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<Partial<BookingEnquiry>>({});
  const [isPhoneSelectorOpen, setIsPhoneSelectorOpen] = useState(false);

  // Detail modals
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Lightbox
  const [activeGalleryItem, setActiveGalleryItem] = useState<GalleryItem | null>(null);

  // Universal handler to open booking modal with preset info
  const handleOpenBooking = (presetData?: Partial<BookingEnquiry>) => {
    setBookingInitialData(presetData || {});
    setIsBookingOpen(true);
  };

  // Gallery lightbox navigation
  const handleNextGalleryItem = () => {
    if (!activeGalleryItem) return;
    const currentIndex = GALLERY_DATA.findIndex((item) => item.id === activeGalleryItem.id);
    const nextIndex = (currentIndex + 1) % GALLERY_DATA.length;
    setActiveGalleryItem(GALLERY_DATA[nextIndex]);
  };

  const handlePrevGalleryItem = () => {
    if (!activeGalleryItem) return;
    const currentIndex = GALLERY_DATA.findIndex((item) => item.id === activeGalleryItem.id);
    const prevIndex = (currentIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
    setActiveGalleryItem(GALLERY_DATA[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenPhoneSelector={() => setIsPhoneSelectorOpen(true)}
      />

      <main className="flex-1 pb-16 sm:pb-0">
        {/* 2. Hero Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenPhoneSelector={() => setIsPhoneSelectorOpen(true)}
        />

        {/* 3. Smart Booking Planner Widget */}
        <SmartBookingWidget />

        {/* 4. Trust Strip - Immediately below booking area */}
        <TrustStrip />

        {/* 5. About Brand & Heritage */}
        <AboutSection
          onOpenPhoneSelector={() => setIsPhoneSelectorOpen(true)}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 6. Complete Fleet Showcase */}
        <FleetSection
          onSelectVehicleForBooking={(vehicleName) => {
            handleOpenBooking({ preferredVehicle: vehicleName });
          }}
          onViewVehicleDetails={(vehicle) => setSelectedVehicle(vehicle)}
        />

        {/* 7. Travel Services */}
        <ServicesSection
          onExploreService={(service: ServiceItem) => {
            handleOpenBooking({
              specialNotes: `Enquiring for ${service.title}: ${service.tagline}`,
            });
          }}
          onViewServiceDetails={(service: ServiceItem) => setSelectedService(service)}
        />

        {/* 8. Marketplace Tour Packages */}
        <TourPackagesSection
          onSelectPackageForQuote={(packageTitle) => {
            handleOpenBooking({
              tripType: 'Multi Day',
              specialNotes: `Interested in tour package: ${packageTitle}`,
            });
          }}
          onViewPackageDetails={(pkg) => setSelectedPackage(pkg)}
        />

        {/* 9. Destinations Explorer */}
        <DestinationsSection
          onPlanTripToDestination={(dest: Destination) => {
            handleOpenBooking({
              dropLocation: `${dest.name}, ${dest.state}`,
              preferredVehicle: dest.recommendedFleet.split('/')[0].trim(),
            });
          }}
          onViewDestinationDetails={(dest: Destination) => setSelectedDestination(dest)}
        />

        {/* 9. Dedicated Airport Transfers Section */}
        <AirportTransfersSection
          onDirectBook={(details) => {
            handleOpenBooking(details);
          }}
        />

        {/* 10. Dedicated Self Drive Section */}
        <SelfDriveSection
          onRequestSelfDrive={(vehicleName, duration) => {
            handleOpenBooking({
              preferredVehicle: vehicleName,
              specialNotes: `Self-Drive Rental Request for ${duration}`,
            });
          }}
        />

        {/* 11. Dedicated Corporate Travel Section */}
        <CorporateTravelSection
          onRequestCorporateQuote={(companyName, serviceNeeded) => {
            handleOpenBooking({
              customerName: companyName,
              specialNotes: `Corporate Mobility Enquiry: ${serviceNeeded}`,
            });
          }}
        />

        {/* 12. Dedicated Pilgrimage Section */}
        <PilgrimageSection
          onPlanPilgrimage={(type) => {
            handleOpenBooking({
              tripType: 'Outstation',
              specialNotes: `Pilgrimage Yatra Request: ${type}`,
            });
          }}
        />

        {/* 13. Interactive Trip Planner */}
        <TripPlannerSection
          onQuoteRequested={(summary) => {
            handleOpenBooking({
              specialNotes: `Custom Trip Planner Requirement: ${summary}`,
            });
          }}
        />

        {/* 14. Visual Photo Gallery with Lightbox */}
        <GallerySection
          onOpenLightbox={(item) => setActiveGalleryItem(item)}
        />

        {/* 15. Real Testimonials ("Customer stories will appear here.") */}
        <TestimonialsSection />

        {/* 16. FAQ Accordion */}
        <FAQSection
          onCall={() => setIsPhoneSelectorOpen(true)}
        />

        {/* 17. Contact & Helpline Section */}
        <ContactSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenPhoneSelector={() => setIsPhoneSelectorOpen(true)}
        />
      </main>

      {/* 18. Quiet Structured Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenPhoneSelector={() => setIsPhoneSelectorOpen(true)}
      />

      {/* 19. Floating WhatsApp & Mobile Bottom Navigation Bar */}
      <FloatingActions
        onOpenBooking={() => handleOpenBooking()}
        onOpenPhoneSelector={() => setIsPhoneSelectorOpen(true)}
      />

      {/* Universal Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingInitialData}
      />

      <PhoneSelectorModal
        isOpen={isPhoneSelectorOpen}
        onClose={() => setIsPhoneSelectorOpen(false)}
      />

      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onBookVehicle={(vehicleName) => {
          setSelectedVehicle(null);
          handleOpenBooking({ preferredVehicle: vehicleName });
        }}
        onCall={() => {
          setSelectedVehicle(null);
          setIsPhoneSelectorOpen(true);
        }}
      />

      <TourPackageModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onRequestQuote={(packageTitle) => {
          setSelectedPackage(null);
          handleOpenBooking({
            tripType: 'Multi Day',
            specialNotes: `Custom Quote Request for: ${packageTitle}`,
          });
        }}
        onCall={() => {
          setSelectedPackage(null);
          setIsPhoneSelectorOpen(true);
        }}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(srv) => {
          setSelectedService(null);
          handleOpenBooking({
            specialNotes: `Enquiry for ${srv.title}: ${srv.tagline}`,
          });
        }}
        onCall={() => {
          setSelectedService(null);
          setIsPhoneSelectorOpen(true);
        }}
      />

      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onPlanRoute={(dest) => {
          setSelectedDestination(null);
          handleOpenBooking({
            dropLocation: `${dest.name}, ${dest.state}`,
            preferredVehicle: dest.recommendedFleet.split('/')[0].trim(),
          });
        }}
        onCall={() => {
          setSelectedDestination(null);
          setIsPhoneSelectorOpen(true);
        }}
      />

      <GalleryLightbox
        item={activeGalleryItem}
        onClose={() => setActiveGalleryItem(null)}
        onNext={handleNextGalleryItem}
        onPrev={handlePrevGalleryItem}
      />
    </div>
  );
}
