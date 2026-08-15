import { 
  Trip, 
  Destination, 
  TravelerProfile, 
  TripLeader, 
  Testimonial, 
  CommunityPost, 
  FounderInfo, 
  BookingDetails, 
  MediaItem, 
  SiteSettings, 
  AdminUser,
  VerifiedLocation
} from '../types';

export const FOUNDER_DATA: FounderInfo = {
  name: 'Dharsh',
  role: 'Founder, Beyond Strangers',
  brand: 'Beyond Strangers (The Stranger Society)',
  handle: '@dharsh_here__',
  avatar: 'assets/images/stories/avatar_dharsh.jpg',
  storyHeading: 'Solo travel made easy across South India.',
  storyText: [
    "Beyond Strangers brings solo travellers together on weekend trips across Tamil Nadu and South India.",
    "Join solo. Leave with friends. No commercial scripts—just great people, campfires, and wild nature.",
    "Reach out directly anytime on Instagram: @dharsh_here__"
  ]
};

export const DEMO_TRIP_LEADERS: TripLeader[] = [
  {
    id: 'leader-1',
    name: 'Dharsh',
    avatar: 'assets/images/stories/avatar_dharsh.jpg',
    title: 'Founder & Experience Lead',
    experienceYears: 5,
    tripsHosted: 42,
    rating: 4.98,
    about: 'Host & founder. Leading trips across Kodaikanal, Ooty, Valparai and hidden Western Ghats trails.',
    languages: ['Tamil', 'English', 'Malayalam', 'Hindi'],
    specialty: 'Campfire Stories, Trail Navigation & Local Food',
    isDemo: false
  },
  {
    id: 'leader-2',
    name: 'Ananya Deshmukh',
    avatar: 'assets/images/stories/avatar_sneha.jpg',
    title: 'Forest & Estate Host',
    experienceYears: 4,
    tripsHosted: 28,
    rating: 4.92,
    about: 'Estate walks, photography, and making every solo traveler feel at home.',
    languages: ['English', 'Tamil', 'Hindi'],
    specialty: 'Tea Walks & Ice-breakers',
    isDemo: true
  },
  {
    id: 'leader-3',
    name: 'Aakash Verma',
    avatar: 'assets/images/stories/avatar_arjun.jpg',
    title: 'Trek & Adventure Lead',
    experienceYears: 6,
    tripsHosted: 36,
    rating: 4.95,
    about: 'First responder and mountain explorer. Led 30+ hill station treks.',
    languages: ['English', 'Tamil', 'Hindi'],
    specialty: 'Waterfalls & Summit Treks',
    isDemo: true
  }
];

export const DEMO_TRAVELERS: TravelerProfile[] = [
  {
    id: 'traveler-1',
    name: 'Priya Sharma',
    avatar: 'assets/images/stories/avatar_priya.jpg',
    city: 'Chennai',
    occupation: 'Designer',
    bio: 'Joined solo to Kodaikanal. Made 10 best friends!',
    tribePersonality: 'THE STORYTELLER',
    interests: ['📸 Photography', '🏕 Adventure', '🍜 Food'],
    travelStyle: ['Slow Travel', 'Social'],
    journeysJoinedCount: 3,
    badges: ['Founder Approved', 'Campfire Singer'],
    isDemo: true,
    instagramHandle: '@priya.travels',
    favoriteQuote: 'Strangers become family.',
    verifiedTraits: ['Govt ID Verified', 'Community Vetted', 'Mobile Verified']
  },
  {
    id: 'traveler-2',
    name: 'Arjun Mehta',
    avatar: 'assets/images/stories/avatar_arjun.jpg',
    city: 'Bengaluru',
    occupation: 'Software Engineer',
    bio: 'Escaping city noise for misty mountain mornings.',
    tribePersonality: 'THE ADVENTURER',
    interests: ['🏔 Mountains', '🌿 Nature', '🏕 Adventure'],
    travelStyle: ['High Energy', 'Backpacking'],
    journeysJoinedCount: 4,
    badges: ['Trail Leader', 'Early Bird'],
    isDemo: true,
    instagramHandle: '@arjun.outdoors',
    favoriteQuote: 'Keep walking into the mist.',
    verifiedTraits: ['Govt ID Verified', 'Mobile Verified']
  },
  {
    id: 'traveler-3',
    name: 'Sneha Kapoor',
    avatar: 'assets/images/stories/avatar_sneha.jpg',
    city: 'Coimbatore',
    occupation: 'Architect',
    bio: 'Sunset chaser and tea lover.',
    tribePersonality: 'THE SLOW TRAVELLER',
    interests: ['🏖 Sunsets', '🎵 Music', '🌿 Nature'],
    travelStyle: ['Chill Vibes', 'Cozy Stays'],
    journeysJoinedCount: 2,
    badges: ['Sunset Curator'],
    isDemo: true,
    instagramHandle: '@sneha.sketches',
    favoriteQuote: 'Collect moments, not things.',
    verifiedTraits: ['Govt ID Verified']
  },
  {
    id: 'traveler-4',
    name: 'Rahul Roy',
    avatar: 'assets/images/stories/avatar_rahul.jpg',
    city: 'Madurai',
    occupation: 'Product Specialist',
    bio: 'Solo traveller loving small group energy.',
    tribePersonality: 'THE SOCIAL ONE',
    interests: ['🎵 Music', '🍜 Local Food', '🏕 Campfires'],
    travelStyle: ['Social', 'Weekend Explorer'],
    journeysJoinedCount: 3,
    badges: ['Group Connector'],
    isDemo: true,
    instagramHandle: '@rahul.roams',
    favoriteQuote: 'Strangers are friends you haven’t met yet.',
    verifiedTraits: ['Govt ID Verified', 'Mobile Verified']
  }
];

