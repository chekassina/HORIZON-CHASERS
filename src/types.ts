export interface ItineraryDay {
  day: number;
  title: string;
  desc: string;
}

export interface Review {
  author: string;
  country: string;
  rating: number;
  text: string;
  date: string;
}

export interface SafariPackage {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: number;
  rating: number;
  location: string;
  image: string;
  highlights: string[];
  description: string;
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  permitInfo?: string;
  bestTime: string;
  packingList: string[];
  reviews: Review[];
  featured?: boolean;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  packageId?: string;
  packageName?: string;
  travelDate: string;
  guests: number;
  preferences: string;
  status: string; // e.g. "Pending", "Approved", "Cancelled"
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
}
