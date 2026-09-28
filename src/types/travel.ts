export type TripType = 
  | 'Local' 
  | 'Outstation' 
  | 'Airport Transfer' 
  | 'One Way' 
  | 'Round Trip' 
  | 'Multi Day';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: 'Cars' | 'Vans' | 'Bus';
  segment: 'Family' | 'Group Travel' | 'Executive' | 'Budget';
  seats: number;
  luggage: string;
  transmission: 'Manual' | 'Automatic' | 'Manual / Chauffeur';
  fuel: 'Diesel' | 'Petrol / CNG' | 'Diesel (High Mileage)';
  suitableFor: string;
  features: string[];
  imageUrl: string;
  fallbackSvg: string;
  altText: string;
  availableForSelfDrive?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  imageUrl: string;
  iconName: string;
  altText: string;
}

export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  category: 'Pilgrimage' | 'Hill Station' | 'Coastal' | 'Heritage' | 'Nature';
  highlights: string[];
  suitableVehicles: string[];
  itinerary: {
    day: string;
    title: string;
    details: string;
  }[];
  imageUrl: string;
  altText: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  category: 'Beach' | 'Hill Station' | 'Pilgrimage' | 'Nature' | 'Weekend' | 'City';
  popularFor: string;
  bestTimeToVisit: string;
  recommendedDuration: string;
  recommendedFleet: string;
  imageUrl: string;
  altText: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Vehicles' | 'Destinations' | 'Road Trips' | 'Family Travel' | 'Group Travel';
  imageUrl: string;
  caption: string;
  altText: string;
}

export interface BookingEnquiry {
  tripType: TripType;
  pickupLocation: string;
  dropLocation: string;
  travelDate: string;
  returnDate?: string;
  passengers: number;
  preferredVehicle: string;
  customerName: string;
  customerPhone: string;
  flightNumber?: string;
  specialNotes?: string;
}