export const DEMO_DESTINATIONS: Destination[] = [
  {
    id: 'dest-kodaikanal',
    slug: 'kodaikanal',
    name: 'Kodaikanal',
    subtitle: 'Misty Pine Forests & Lake Sunsets',
    stateCountry: 'Tamil Nadu, India',
    image: 'assets/images/destinations/kodaikanal.jpg',
    videoUrl: 'assets/videos/previews/kodaikanal.mp4',
    shortDescription: 'Pine forests, cool mist, lake views, and warm night campfires.',
    fullStory: 'Kodaikanal is the princess of hill stations in Tamil Nadu. Cool mountain air, private pine trails, quiet sunset viewpoints, and cozy estate campfires with fellow solo explorers.',
    region: 'Tamil Nadu',
    activeTripsCount: 2,
    highlights: ['Pine Forest Trek', 'Lake Sunset', 'Night Campfire', 'Cozy Cottages'],
    bestSeason: 'Year Round',
    altitude: '2,133m',
    featured: true
  },
  {
    id: 'dest-ooty',
    slug: 'ooty-nilgiris',
    name: 'Ooty & Nilgiris',
    subtitle: 'Tea Hills & Heritage Clouds',
    stateCountry: 'Tamil Nadu, India',
    image: 'assets/images/destinations/ooty.jpg',
    videoUrl: 'assets/videos/previews/ooty.mp4',
    shortDescription: 'Green tea gardens, heritage estate stays, and cool morning clouds.',
    fullStory: 'Rolling emerald tea hills and cool weather in the Queen of Hill Stations. Walk through heritage tea plantations, enjoy scenic Nilgiri viewpoints, and relax by the fireside.',
    region: 'Tamil Nadu',
    activeTripsCount: 1,
    highlights: ['Tea Estate Walks', 'Peak Sunset Point', 'Campfire Circle', 'Nilgiri Views'],
    bestSeason: 'September – May',
    altitude: '2,240m',
    featured: true
  },
  {
    id: 'dest-valparai',
    slug: 'valparai',
    name: 'Valparai',
    subtitle: 'Wild Rainforest & 40 Hairpin Bends',
    stateCountry: 'Tamil Nadu, India',
    image: 'assets/images/destinations/valparai.jpg',
    videoUrl: 'assets/videos/previews/valparai.mp4',
    shortDescription: 'Dense rainforests, lion-tailed macaques, waterfalls, and tea estates.',
    fullStory: 'Untouched hill station in the Anamalai Hills with 40 scenic hairpin bends, pristine private waterfalls, and tranquil tea estate homestays away from tourist crowds.',
    region: 'Tamil Nadu',
    activeTripsCount: 1,
    highlights: ['40 Hairpin Drive', 'Waterfall Dip', 'Wildlife Spotting', 'Tea Homestay'],
    bestSeason: 'August – April',
    altitude: '1,193m',
    featured: true
  },
  {
    id: 'dest-kolli-hills',
    slug: 'kolli-hills',
    name: 'Kolli Hills',
    subtitle: '70 Hairpin Bends & Agaya Gangai',
    stateCountry: 'Tamil Nadu, India',
    image: 'assets/images/destinations/kolli_hills.jpg',
    videoUrl: 'assets/videos/previews/kolli_hills.mp4',
    shortDescription: '70 hairpin thrill, giant cascading waterfalls, and quiet fruit orchards.',
    fullStory: 'Known as the Mountain of Death due to its 70 continuous hairpin bends, Kolli Hills offers pure adventure, the massive Agaya Gangai waterfall, and peaceful off-beat stays.',
    region: 'Tamil Nadu',
    activeTripsCount: 1,
    highlights: ['70 Hairpin Bends', 'Agaya Gangai Waterfall', 'Pine Valley Walk', 'Bonfire Night'],
    bestSeason: 'September – March',
    altitude: '1,300m',
    featured: true
  },
  {
    id: 'dest-meghamalai',
    slug: 'meghamalai',
    name: 'Meghamalai',
    subtitle: 'High Waves & Cardamom Hills',
    stateCountry: 'Tamil Nadu, India',
    image: 'assets/images/destinations/meghamalai.jpg',
    videoUrl: 'assets/videos/previews/meghamalai.mp4',
    shortDescription: 'Cloud-draped cardamom hills, wild elephant corridors, and mountain dams.',
    fullStory: 'Also known as High Wavy Mountains in Theni district. Mist-capped cardamom estates, serene lake dams, and wild hill station beauty.',
    region: 'Tamil Nadu',
    activeTripsCount: 1,
    highlights: ['Cloud Views', 'Cardamom Walks', 'Dam Viewpoint', 'Starry Nights'],
    bestSeason: 'October – May',
    altitude: '1,500m',
    featured: true
  },
  {
    id: 'dest-gavi',
    slug: 'gavi-thekkady',
    name: 'Gavi / Thekkady',
    subtitle: 'Rainforest, Boating & Waterfalls',
    stateCountry: 'Western Ghats',
    image: 'assets/images/destinations/gavi.jpg',
    videoUrl: 'assets/videos/hero_loop.mp4',
    shortDescription: 'Dense forests, calm boating, secluded waterfalls, and campfire nights.',
    fullStory: 'Pristine rainforest sanctuary along the border of Tamil Nadu and Kerala. Boating on calm reservoir waters, private waterfalls, and starlit gatherings.',
    region: 'South India',
    activeTripsCount: 1,
    highlights: ['Forest Boating', 'Private Waterfalls', 'Misty Trails', 'Campfire Circle'],
    bestSeason: 'August – March',
    altitude: '1,050m',
    featured: true
  }
];

