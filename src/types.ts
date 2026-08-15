export type TribePersonality = 
  | 'THE ADVENTURER' 
  | 'THE EXPLORER' 
  | 'THE SOCIAL ONE' 
  | 'THE SLOW TRAVELLER' 
  | 'THE STORYTELLER';

export type TripCategory = 
  | 'Adventure' 
  | 'Beach' 
  | 'Backpacking' 
  | 'Photography' 
  | 'Food' 
  | 'Nature' 
  | 'Social' 
  | 'Slow Travel'
  | 'Hill Station';

export type TripDifficulty = 'Easy' | 'Moderate' | 'Challenging';

export type TripStatus = 'AVAILABLE' | 'FEW_SPOTS_LEFT' | 'COMING_SOON' | 'DRAFT' | 'ARCHIVED';

export interface TravelerProfile {
  id: string;
  name: string;
  avatar: string;
  city: string;
  occupation: string;
  bio: string;
  tribePersonality: TribePersonality;
  interests: string[];
  travelStyle: string[];
  journeysJoinedCount: number;
  badges: string[];
  isDemo: boolean;
  instagramHandle?: string;
  favoriteQuote?: string;
  verifiedTraits?: string[];
  status?: 'ACTIVE' | 'SUSPENDED';
  joinedDate?: string;
  email?: string;
}

export interface FounderInfo {
  name: string;
  role: string;
  brand: string;
  handle: string;
  avatar: string;
  storyHeading: string;
  storyText: string[];
}

export interface TripLeader {
  id: string;
  name: string;
  avatar: string;
  title: string;
  experienceYears: number;
  tripsHosted: number;
  rating: number;
  about: string;
  languages: string[];
  specialty: string;
  isDemo: boolean;
}

export interface ItineraryDay {
  day: number;
  dayTitle: string; // e.g. "DAY 01 — ARRIVE"
  title: string;
  description: string;
  mealsIncluded: string[];
  accommodation: string;
  highlights: string[];
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  chapterTitle: string; // e.g. "The First Chapter", "Into the Wild"
  destination: string;
  region: 'Tamil Nadu' | 'South India' | 'North India & Himalayas' | 'North East' | 'West India' | 'Central India';
  durationDays: number;
  durationNights: number;
  price: number;
  originalPrice?: number;
  currency: string;
  category: TripCategory;
  tribePersonalityMatch: TribePersonality[];
  difficulty: TripDifficulty;
  totalSpots: number;
  spotsTaken: number;
  status: TripStatus;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  videoUrl?: string;
  galleryImages: string[];
  startDate: string;
  endDate: string;
  meetingPoint: string;
  accommodationType: string;
  overview: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  whatToBring: string[];
  leader: TripLeader;
  joiningTravelers: TravelerProfile[];
  safetyNotes: string[];
  ageRestriction?: string; // e.g. "NO AGE RESTRICTION"
  featuredVideoUrl?: string;
  featured?: boolean;
  comingSoon?: boolean;
  posterWebP?: string;
  posterJpg?: string;
  posterAlt?: string;
  isPublicMapAllowed?: boolean;
  adminLatitude?: number;
  adminLongitude?: number;
  adminVerificationStatus?: string;
  adminNotes?: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  stateCountry: string;
  image: string;
  videoUrl?: string;
  shortDescription: string;
  fullStory?: string;
  region: string;
  activeTripsCount: number;
  highlights: string[];
  bestSeason?: string;
  altitude?: string;
  comingSoon?: boolean;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  city: string;
  tripName: string;
  quote: string;
  rating: number;
  date: string;
  isDemo: boolean;
}

export interface CommunityPost {
  id: string;
  author: TravelerProfile;
  tripTitle?: string;
  destination: string;
  createdAt: string;
  content: string;
  images?: string[];
  likesCount: number;
  commentsCount: number;
  userLiked?: boolean;
  comments?: {
    id: string;
    authorName: string;
    authorAvatar: string;
    text: string;
    createdAt: string;
  }[];
}

export interface BookingDetails {
  id: string;
  tripId: string;
  tripTitle: string;
  travelerCount: number;
  totalAmount: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  city: string;
  tribePersonality: TribePersonality;
  roommatePreference?: 'Female Roommate' | 'Male Roommate' | 'No Preference';
  specialNotes?: string;
  status: 'CONFIRMED' | 'PENDING' | 'WAITLIST' | 'CANCELLED';
  bookingReference: string;
  bookingDate: string;
  isDemo: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN';
  token: string;
}

export type AdminSection = 
  | 'overview' 
  | 'experiences' 
  | 'destinations' 
  | 'locations'
  | 'users' 
  | 'travellers' 
  | 'stories' 
  | 'media' 
  | 'bookings' 
  | 'settings';

export type MediaSlot = 
  | 'hero' 
  | 'experience' 
  | 'destination' 
  | 'gallery' 
  | 'community' 
  | 'story' 
  | 'instagram' 
  | 'general';

export interface VerifiedLocation {
  id: string;
  name: string;
  districtRegion: string;
  category?: 'FOREST' | 'BOATING' | 'WATERFALL' | 'VIEWPOINT' | 'CULTURAL' | 'STAY' | 'MEETING_POINT' | 'NATURE' | string;
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  verificationStatus: 'LOCATION_VERIFIED' | 'PENDING_RECONNAISSANCE';
  verifiedBy?: string;
  verificationDate?: string;
  lastVerifiedDate?: string;
  description?: string;
  notes?: string;
  activityTags?: string[];
  verifiedLandmarkNotes?: string;
  elevation?: string;
  recommendedSeason?: string;
  associatedTripId?: string;
  mediaReferences?: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  category: 'Destinations' | 'Campfire' | 'Portraits' | 'Nature' | 'Banners';
  size: string;
  createdAt: string;
  assignedSlot?: MediaSlot;
  isDemo?: boolean;
  caption?: string;
  location?: string;
  exactLocation?: string;
  districtRegion?: string;
  lat?: number;
  lng?: number;
  source?: 'Beyond Strangers Original' | 'Licensed Photography' | 'Provided Video Footages' | 'Community Submission' | 'Reference Geodata';
  usageRights?: 'Owned by Beyond Strangers' | 'Licensed by Content Team' | 'Permitted with Attribution';
  verificationStatus?: 'LOCATION_VERIFIED' | 'PENDING_VERIFICATION' | 'REGION_ESTIMATED';
  googleMapsRefUrl?: string;
  instagramUrl?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  subTagline: string;
  announcement: string;
  founderName: string;
  founderRole: string;
  founderBio: string[];
  founderImage: string;
  instagramHandle: string;
  contactEmail: string;
  whatsappNumber: string;
  cancellationSummary: string;
  featuredTripId?: string;
}

export type ActiveTab = 
  | 'home' 
  | 'experiences' 
  | 'society' 
  | 'destinations' 
  | 'stories' 
  | 'about' 
  | 'experience-detail'
  | 'destination-detail'
  | 'dashboard'
  | 'design-system'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'cancellation'
  | 'admin'
  | 'admin-login'
  | 'admin-dashboard';