export const DEMO_TRIPS: Trip[] = [
  {
    id: 'trip-kodaikanal',
    slug: 'kodaikanal-mist-escape',
    title: 'KODAIKANAL ESCAPE',
    chapterTitle: 'CHAPTER 01 • TAMIL NADU',
    destination: 'Kodaikanal, Tamil Nadu',
    region: 'Tamil Nadu',
    durationDays: 2,
    durationNights: 1,
    price: 4999,
    originalPrice: 6500,
    currency: '₹',
    category: 'Hill Station',
    tribePersonalityMatch: ['THE ADVENTURER', 'THE SOCIAL ONE', 'THE STORYTELLER'],
    difficulty: 'Easy',
    totalSpots: 12,
    spotsTaken: 7,
    status: 'AVAILABLE',
    rating: 4.99,
    reviewsCount: 38,
    heroImage: 'assets/images/destinations/kodaikanal.jpg',
    videoUrl: 'assets/videos/hero_loop.mp4',
    featuredVideoUrl: 'assets/videos/hero_loop.mp4',
    galleryImages: [
      'assets/images/destinations/kodaikanal.jpg',
      'assets/images/experiences/forest_trails.jpg',
      'assets/images/experiences/evening_campfire.jpg',
      'assets/images/experiences/cloud_sunrise.jpg'
    ],
    startDate: '2026-08-21',
    endDate: '2026-08-22',
    meetingPoint: 'Madurai / Dindigul Pickup Hub at 6:30 AM',
    accommodationType: 'Hilltop Pine Cottages (Twin/Triple Sharing)',
    overview: 'Misty pine forest walks, lake sunset, warm acoustic campfire, and making new friends across Tamil Nadu.',
    itinerary: [
      {
        day: 1,
        dayTitle: 'DAY 01 — ARRIVE & MEET',
        title: 'Misty Drive & Pine Forest Trail',
        description: 'Scenic hill drive, ice-breaker introductions, pine forest walk, and evening campfire with music.',
        mealsIncluded: ['Welcome Lunch', 'Campfire Dinner'],
        accommodation: 'Hilltop Pine Cottages',
        highlights: ['Pine Forest Trek', 'Sunset View', 'Campfire Circle']
      },
      {
        day: 2,
        dayTitle: 'DAY 02 — EXPLORE & RETURN',
        title: 'Sunrise Viewpoint & Waterfall Dip',
        description: 'Misty sunrise, private waterfall visit, group photo session, and return drive with memories.',
        mealsIncluded: ['Breakfast', 'Local Lunch'],
        accommodation: 'N/A (Departure)',
        highlights: ['Cloud Sunrise', 'Waterfall Dip', 'Farewell Hugs']
      }
    ],
    inclusions: [
      '1 Night cottage accommodation in Kodaikanal',
      'All meals specified in itinerary',
      'Pickup and drop from Madurai / Dindigul',
      'Guided forest walk & campfire session',
      'Trip leader Dharsh / Ananya'
    ],
    exclusions: ['Interstate travel to pickup city', 'Personal shopping'],
    whatToBring: ['Warm jacket for chilly night', 'Walking shoes', 'Water bottle'],
    leader: DEMO_TRIP_LEADERS[0],
    joiningTravelers: [DEMO_TRAVELERS[0], DEMO_TRAVELERS[1], DEMO_TRAVELERS[2], DEMO_TRAVELERS[3]],
    safetyNotes: ['Verified homestays and female solo traveler friendly'],
    ageRestriction: 'NO AGE RESTRICTION',
    featured: true
  },
  {
    id: 'trip-ooty',
    slug: 'ooty-nilgiri-clouds',
    title: 'OOTY & NILGIRIS',
    chapterTitle: 'CHAPTER 02 • TAMIL NADU',
    destination: 'Ooty, Tamil Nadu',
    region: 'Tamil Nadu',
    durationDays: 2,
    durationNights: 1,
    price: 5499,
    originalPrice: 7000,
    currency: '₹',
    category: 'Hill Station',
    tribePersonalityMatch: ['THE SLOW TRAVELLER', 'THE STORYTELLER', 'THE SOCIAL ONE'],
    difficulty: 'Easy',
    totalSpots: 12,
    spotsTaken: 8,
    status: 'FEW_SPOTS_LEFT',
    rating: 4.97,
    reviewsCount: 32,
    heroImage: 'assets/images/destinations/ooty.jpg',
    videoUrl: 'assets/videos/previews/ooty.mp4',
    galleryImages: [
      'assets/images/destinations/ooty.jpg',
      'assets/images/experiences/tea_walk.jpg',
      'assets/images/experiences/evening_campfire.jpg'
    ],
    startDate: '2026-08-28',
    endDate: '2026-08-29',
    meetingPoint: 'Coimbatore Railway Station / Airport at 7:00 AM',
    accommodationType: 'Heritage Tea Bungalow',
    overview: 'Tea estate walks, peak viewpoints, chill Nilgiri weather, and cozy group vibes.',
    itinerary: [
      {
        day: 1,
        dayTitle: 'DAY 01 — TEA TRAILS',
        title: 'Coimbatore to Ooty Scenic Drive',
        description: 'Drive through Nilgiri hills, estate check-in, tea factory tour, and fireside night.',
        mealsIncluded: ['Lunch', 'Dinner'],
        accommodation: 'Heritage Tea Bungalow',
        highlights: ['Tea Tasting', 'Estate Walk', 'Campfire']
      },
      {
        day: 2,
        dayTitle: 'DAY 02 — PEAK VIEWS',
        title: 'Doddabetta View & Return',
        description: 'Morning cloud views, botanical stroll, homemade chocolate stop, and return to Coimbatore.',
        mealsIncluded: ['Breakfast'],
        accommodation: 'N/A',
        highlights: ['Cloud View', 'Chocolate Trail', 'Return Drive']
      }
    ],
    inclusions: ['1 Night stay', 'Meals', 'Transport from Coimbatore', 'Trip Lead'],
    exclusions: ['Travel to Coimbatore'],
    whatToBring: ['Warm clothing', 'Camera'],
    leader: DEMO_TRIP_LEADERS[1],
    joiningTravelers: [DEMO_TRAVELERS[1], DEMO_TRAVELERS[2]],
    safetyNotes: ['First aid & verified rooms'],
    featured: true
  },
  {
    id: 'trip-valparai',
    slug: 'valparai-wild-rainforest',
    title: 'VALPARAI RAINFOREST',
    chapterTitle: 'CHAPTER 03 • TAMIL NADU',
    destination: 'Valparai, Tamil Nadu',
    region: 'Tamil Nadu',
    durationDays: 2,
    durationNights: 1,
    price: 5299,
    originalPrice: 6800,
    currency: '₹',
    category: 'Adventure',
    tribePersonalityMatch: ['THE EXPLORER', 'THE ADVENTURER'],
    difficulty: 'Moderate',
    totalSpots: 10,
    spotsTaken: 6,
    status: 'AVAILABLE',
    rating: 4.96,
    reviewsCount: 24,
    heroImage: 'assets/images/destinations/valparai.jpg',
    videoUrl: 'assets/videos/previews/valparai.mp4',
    galleryImages: [
      'assets/images/destinations/valparai.jpg',
      'assets/images/experiences/private_waterfalls.jpg',
      'assets/images/experiences/forest_trails.jpg'
    ],
    startDate: '2026-09-05',
    endDate: '2026-09-06',
    meetingPoint: 'Pollachi / Coimbatore at 7:00 AM',
    accommodationType: 'Plantation Homestay surrounded by rainforest',
    overview: '40 hairpin bends, secluded waterfalls, tea hills, and pure nature.',
    itinerary: [
      {
        day: 1,
        dayTitle: 'DAY 01 — 40 HAIRPIN BENDS',
        title: 'Scenic Climb & Secluded Waterfall',
        description: 'Exciting 40 hairpin curves, check-in, waterfall dip, and evening games.',
        mealsIncluded: ['Lunch', 'Dinner'],
        accommodation: 'Plantation Homestay',
        highlights: ['40 Hairpins', 'Waterfall Dip', 'Night Social']
      },
      {
        day: 2,
        dayTitle: 'DAY 02 — WILD TEA TRAILS',
        title: 'Tea Estate Walk & Return',
        description: 'Morning misty walk, wildlife spotting, and return to Pollachi.',
        mealsIncluded: ['Breakfast'],
        accommodation: 'N/A',
        highlights: ['Tea Walk', 'Wildlife Spotting', 'Return']
      }
    ],
    inclusions: ['1 Night stay', 'Meals', 'Vehicle from Pollachi', 'Lead'],
    exclusions: ['Personal expenses'],
    whatToBring: ['Rain jacket', 'Trek shoes'],
    leader: DEMO_TRIP_LEADERS[0],
    joiningTravelers: [DEMO_TRAVELERS[0], DEMO_TRAVELERS[3]],
    safetyNotes: ['Experienced hill driver'],
    featured: true
  },
  {
    id: 'trip-kolli-hills',
    slug: 'kolli-hills-70-hairpins',
    title: 'KOLLI HILLS THRILL',
    chapterTitle: 'CHAPTER 04 • TAMIL NADU',
    destination: 'Kolli Hills, Tamil Nadu',
    region: 'Tamil Nadu',
    durationDays: 2,
    durationNights: 1,
    price: 4799,
    originalPrice: 6000,
    currency: '₹',
    category: 'Adventure',
    tribePersonalityMatch: ['THE ADVENTURER', 'THE EXPLORER'],
    difficulty: 'Moderate',
    totalSpots: 12,
    spotsTaken: 5,
    status: 'AVAILABLE',
    rating: 4.95,
    reviewsCount: 19,
    heroImage: 'assets/images/destinations/kolli_hills.jpg',
    videoUrl: 'assets/videos/previews/kolli_hills.mp4',
    galleryImages: [
      'assets/images/destinations/kolli_hills.jpg',
      'assets/images/experiences/private_waterfalls.jpg',
      'assets/images/experiences/evening_campfire.jpg'
    ],
    startDate: '2026-09-12',
    endDate: '2026-09-13',
    meetingPoint: 'Salem / Namakkal at 7:30 AM',
    accommodationType: 'Eco Hill Cottages',
    overview: '70 hairpin bends, massive Agaya Gangai waterfall, and campfire night.',
    itinerary: [
      {
        day: 1,
        dayTitle: 'DAY 01 — 70 HAIRPINS',
        title: 'Mountain Climb & Campfire',
        description: 'Experience 70 thrilling hairpins, check in, viewpoint trek, and night campfire.',
        mealsIncluded: ['Lunch', 'Dinner'],
        accommodation: 'Eco Hill Cottages',
        highlights: ['70 Hairpins', 'Pine Trail', 'Campfire Night']
      },
      {
        day: 2,
        dayTitle: 'DAY 02 — AGAYA GANGAI',
        title: 'Waterfall Trek & Departure',
        description: 'Trek down to Agaya Gangai waterfall, dip, lunch, and return.',
        mealsIncluded: ['Breakfast', 'Lunch'],
        accommodation: 'N/A',
        highlights: ['Waterfall Trek', 'Group Photo', 'Return']
      }
    ],
    inclusions: ['1 Night stay', 'Meals', 'Transport from Salem', 'Guide'],
    exclusions: ['Interstate travel'],
    whatToBring: ['Good shoes for steps', 'Water bottle'],
    leader: DEMO_TRIP_LEADERS[2],
    joiningTravelers: [DEMO_TRAVELERS[1], DEMO_TRAVELERS[3]],
    safetyNotes: ['Guide provided on steps'],
    featured: true
  },
  {
    id: 'trip-meghamalai',
    slug: 'meghamalai-high-waves',
    title: 'MEGHAMALAI CLOUDS',
    chapterTitle: 'CHAPTER 05 • TAMIL NADU',
    destination: 'Meghamalai, Tamil Nadu',
    region: 'Tamil Nadu',
    durationDays: 2,
    durationNights: 1,
    price: 5299,
    originalPrice: 6500,
    currency: '₹',
    category: 'Slow Travel',
    tribePersonalityMatch: ['THE SLOW TRAVELLER', 'THE STORYTELLER'],
    difficulty: 'Easy',
    totalSpots: 10,
    spotsTaken: 4,
    status: 'AVAILABLE',
    rating: 4.94,
    reviewsCount: 16,
    heroImage: 'assets/images/destinations/meghamalai.jpg',
    videoUrl: 'assets/videos/previews/meghamalai.mp4',
    galleryImages: [
      'assets/images/destinations/meghamalai.jpg',
      'assets/images/experiences/cloud_sunrise.jpg',
      'assets/images/experiences/tea_walk.jpg'
    ],
    startDate: '2026-09-19',
    endDate: '2026-09-20',
    meetingPoint: 'Theni / Madurai at 7:00 AM',
    accommodationType: 'Cardamom Estate Cottage',
    overview: 'High wavy cardamom hills, cool clouds, dam viewpoints, and slow mornings.',
    itinerary: [
      {
        day: 1,
        dayTitle: 'DAY 01 — INTO THE CLOUDS',
        title: 'Drive & Cardamom Trail',
        description: 'Theni pickup, drive to Meghamalai, cardamom estate walk, and fireside talk.',
        mealsIncluded: ['Lunch', 'Dinner'],
        accommodation: 'Cardamom Estate Cottage',
        highlights: ['Cloud Views', 'Estate Walk', 'Fireside Social']
      },
      {
        day: 2,
        dayTitle: 'DAY 02 — DAM VIEW',
        title: 'Manalar Dam & Return',
        description: 'Morning viewpoint, Manalar dam photo stop, and return to Theni/Madurai.',
        mealsIncluded: ['Breakfast'],
        accommodation: 'N/A',
        highlights: ['Dam Viewpoint', 'Local Tea', 'Return']
      }
    ],
    inclusions: ['1 Night stay', 'Meals', 'Vehicle from Theni', 'Lead'],
    exclusions: ['Personal expenses'],
    whatToBring: ['Light jacket', 'Sneakers'],
    leader: DEMO_TRIP_LEADERS[0],
    joiningTravelers: [DEMO_TRAVELERS[0], DEMO_TRAVELERS[2]],
    safetyNotes: ['Local forest clearance'],
    featured: true
  }
];

export const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Priya Sharma',
    avatar: 'assets/images/stories/avatar_priya.jpg',
    city: 'Chennai',
    tripName: 'Kodaikanal Escape',
    quote: 'Joined solo without knowing anyone. Left with 10 amazing friends and unforgettable campfire memories!',
    rating: 5,
    date: 'July 2026',
    isDemo: true
  },
  {
    id: 'test-2',
    name: 'Arjun Mehta',
    avatar: 'assets/images/stories/avatar_arjun.jpg',
    city: 'Bengaluru',
    tripName: 'Valparai Rainforest',
    quote: 'No forced commercial itinerary. Genuine small group vibe and insane nature.',
    rating: 5,
    date: 'June 2026',
    isDemo: true
  },
  {
    id: 'test-3',
    name: 'Rahul Roy',
    avatar: 'assets/images/stories/avatar_rahul.jpg',
    city: 'Madurai',
    tripName: 'Kolli Hills Thrill',
    quote: '70 hairpin bends and the best group ever. Highly recommended for solo travellers!',
    rating: 5,
    date: 'May 2026',
    isDemo: true
  }
];

export const DEMO_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: DEMO_TRAVELERS[0],
    destination: 'Kodaikanal, Tamil Nadu',
    tripTitle: 'Kodaikanal Escape',
    createdAt: '2 hours ago',
    content: 'Still thinking about that misty morning pine walk with @beyondstrangers.in! ☕️🌲 Best weekend ever.',
    images: ['assets/images/stories/story_kodaikanal.jpg'],
    likesCount: 38,
    commentsCount: 6,
    userLiked: true,
    comments: [
      {
        id: 'c1',
        authorName: 'Arjun Mehta',
        authorAvatar: DEMO_TRAVELERS[1].avatar,
        text: 'Best weekend! Downloading photos now 📸',
        createdAt: '1 hour ago'
      },
      {
        id: 'c2',
        authorName: 'Dharsh',
        authorAvatar: FOUNDER_DATA.avatar,
        text: 'Welcome to the tribe Priya!',
        createdAt: '30 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    author: DEMO_TRAVELERS[1],
    destination: 'Valparai, Tamil Nadu',
    tripTitle: 'Valparai Rainforest',
    createdAt: 'Yesterday',
    content: '40 hairpin bends and a secluded waterfall dip with 10 strangers who became good friends.',
    images: ['assets/images/stories/story_valparai.jpg'],
    likesCount: 52,
    commentsCount: 4,
    userLiked: false,
    comments: [
      {
        id: 'c3',
        authorName: 'Sneha Kapoor',
        authorAvatar: DEMO_TRAVELERS[2].avatar,
        text: 'Count me in for the next one!',
        createdAt: '18 hours ago'
      }
    ]
  }
];

export const PRISMA_SCHEMA_STRING = `// Prisma Schema for Beyond Strangers
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum TribePersonality {
  THE_ADVENTURER
  THE_EXPLORER
  THE_SOCIAL_ONE
  THE_SLOW_TRAVELLER
  THE_STORYTELLER
}

enum TripStatus {
  AVAILABLE
  FEW_SPOTS_LEFT
  WAITLIST_ONLY
  COMPLETED
}

model User {
  id               String           @id @default(uuid())
  email            String           @unique
  name             String
  avatarUrl        String?
  city             String?
  bio              String?
  tribePersonality TribePersonality?
  instagramHandle  String?
  verified         Boolean          @default(false)
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt

  bookings         Booking[]
  posts            CommunityPost[]
}

model Trip {
  id                     String             @id @default(uuid())
  slug                   String             @unique
  title                  String
  chapterTitle           String
  destination            String
  region                 String
  durationDays           Int
  durationNights         Int
  price                  Float
  totalSpots             Int
  spotsTaken             Int                @default(0)
  status                 TripStatus         @default(AVAILABLE)
  heroImage              String
  startDate              DateTime
  endDate                DateTime
  overview               String

  bookings               Booking[]
}

model Booking {
  id               String   @id @default(uuid())
  bookingReference String   @unique
  userId           String
  tripId           String
  travelerCount    Int      @default(1)
  totalAmount      Float
  status           String   @default("CONFIRMED")
  createdAt        DateTime @default(now())

  user             User     @relation(fields: [userId], references: [id])
  trip             Trip     @relation(fields: [tripId], references: [id])
}

model CommunityPost {
  id          String   @id @default(uuid())
  userId      String
  destination String
  content     String
  imageUrl    String?
  likesCount  Int      @default(0)
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
}
`;

export const DEMO_BOOKINGS: BookingDetails[] = [
  {
    id: 'book-101',
    tripId: 'trip-kodaikanal',
    tripTitle: 'Kodaikanal Escape',
    travelerCount: 1,
    totalAmount: 4999,
    contactName: 'Rohan Deshmukh',
    contactEmail: 'rohan.d@example.com',
    contactPhone: '+91 98765 43210',
    city: 'Chennai',
    tribePersonality: 'THE ADVENTURER',
    roommatePreference: 'Male Roommate',
    specialNotes: 'First solo trip. Excited for pine trails.',
    status: 'CONFIRMED',
    bookingReference: 'BS-KOD-1024',
    bookingDate: '2026-08-10',
    isDemo: true
  },
  {
    id: 'book-102',
    tripId: 'trip-ooty',
    tripTitle: 'Ooty & Nilgiris',
    travelerCount: 2,
    totalAmount: 10998,
    contactName: 'Tanvi Iyer',
    contactEmail: 'tanvi.iyer@example.com',
    contactPhone: '+91 98451 22334',
    city: 'Bengaluru',
    tribePersonality: 'THE SLOW TRAVELLER',
    roommatePreference: 'Female Roommate',
    specialNotes: 'Traveling with sister. Love photography.',
    status: 'CONFIRMED',
    bookingReference: 'BS-OOT-2048',
    bookingDate: '2026-08-12',
    isDemo: true
  },
  {
    id: 'book-103',
    tripId: 'trip-valparai',
    tripTitle: 'Valparai Rainforest',
    travelerCount: 1,
    totalAmount: 5299,
    contactName: 'Karthik Raja',
    contactEmail: 'karthik.r@example.com',
    contactPhone: '+91 99001 88776',
    city: 'Coimbatore',
    tribePersonality: 'THE EXPLORER',
    roommatePreference: 'No Preference',
    specialNotes: 'Ready for 40 hairpins!',
    status: 'PENDING',
    bookingReference: 'BS-VAL-3096',
    bookingDate: '2026-08-13',
    isDemo: true
  }
];

export const VERIFIED_TRIP_LOCATIONS: VerifiedLocation[] = [
  {
    id: 'loc-kodai-pine',
    name: 'Kodaikanal Pine Forest Reserve',
    districtRegion: 'Dindigul, Tamil Nadu',
    latitude: 10.2381,
    longitude: 77.4892,
    verificationStatus: 'LOCATION_VERIFIED',
    notes: 'Safe trail for small groups with forest permit.',
    recommendedSeason: 'Year Round',
    lastVerifiedDate: '2026-08-01',
    verifiedBy: 'Dharsh'
  },
  {
    id: 'loc-ooty-tea',
    name: 'Nilgiri Heritage Estate',
    districtRegion: 'Nilgiris, Tamil Nadu',
    latitude: 11.4102,
    longitude: 76.6950,
    verificationStatus: 'LOCATION_VERIFIED',
    notes: 'Private tea estate walk permit confirmed.',
    recommendedSeason: 'September – May',
    lastVerifiedDate: '2026-08-02',
    verifiedBy: 'Dharsh'
  },
  {
    id: 'loc-valparai-falls',
    name: 'Anamalai Rainforest Trail',
    districtRegion: 'Coimbatore, Tamil Nadu',
    latitude: 10.3256,
    longitude: 76.9558,
    verificationStatus: 'LOCATION_VERIFIED',
    notes: 'Private waterfall access with local host.',
    recommendedSeason: 'August – April',
    lastVerifiedDate: '2026-08-03',
    verifiedBy: 'Dharsh'
  }
];

export const DEMO_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'med-kodai-hero',
    title: 'Kodaikanal Pine Mist',
    url: 'assets/images/destinations/kodaikanal.jpg',
    type: 'image',
    category: 'Destinations',
    size: '1.8 MB',
    createdAt: '2026-08-10',
    assignedSlot: 'hero',
    isDemo: false,
    location: 'Kodaikanal Pine Trail',
    exactLocation: 'Pine Forest, Kodaikanal',
    districtRegion: 'Dindigul, Tamil Nadu',
    lat: 10.2381,
    lng: 77.4892,
    source: 'Beyond Strangers Original',
    usageRights: 'Owned by Beyond Strangers',
    verificationStatus: 'LOCATION_VERIFIED',
    caption: 'Misty pine forest canopy in Kodaikanal.'
  },
  {
    id: 'med-ooty-tea',
    title: 'Nilgiri Tea Slopes',
    url: 'assets/images/destinations/ooty.jpg',
    type: 'image',
    category: 'Destinations',
    size: '2.1 MB',
    createdAt: '2026-08-10',
    assignedSlot: 'experience',
    isDemo: false,
    location: 'Nilgiri Tea Slopes',
    exactLocation: 'Ooty Estate',
    districtRegion: 'Nilgiris, Tamil Nadu',
    lat: 11.4102,
    lng: 76.6950,
    source: 'Beyond Strangers Original',
    usageRights: 'Owned by Beyond Strangers',
    verificationStatus: 'LOCATION_VERIFIED',
    caption: 'Emerald tea terraces in Ooty.'
  },
  {
    id: 'med-valparai-waterfall',
    title: 'Valparai Waterfall Dip',
    url: 'assets/images/experiences/private_waterfalls.jpg',
    type: 'image',
    category: 'Destinations',
    size: '1.9 MB',
    createdAt: '2026-08-10',
    assignedSlot: 'experience',
    isDemo: false,
    location: 'Valparai Cascades',
    exactLocation: 'Valparai Rainforest',
    districtRegion: 'Coimbatore, Tamil Nadu',
    lat: 10.3256,
    lng: 76.9558,
    source: 'Beyond Strangers Original',
    usageRights: 'Owned by Beyond Strangers',
    verificationStatus: 'LOCATION_VERIFIED',
    caption: 'Private natural cascade in Valparai.'
  },
  {
    id: 'med-campfire',
    title: 'Campfire Social Circle',
    url: 'assets/images/experiences/evening_campfire.jpg',
    type: 'image',
    category: 'Campfire',
    size: '1.5 MB',
    createdAt: '2026-08-10',
    assignedSlot: 'community',
    isDemo: false,
    location: 'Estate Campfire Area',
    exactLocation: 'Basecamp Fireside',
    districtRegion: 'Tamil Nadu',
    lat: 10.2381,
    lng: 77.4892,
    source: 'Beyond Strangers Original',
    usageRights: 'Owned by Beyond Strangers',
    verificationStatus: 'LOCATION_VERIFIED',
    caption: 'Evening campfire circle with solo travellers.'
  }
];

export const DEMO_MEDIA_LIBRARY: MediaItem[] = DEMO_MEDIA_ITEMS;

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'Beyond Strangers',
  tagline: 'Where strangers find their tribe.',
  subTagline: 'Curated weekend trips across Tamil Nadu & South India for solo travellers.',
  announcement: '🌿 Weekend Chapters open across Tamil Nadu! Group capacity capped at 12 travellers.',
  founderName: 'Dharsh',
  founderRole: 'Founder, Beyond Strangers',
  founderBio: [
    "Beyond Strangers curates small-group weekend escapes across Tamil Nadu for solo travellers.",
    "Join solo. Leave with friends. Real campfires, nature trails, and authentic connections."
  ],
  founderImage: 'assets/images/stories/avatar_dharsh.jpg',
  instagramHandle: '@dharsh_here__',
  contactEmail: 'tribe@beyondstrangers.in',
  whatsappNumber: '+91 94812 00420',
  cancellationSummary: '100% refund up to 7 days before journey. Free date reschedule.'
};

export const INITIAL_SITE_SETTINGS = DEFAULT_SITE_SETTINGS;

export const DEMO_ADMIN_USER: AdminUser = {
  id: 'admin-1',
  email: 'dharsh@beyondstrangers.in',
  name: 'Dharsh (Founder & Admin)',
  role: 'ADMIN',
  token: 'mock-jwt-strangers-admin-token-2026'
};
