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
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  storyHeading: 'Bringing people together through curated travel experiences across India.',
  storyText: [
    "Beyond Strangers was born from a simple belief: the best travel moments happen when curious people meet in wild places. We design small-group escapes across India for people who want to explore more, travel thoughtfully, and form genuine connections.",
    "You arrive with your own curiosity, and you leave with real stories and lifelong friendships. There are no corporate scripts or tourist clichés—just authentic experiences led with care.",
    "Follow the journey and reach out directly anytime on Instagram: @dharsh_here__"
  ]
};

export const DEMO_TRIP_LEADERS: TripLeader[] = [
  {
    id: 'leader-1',
    name: 'Dharsh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    title: 'Founder & Chief Experience Lead',
    experienceYears: 5,
    tripsHosted: 42,
    rating: 4.98,
    about: 'Founder of Beyond Strangers. Passionate about curating high-trust, soul-replenishing group journeys across hidden trails in South & North East India.',
    languages: ['English', 'Hindi', 'Tamil', 'Kannada'],
    specialty: 'Community Building, Campfire Stories & Trail Navigation',
    isDemo: false
  },
  {
    id: 'leader-2',
    name: 'Ananya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    title: 'Coastal & Forest Host',
    experienceYears: 4,
    tripsHosted: 28,
    rating: 4.92,
    about: 'Specializes in slow travel, beach sunsets, and estate walks. Ananya ensures every traveler feels immediately welcomed and included.',
    languages: ['English', 'Hindi', 'Marathi'],
    specialty: 'Beach Camping & Community Ice-breakers',
    isDemo: true
  },
  {
    id: 'leader-3',
    name: 'Aakash Verma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    title: 'Himalayan Expedition Lead',
    experienceYears: 6,
    tripsHosted: 36,
    rating: 4.95,
    about: 'Wilderness First Responder and mountain enthusiast. Led high-altitude treks across Meghalaya, Himachal, and Sikkim.',
    languages: ['English', 'Hindi', 'Bengali'],
    specialty: 'High Altitude Treks & Landscape Photography',
    isDemo: true
  }
];

export const DEMO_TRAVELERS: TravelerProfile[] = [
  {
    id: 'traveler-1',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    city: 'Mumbai',
    occupation: 'Brand Designer',
    bio: 'Showed up solo in Munnar without knowing a single soul. Left with 11 best friends and 5,000 photos!',
    tribePersonality: 'THE STORYTELLER',
    interests: ['📸 Photography', '🏕 Adventure', '🍜 Food'],
    travelStyle: ['Slow Travel', 'Social'],
    journeysJoinedCount: 3,
    badges: ['Founder Approved', 'Photo Maestro', 'Campfire Singer'],
    isDemo: true,
    instagramHandle: '@priya.travels',
    favoriteQuote: 'The best stories begin with strangers.',
    verifiedTraits: ['Govt ID Verified (Demo)', 'Community Vetted', 'Mobile Verified']
  },
  {
    id: 'traveler-2',
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    city: 'Bengaluru',
    occupation: 'Software Developer',
    bio: 'Techie who loves escaping city noise for misty mountain mornings and late night stargazing.',
    tribePersonality: 'THE ADVENTURER',
    interests: ['🏔 Mountains', '🌿 Nature', '🏕 Adventure'],
    travelStyle: ['High Energy', 'Backpacking'],
    journeysJoinedCount: 4,
    badges: ['Trail Firestarter', 'Early Bird Trekker'],
    isDemo: true,
    instagramHandle: '@arjun.outdoors',
    favoriteQuote: 'Keep walking till the clouds touch the earth.',
    verifiedTraits: ['Govt ID Verified (Demo)', 'Mobile Verified']
  },
  {
    id: 'traveler-3',
    name: 'Sneha Kapoor',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    city: 'Pune',
    occupation: 'Architect',
    bio: 'Sunset chaser, coffee snob, and slow traveler. Always down for spontaneous road trips!',
    tribePersonality: 'THE SLOW TRAVELLER',
    interests: ['🏖 Beaches', '🎵 Music', '🌿 Nature'],
    travelStyle: ['Chill Vibes', 'Boutique Stays'],
    journeysJoinedCount: 2,
    badges: ['Sunset Curator', 'Coffee Connoisseur'],
    isDemo: true,
    instagramHandle: '@sneha.sketches',
    favoriteQuote: 'Collect moments, not things.',
    verifiedTraits: ['Govt ID Verified (Demo)']
  },
  {
    id: 'traveler-4',
    name: 'Rahul Roy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    city: 'Delhi NCR',
    occupation: 'Product Manager',
    bio: 'Believer in small group magic. Joined Coorg on a whim and now we have an active group chat every week!',
    tribePersonality: 'THE SOCIAL ONE',
    interests: ['🎵 Music', '🍜 Food', '🏕 Adventure'],
    travelStyle: ['Social', 'Backpacking'],
    journeysJoinedCount: 3,
    badges: ['Group Connector', 'Snack Captain'],
    isDemo: true,
    instagramHandle: '@rahul.roams',
    favoriteQuote: 'Strangers are friends you haven’t met yet.',
    verifiedTraits: ['Govt ID Verified (Demo)', 'Mobile Verified']
  }
];

export const DEMO_DESTINATIONS: Destination[] = [
  {
    id: 'dest-gavi-thekkady',
    slug: 'gavi-thekkady',
    name: 'Gavi / Thekkady',
    subtitle: 'Wild Forests, Waterfalls & Boating',
    stateCountry: 'Kerala, India',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fog-over-tea-plantations-in-munnar-43343-large.mp4',
    shortDescription: 'Dense tropical forests, tranquil boating waters, private waterfalls, misty mountain roads, and rich cultural traditions.',
    fullStory: 'Deep in the Western Ghats of Kerala, Gavi and Thekkady encompass protected wildlife sanctuaries, mist-draped evergreen canopies, calm reservoir waters, and secluded natural cascades. An untouched sanctuary built for travelers seeking genuine immersion in nature, outdoor adventure, and shared campfire moments under starlit skies.',
    region: 'South India',
    activeTripsCount: 1,
    highlights: ['Forest Boating', 'Private Waterfalls', 'Misty Forest Roads', 'Wildlife & Birds', 'Cultural Performance', 'Campfire Circle'],
    bestSeason: 'August – March',
    altitude: '1,000m – 1,200m',
    featured: true
  },
  {
    id: 'dest-munnar',
    slug: 'munnar',
    name: 'Munnar',
    subtitle: 'Misty Mountains & High Altitude Estates',
    stateCountry: 'Kerala, India',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fog-over-tea-plantations-in-munnar-43343-large.mp4',
    shortDescription: 'Rolling emerald tea hills, estate walks, sunrise clouds, and late-night campfire conversations.',
    fullStory: 'Perched high in the Western Ghats at 1,600 meters, Munnar is a sanctuary where silence is filled only by the whisper of tea pluckers and the rush of hidden mountain streams. Our chapter in Munnar avoids tourist traps and takes travelers deep into secret heritage tea bungalows, pre-dawn 4x4 Jeep rides to Kolukkumalai (the world’s highest organic tea estate), and twilight acoustic sessions around warm crackling campfires.',
    region: 'South India',
    activeTripsCount: 1,
    highlights: ['Kolukkumalai Sunrise', 'Tea Estate Walks', 'Campfires', 'Hidden Waterfalls'],
    bestSeason: 'September – March',
    altitude: '1,600m (5,200 ft)',
    featured: true
  },
  {
    id: 'dest-coorg',
    slug: 'coorg',
    name: 'Coorg',
    subtitle: 'Coffee, Forests & Slow Mornings',
    stateCountry: 'Karnataka, India',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Lush coffee plantations, estate homestays, waterfall treks, and cozy evening socials.',
    fullStory: 'Known historically as Kodagu, this verdant district in Karnataka is where towering silver oak trees cradle lush coffee bushes and wild pepper vines. Travelers stay at an organic off-grid estate where the host family serves traditional pandi curry and akki rotis over shared courtyard tables. We hike along riverbeds, swim under cold natural cascades, and slow down time together.',
    region: 'South India',
    activeTripsCount: 1,
    highlights: ['Coffee Tasting', 'Rainforest Trails', 'Acoustic Jam Sessions', 'Local Feasts'],
    bestSeason: 'October – April',
    altitude: '1,150m (3,770 ft)',
    featured: true
  },
  {
    id: 'dest-meghalaya',
    slug: 'meghalaya',
    name: 'Meghalaya',
    subtitle: 'Abode of Clouds & Living Roots',
    stateCountry: 'Meghalaya, India',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Living root bridges, crystal clear rivers, limestone caves, and cloud-draped road trips.',
    fullStory: 'Meghalaya is unlike anywhere else on earth. Here, centuries-old Khasi tribal elders guide living tree roots across roaring monsoon rivers to form bio-engineered suspension bridges. Our expedition takes 12 adventurers down the 3,500 stone steps to Nongriat, cliff-jumps into turquoise canyon pools at Wei Sawdong, and sleeps in cozy bamboo homestays under thousands of mountain stars.',
    region: 'North East',
    activeTripsCount: 1,
    highlights: ['Nongriat 3000 Steps', 'Dawki Boat Ride', 'Jungle Swimming', 'Khasi Culture'],
    bestSeason: 'October – May',
    altitude: '1,400m (4,600 ft)',
    featured: true
  },
  {
    id: 'dest-goa',
    slug: 'goa',
    name: 'Goa',
    subtitle: 'Beaches, Sunsets & New Faces',
    stateCountry: 'Goa, India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Secret beach coves, Fontainhas heritage photowalks, mangrove kayaking, and poolside sunset vibes.',
    fullStory: 'Experience the Goa that artists, poets, and local surfers cherish. Stay in a restored 19th-century Portuguese villa nestled in lush coconut groves. Spend sunny mornings paddling through quiet mangrove channels, exploring pastel-washed Fontainhas alleys with vintage cameras, and enjoying sunset seafood feasts on cliffs overlooking the Arabian Sea.',
    region: 'West India',
    activeTripsCount: 1,
    highlights: ['Heritage Villa Pool', 'Fontainhas Walk', 'Sunset Kayaking', 'Secluded Cove Swim'],
    bestSeason: 'November – April',
    altitude: 'Sea Level',
    featured: true
  },
  {
    id: 'dest-spiti',
    slug: 'spiti-valley',
    name: 'Spiti Valley',
    subtitle: 'High Altitude Himalayan Circuit',
    stateCountry: 'Himachal Pradesh, India',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Ancient monasteries, cold desert mountain passes, Hikkim post office, and Chandra Taal camping.',
    fullStory: 'Spiti — meaning "The Middle Land" between India and Tibet — is a raw, awe-inspiring mountain desert. Rugged gorges, snow-dusted peaks, and serene monasteries perched on sheer cliff edges. Travelers camp beside the sapphire waters of Chandra Taal and send postcards home from the highest post office on earth in Hikkim.',
    region: 'North India & Himalayas',
    activeTripsCount: 0,
    highlights: ['Key Monastery', 'Hikkim Post Office', 'Chandra Taal Stargazing'],
    bestSeason: 'June – October',
    altitude: '3,800m – 4,500m',
    comingSoon: true
  },
  {
    id: 'dest-hampi',
    slug: 'hampi',
    name: 'Hampi',
    subtitle: 'Boulder Hills & Ancient Ruins',
    stateCountry: 'Karnataka, India',
    image: 'https://images.unsplash.com/photo-1600100397608-f010e42e4763?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Surreal monolithic boulders, coracle river rides, and sunset jam sessions on Matanga hill.',
    fullStory: 'Step into a landscape of giant granite boulders balanced in gravity-defying formations. Rent bicycles to explore centuries-old Vijayanagara ruins and hike up Matanga Hill for 360-degree sunset panoramas with fellow backpackers.',
    region: 'South India',
    activeTripsCount: 0,
    highlights: ['Matanga Hill Sunset', 'Coracle Boat Ride', 'Bicycle Temple Trails'],
    bestSeason: 'October – March',
    altitude: '467m',
    comingSoon: true
  },
  {
    id: 'dest-wayanad',
    slug: 'wayanad',
    name: 'Wayanad',
    subtitle: 'Wild Rainforest Sanctuary',
    stateCountry: 'Kerala, India',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Mist-clad bamboo forests, treehouse stays, Edakkal caves, and wild lake bamboo rafting.',
    fullStory: 'Nestled on Kerala’s high border, Wayanad is an emerald realm of wild bamboo forests, cascading waterfalls, and ancient Neolithic rock carvings at Edakkal Caves.',
    region: 'South India',
    activeTripsCount: 0,
    highlights: ['Treehouse Stay', 'Edakkal Caves', 'Bamboo Rafting'],
    bestSeason: 'September – May',
    altitude: '900m – 2,100m',
    comingSoon: true
  }
];

export const DEMO_TRIPS: Trip[] = [
  {
    id: 'trip-gavi-thekkady',
    slug: 'gavi-thekkady-strangers-trip',
    title: 'GAVI / THEKKADY',
    chapterTitle: 'A Strangers Trip',
    destination: 'Gavi / Thekkady, Kerala',
    region: 'South India',
    durationDays: 3,
    durationNights: 2,
    price: 9999,
    originalPrice: 12500,
    currency: '₹',
    category: 'Adventure',
    tribePersonalityMatch: ['THE ADVENTURER', 'THE EXPLORER', 'THE STORYTELLER', 'THE SOCIAL ONE', 'THE SLOW TRAVELLER'],
    difficulty: 'Moderate',
    totalSpots: 12,
    spotsTaken: 7,
    status: 'AVAILABLE',
    rating: 4.99,
    reviewsCount: 28,
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    featuredVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    startDate: '2026-08-21',
    endDate: '2026-08-23',
    meetingPoint: 'DETAILS COMING SOON',
    accommodationType: 'DETAILS COMING SOON',
    overview: 'A journey into the forests and landscapes around Gavi and Thekkady, built around nature, adventure, exploration and meeting new people. Experience serene forest boating, private waterfalls, misty mountain roads, wildlife and birds, rich cultural moments, and starlit campfire nights.',
    itinerary: [
      {
        day: 1,
        dayTitle: 'DAY 01 — 21 AUGUST',
        title: 'ARRIVAL & BEGIN THE JOURNEY',
        description: 'DETAILS COMING SOON',
        mealsIncluded: ['DETAILS COMING SOON'],
        accommodation: 'DETAILS COMING SOON',
        highlights: ['Scenic Forest Drive', 'First Cohort Meetup', 'Campfire Gathering']
      },
      {
        day: 2,
        dayTitle: 'DAY 02 — 22 AUGUST',
        title: 'EXPLORE GAVI / THEKKADY',
        description: 'DETAILS COMING SOON',
        mealsIncluded: ['DETAILS COMING SOON'],
        accommodation: 'DETAILS COMING SOON',
        highlights: ['Forest Boating', 'Private Waterfalls & Water Activities', 'Wildlife & Bird Watching', 'Cultural Experience']
      },
      {
        day: 3,
        dayTitle: 'DAY 03 — 23 AUGUST',
        title: 'THE FINAL CHAPTER',
        description: 'DETAILS COMING SOON',
        mealsIncluded: ['DETAILS COMING SOON'],
        accommodation: 'DETAILS COMING SOON',
        highlights: ['Misty Morning Walk', 'Final Reflections', 'Departure with Lifelong Friends']
      }
    ],
    inclusions: [
      'DETAILS COMING SOON'
    ],
    exclusions: [
      'DETAILS COMING SOON'
    ],
    whatToBring: [
      'Comfortable walking shoes & quick-dry clothing',
      'Rain jacket / light warm layer for misty weather',
      'Personal water bottle & essentials',
      'An open mind for genuine human connections'
    ],
    leader: DEMO_TRIP_LEADERS[0],
    joiningTravelers: [DEMO_TRAVELERS[0], DEMO_TRAVELERS[1], DEMO_TRAVELERS[2], DEMO_TRAVELERS[3]],
    safetyNotes: [
      'Experienced trip captains accompany the cohort throughout the journey',
      'Verified local forest clearances and boating safety equipment provided',
      'Strict community standards preserving safety and comfort for solo female travelers'
    ],
    ageRestriction: 'NO AGE RESTRICTION',
    featured: true
  },
  {
    id: 'trip-munnar',
    slug: 'munnar-the-first-chapter',
    title: 'MUNNAR',
    chapterTitle: 'The First Chapter',
    destination: 'Munnar, Kerala',
    region: 'South India',
    durationDays: 4,
    durationNights: 3,
    price: 8999,
    originalPrice: 11500,
    currency: '₹',
    category: 'Adventure',
    tribePersonalityMatch: ['THE ADVENTURER', 'THE STORYTELLER', 'THE SOCIAL ONE'],
    difficulty: 'Moderate',
    totalSpots: 12,
    spotsTaken: 8,
    status: 'FEW_SPOTS_LEFT',
    rating: 4.98,
    reviewsCount: 34,
    heroImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    startDate: '2026-09-18',
    endDate: '2026-09-21',
    meetingPoint: 'Kochi Airport (COK) / Ernakulam Railway Station at 8:00 AM',
    accommodationType: 'Private Estate Homestay & Hilltop Eco-Cottages',
    overview: 'This is where Beyond Strangers began. Walk through private high-altitude tea plantations, jeep-safari to Kolukkumalai (the highest tea estate in the world), swim in hidden mountain pools, and spend your evenings around a roaring campfire sharing real stories.',
    itinerary: [
      {
        day: 1,
        dayTitle: 'DAY 01 — ARRIVE',
        title: 'Arrival in Kochi & Scenic Drive into the Tea Hills',
        description: 'Meet your trip leader Dharsh and fellow travelers at Kochi. We embark on a scenic drive stopping at Cheeyappara waterfalls for ice-breaker drinks. Check in to our estate homestay, surrounded by rolling tea bushes.',
        mealsIncluded: ['Welcome Lunch', 'Estate Dinner'],
        accommodation: 'Hilltop Tea Estate Homestay (Twin/Triple Sharing)',
        highlights: ['Group Introductions', 'Cheeyappara Waterfall Stop', 'Tea Tasting & Sunset']
      },
      {
        day: 2,
        dayTitle: 'DAY 02 — EXPLORE',
        title: 'Kolukkumalai Cloud Sunrise & Tea Factory Journey',
        description: 'Pre-dawn 4x4 Jeep drive to Kolukkumalai peak for a breathtaking sunrise above the clouds. Tour an orthodox 100-year-old tea factory, taste fresh brews, and hike back along secret estate trails.',
        mealsIncluded: ['Breakfast', 'Traditional Kerala Lunch'],
        accommodation: 'Hilltop Tea Estate Homestay',
        highlights: ['4x4 Jeep Safari', 'Cloud Ocean Sunrise', 'Orthodox Tea Factory']
      },
      {
        day: 3,
        dayTitle: 'DAY 03 — CONNECT',
        title: 'Waterfall Trail Dip & Campfire Acoustic Night',
        description: 'A guided trek down to Lakkam waterfall for a refreshing swim in natural mountain streams. In the evening, gather around a crackling bonfire for live acoustic music, team games, and local feast.',
        mealsIncluded: ['Breakfast', 'Campfire Barbecue Feast'],
        accommodation: 'Hilltop Tea Estate Homestay',
        highlights: ['Natural Pool Swim', 'Waterfall Trail Hike', 'Campfire Stories & Acoustic Jam']
      },
      {
        day: 4,
        dayTitle: 'DAY 04 — RETURN',
        title: 'Mattupetty Lake Kayaking & Farewell Drive to Kochi',
        description: 'Gentle morning kayaking session across Mattupetty lake, souvenir stop in Munnar town, and return drive to Kochi by 5:00 PM with lifelong memories.',
        mealsIncluded: ['Breakfast'],
        accommodation: 'N/A (Departure)',
        highlights: ['Lake Kayaking', 'Souvenir Market', 'Departure Hugs']
      }
    ],
    inclusions: [
      '3 Nights accommodation in private estate homestay',
      'All breakfasts, 2 lunches, and 2 dinners specified',
      'Round-trip private vehicle transfer from Kochi',
      '4x4 Jeep Safari to Kolukkumalai Sunrise Point',
      'Trip leader charges & local tea estate guide fees',
      'Kayaking equipment and permits'
    ],
    exclusions: [
      'Travel expenses from your hometown to Kochi',
      'Personal snacks, beverages, and extra personal items',
      'Medical or personal insurance'
    ],
    whatToBring: [
      'Warm fleece jacket for chilly mornings',
      'Quick-dry footwear for waterfall trails',
      'Reusable water bottle',
      'Camera & power bank'
    ],
    leader: DEMO_TRIP_LEADERS[0],
    joiningTravelers: [DEMO_TRAVELERS[0], DEMO_TRAVELERS[1], DEMO_TRAVELERS[2], DEMO_TRAVELERS[3]],
    safetyNotes: [
      'Private WhatsApp group created 5 days prior for co-traveler coordination',
      'Trip leader trained in First Aid and wilderness navigation',
      'Female solo travelers matched with verified female roommates'
    ],
    featured: true
  },
  {
    id: 'trip-coorg',
    slug: 'coorg-into-the-wild',
    title: 'COORG',
    chapterTitle: 'Into the Wild',
    destination: 'Coorg, Karnataka',
    region: 'South India',
    durationDays: 3,
    durationNights: 2,
    price: 7499,
    originalPrice: 9500,
    currency: '₹',
    category: 'Slow Travel',
    tribePersonalityMatch: ['THE SLOW TRAVELLER', 'THE EXPLORER', 'THE SOCIAL ONE'],
    difficulty: 'Easy',
    totalSpots: 12,
    spotsTaken: 7,
    status: 'AVAILABLE',
    rating: 4.95,
    reviewsCount: 22,
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80'
    ],
    startDate: '2026-10-02',
    endDate: '2026-10-04',
    meetingPoint: 'Mysuru Station / Airport or Bengaluru Pickup Hub at 7:00 AM',
    accommodationType: 'Coffee Plantation Heritage Homestay surrounded by canopy',
    overview: 'Slow down and immerse yourself in the fragrant coffee estates of Coorg. Walk through lush spice gardens, swim beneath Abbey waterfalls, sip freshly roasted Arabica, and share quiet, meaningful conversations under starry skies.',
    itinerary: [
      {
        day: 1,
        dayTitle: 'DAY 01 — ARRIVE',
        title: 'Arrival at the Coffee Plantation & Welcome Brew',
        description: 'Meet at Mysuru/Bengaluru pickup point. Drive through bamboo groves to our heritage coffee homestay. Enjoy a freshly roasted Coorg coffee brew, homestay lunch, and evening campfire introductions.',
        mealsIncluded: ['Welcome Lunch', 'Homestay Dinner'],
        accommodation: 'Plantation Heritage Homestay',
        highlights: ['Fresh Coffee Welcome', 'Estate Walk', 'Campfire Ice-breaker']
      },
      {
        day: 2,
        dayTitle: 'DAY 02 — EXPLORE',
        title: 'Waterfall Trail & Sunset Viewpoint Hike',
        description: 'Guided trail walk through dense coffee shade trees, dip at a secluded waterfall, local Kodava lunch, and hike to Mandalpatti peak for panoramic sunset views.',
        mealsIncluded: ['Breakfast', 'Kodava Specialty Lunch'],
        accommodation: 'Plantation Heritage Homestay',
        highlights: ['Mandalpatti Peak Hike', 'Secluded Waterfall Dip', 'Kodava Feast']
      },
      {
        day: 3,
        dayTitle: 'DAY 03 — CONNECT',
        title: 'Slow Morning Coffee Workshop & Return',
        description: 'Hands-on coffee bean picking and brewing workshop with the homestay host, souvenir coffee purchase, and return drive by 6:00 PM.',
        mealsIncluded: ['Breakfast', 'Farwell Coffee'],
        accommodation: 'N/A (Departure)',
        highlights: ['Coffee Cupping Workshop', 'Contact Swaps', 'Return Drive']
      }
    ],
    inclusions: [
      '2 Nights stay in plantation heritage homestay',
      'All meals specified in itinerary',
      'Pickup & drop transport from Mysuru/Bengaluru',
      'Mandalpatti peak jeep trail',
      'Coffee brewing workshop and guide fees'
    ],
    exclusions: ['Interstate travel to pickup city', 'Personal shopping'],
    whatToBring: ['Light jacket', 'Walking shoes', 'Personal mug or flask'],
    leader: DEMO_TRIP_LEADERS[1],
    joiningTravelers: [DEMO_TRAVELERS[2], DEMO_TRAVELERS[3]],
    safetyNotes: ['First aid provided on trails', 'Verified host family accommodation'],
    featured: true
  },
  {
    id: 'trip-meghalaya',
    slug: 'meghalaya-beyond-the-clouds',
    title: 'MEGHALAYA',
    chapterTitle: 'Beyond the Clouds',
    destination: 'Cherrapunji & Dawki, Meghalaya',
    region: 'North East',
    durationDays: 6,
    durationNights: 5,
    price: 14999,
    originalPrice: 18000,
    currency: '₹',
    category: 'Backpacking',
    tribePersonalityMatch: ['THE EXPLORER', 'THE ADVENTURER', 'THE STORYTELLER'],
    difficulty: 'Challenging',
    totalSpots: 10,
    spotsTaken: 6,
    status: 'FEW_SPOTS_LEFT',
    rating: 4.99,
    reviewsCount: 41,
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80'
    ],
    startDate: '2026-10-14',
    endDate: '2026-10-19',
    meetingPoint: 'Guwahati Airport (GAU) / Guwahati Railway Station at 10:00 AM',
    accommodationType: 'Khasi Village Homestays, Jungle Lodge & Riverside Tents',
    overview: 'Journey to the Abode of Clouds! Descend 3,000 steps into the jungle to cross the Double Decker Living Root Bridge, row wooden boats across the glass-clear waters of Dawki river, cliff-jump into blue lagoons, and experience authentic Khasi warmth.',
    itinerary: [
      {
        day: 1,
        dayTitle: 'DAY 01 — ARRIVE',
        title: 'Guwahati to Shillong "Scotland of the East"',
        description: 'Pickup from Guwahati, stop at scenic Umiam Lake, check in to Shillong homestay. Evening rock music cafe visit and Khasi dinner.',
        mealsIncluded: ['Dinner'],
        accommodation: 'Shillong Heritage Homestay',
        highlights: ['Umiam Lake View', 'Shillong Music Scene', 'Khasi Dinner']
      },
      {
        day: 2,
        dayTitle: 'DAY 02 — EXPLORE',
        title: 'Waterfalls & Arwah Limestone Cave',
        description: 'Drive to Sohra (Cherrapunji), visit Nohkalikai Falls (India’s highest plunge waterfall), explore ancient fossil caves, and reach Tyrna village.',
        mealsIncluded: ['Breakfast', 'Dinner'],
        accommodation: 'Sohra Eco Lodge',
        highlights: ['Nohkalikai Waterfall', 'Arwah Cave Fossils', 'Mawsmai Valley']
      },
      {
        day: 3,
        dayTitle: 'DAY 03 — CONNECT',
        title: 'Nongriat Living Root Bridge Trek & Rainbow Falls',
        description: 'Trek down 3,000 jungle steps into Nongriat valley. Marvel at centuries-old natural root bridges, hike further to turquoise Rainbow Falls for a swim, and stay overnight in the jungle village.',
        mealsIncluded: ['Breakfast', 'Jungle Lunch', 'Dinner'],
        accommodation: 'Nongriat Village Eco Lodge',
        highlights: ['Double Decker Bridge', '3,000 Steps Trail', 'Rainbow Falls Swim']
      },
      {
        day: 4,
        dayTitle: 'DAY 04 — EXPLORE',
        title: 'Dawki Crystal River & Riverside Camping',
        description: 'Ascend Tyrna base, drive to Dawki border town. Ride a wooden boat on the glass-like Umngot River where boats float in mid-air. Riverside bonfire & stargazing.',
        mealsIncluded: ['Breakfast', 'Campfire Dinner'],
        accommodation: 'Dawki Riverside Tents',
        highlights: ['Umngot River Boat Ride', 'Cliff Jumping', 'Riverside Camping']
      },
      {
        day: 5,
        dayTitle: 'DAY 05 — BELONG',
        title: 'Mawlynnong Village & Return to Shillong',
        description: 'Visit Mawlynnong (Asia’s cleanest village), bamboo skywalk, drive back to Shillong for a special farewell community celebration.',
        mealsIncluded: ['Breakfast', 'Farewell Feast'],
        accommodation: 'Shillong Heritage Homestay',
        highlights: ['Mawlynnong Village Walk', 'Bamboo Skywalk', 'Group Memories Night']
      },
      {
        day: 6,
        dayTitle: 'DAY 06 — RETURN',
        title: 'Return Drive to Guwahati Airport',
        description: 'Souvenir shopping, drop at Guwahati airport by 2:00 PM.',
        mealsIncluded: ['Breakfast'],
        accommodation: 'N/A (Departure)',
        highlights: ['Souvenir Market', 'Departure']
      }
    ],
    inclusions: [
      '5 Nights accommodation (Homestays, Jungle Lodge, Tents)',
      'All breakfasts and dinners included',
      'Private Tempo Traveller for entire circuit from Guwahati',
      'Local Khasi guides for Nongriat trek & cave entries',
      'Dawki boat ride & entry permits',
      'Trip leader Dharsh / Aakash Verma'
    ],
    exclusions: ['Travel to Guwahati from your hometown', 'Personal shopping'],
    whatToBring: ['Good trekking shoes', 'Quick dry clothes', 'Headlamp / torch'],
    leader: DEMO_TRIP_LEADERS[2],
    joiningTravelers: [DEMO_TRAVELERS[0], DEMO_TRAVELERS[1], DEMO_TRAVELERS[3]],
    safetyNotes: ['High physical fitness required for 3,000 steps trek', 'Life jackets provided'],
    featured: true
  },
  {
    id: 'trip-goa',
    slug: 'goa-the-weekend-escape',
    title: 'GOA',
    chapterTitle: 'The Weekend Escape',
    destination: 'Goa, India',
    region: 'West India',
    durationDays: 3,
    durationNights: 2,
    price: 7999,
    originalPrice: 9999,
    currency: '₹',
    category: 'Beach',
    tribePersonalityMatch: ['THE SOCIAL ONE', 'THE STORYTELLER', 'THE EXPLORER'],
    difficulty: 'Easy',
    totalSpots: 14,
    spotsTaken: 10,
    status: 'AVAILABLE',
    rating: 4.89,
    reviewsCount: 38,
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    startDate: '2026-10-23',
    endDate: '2026-10-25',
    meetingPoint: 'Mopa Airport (GOX) / Dabolim Airport (GOI) / Thivim Station at 11:00 AM',
    accommodationType: 'Boutique Heritage Villa in Anjuna with Private Pool',
    overview: 'Ditch the generic tourist traps and experience Goa like a local insider. Join 14 friendly travelers for a weekend filled with Fontainhas Latin Quarter photowalks, secret beach hopping, sunset mangrove kayaking, and poolside acoustic jams.',
    itinerary: [
      {
        day: 1,
        dayTitle: 'DAY 01 — ARRIVE',
        title: 'Welcome to North Goa & Poolside Social',
        description: 'Check in to our heritage Portuguese villa in Anjuna. Jump into the pool, enjoy an authentic Goan fish curry / veg lunch, followed by sunset drinks at Vagator cliff.',
        mealsIncluded: ['Welcome Lunch', 'Sunset Drinks'],
        accommodation: 'Boutique Villa Anjuna',
        highlights: ['Villa Poolside Welcome', 'Ice-breaker Social', 'Vagator Sunset']
      },
      {
        day: 2,
        dayTitle: 'DAY 02 — EXPLORE',
        title: 'Fontainhas Photowalk & Mangrove Kayaking',
        description: 'Morning walk through pastel streets of Fontainhas Latin Quarter. Afternoon paddle boarding and kayaking through quiet interior backwaters.',
        mealsIncluded: ['Breakfast', 'Goan Thali Lunch'],
        accommodation: 'Boutique Villa Anjuna',
        highlights: ['Fontainhas Photowalk', 'Backwater Kayaking', 'Beachside Bonfire']
      },
      {
        day: 3,
        dayTitle: 'DAY 03 — BELONG',
        title: 'Secret Cove Swim & Farewell Ocean Brunch',
        description: 'Early morning dip at a secluded beach cove, relaxing brunch at an ocean-view cafe, and departure transfers by 3:00 PM.',
        mealsIncluded: ['Breakfast', 'Oceanview Brunch'],
        accommodation: 'N/A (Departure)',
        highlights: ['Secluded Cove Swim', 'Oceanview Brunch', 'Farewell Hugs']
      }
    ],
    inclusions: [
      '2 Nights stay at boutique pool villa',
      'All breakfasts, 2 lunches, and sunset drinks',
      'Airport/Station pickup & local transfers',
      'Fontainhas photowalk & backwater kayaking gear',
      'Trip leader Ananya Deshmukh'
    ],
    exclusions: ['Flight or train tickets to Goa', 'Personal night out expenses'],
    whatToBring: ['Swimwear', 'Sunscreen', 'Sunglasses'],
    leader: DEMO_TRIP_LEADERS[1],
    joiningTravelers: [DEMO_TRAVELERS[1], DEMO_TRAVELERS[2], DEMO_TRAVELERS[3]],
    safetyNotes: ['Zero-harassment policy strictly enforced', '24/7 vehicle assistance on standby'],
    featured: true
  },
  {
    id: 'trip-spiti',
    slug: 'spiti-high-pass-frontier',
    title: 'SPITI VALLEY',
    chapterTitle: 'High Pass Frontier',
    destination: 'Spiti Valley, Himachal Pradesh',
    region: 'North India & Himalayas',
    durationDays: 8,
    durationNights: 7,
    price: 18999,
    originalPrice: 22000,
    currency: '₹',
    category: 'Adventure',
    tribePersonalityMatch: ['THE ADVENTURER', 'THE EXPLORER'],
    difficulty: 'Challenging',
    totalSpots: 12,
    spotsTaken: 0,
    status: 'COMING_SOON',
    rating: 4.98,
    reviewsCount: 0,
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80'],
    startDate: '2027-05-15',
    endDate: '2027-05-22',
    meetingPoint: 'Chandigarh Station / Airport',
    accommodationType: 'Spitian Village Homestays & Chandra Taal Camps',
    overview: 'The ultimate high altitude bucket-list roadmap! Traverse Atal Tunnel, visit century-old Key Monastery, send postcards from Hikkim (world’s highest post office), and camp by Chandra Taal lake.',
    itinerary: [],
    inclusions: ['Homestays & Camps', '4x4 Vehicle', 'Permits & Lead'],
    exclusions: ['Travel to Chandigarh'],
    whatToBring: ['Heavy thermal wear', 'Trekking boots'],
    leader: DEMO_TRIP_LEADERS[2],
    joiningTravelers: [],
    safetyNotes: ['Acclimatization built-in'],
    comingSoon: true
  }
];

export const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    city: 'Mumbai',
    tripName: 'Munnar — The First Chapter',
    quote: 'I booked Munnar on a complete whim after feeling burnt out in Mumbai. Showing up solo was terrifying for 10 minutes, then Dharsh introduced everyone around the campfire. Within 2 days, we were laughing like we’ve known each other for a decade. Beyond Strangers is truly a movement.',
    rating: 5,
    date: 'July 2026',
    isDemo: true
  },
  {
    id: 'test-2',
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    city: 'Bengaluru',
    tripName: 'Meghalaya — Beyond the Clouds',
    quote: 'No cheesy commercial travel vibe. You get genuine small group energy, insane landscapes, and zero forced itinerary pressure. The Nongriat living root bridge trek with this tribe is a core memory I’ll treasure forever.',
    rating: 5,
    date: 'June 2026',
    isDemo: true
  },
  {
    id: 'test-3',
    name: 'Rahul Roy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    city: 'Delhi NCR',
    tripName: 'Coorg — Into the Wild',
    quote: 'If you’re waiting for your college friends to fix a travel plan, stop waiting! Join Beyond Strangers solo. You enter as a stranger and leave with a real tribe.',
    rating: 5,
    date: 'May 2026',
    isDemo: true
  }
];

export const DEMO_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: DEMO_TRAVELERS[0], // Priya
    destination: 'Munnar, Kerala',
    tripTitle: 'Munnar — The First Chapter',
    createdAt: '2 hours ago',
    content: 'Still dreaming about that 5:30 AM Kolukkumalai cloud sunrise from last weekend with @beyondstrangers.in! ☕️☁️ Big shoutout to Dharsh and our whole group for cheering me on during the waterfall trail hike.',
    images: ['https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80'],
    likesCount: 38,
    commentsCount: 6,
    userLiked: true,
    comments: [
      {
        id: 'c1',
        authorName: 'Arjun Mehta',
        authorAvatar: DEMO_TRAVELERS[1].avatar,
        text: 'Best 4 days of the year! Downloading group photos right now 📸',
        createdAt: '1 hour ago'
      },
      {
        id: 'c2',
        authorName: 'Dharsh',
        authorAvatar: FOUNDER_DATA.avatar,
        text: 'You crushed that climb Priya! Welcome to the tribe.',
        createdAt: '30 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    author: DEMO_TRAVELERS[1], // Arjun
    destination: 'Cherrapunji, Meghalaya',
    tripTitle: 'Meghalaya — Beyond the Clouds',
    createdAt: 'Yesterday',
    content: 'Standing under the Double Decker Living Root Bridge after descending 3,000 steps with 10 strangers who became brothers & sisters. India is so beautiful when experienced together.',
    images: ['https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'],
    likesCount: 52,
    commentsCount: 4,
    userLiked: false,
    comments: [
      {
        id: 'c3',
        authorName: 'Sneha Kapoor',
        authorAvatar: DEMO_TRAVELERS[2].avatar,
        text: 'Which destination are you booking next month??',
        createdAt: '18 hours ago'
      }
    ]
  }
];

export const PRISMA_SCHEMA_STRING = `// Prisma Schema for Beyond Strangers (The Stranger Society)
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
    tripId: 'trip-munnar',
    tripTitle: 'Munnar — The First Chapter',
    travelerCount: 1,
    totalAmount: 8999,
    contactName: 'Rohan Deshmukh',
    contactEmail: 'rohan.d@example.com',
    contactPhone: '+91 98765 43210',
    city: 'Hyderabad',
    tribePersonality: 'THE ADVENTURER',
    roommatePreference: 'Male Roommate',
    specialNotes: 'Vegetarian meals preferred. Arriving by train at Aluva.',
    status: 'CONFIRMED',
    bookingReference: 'BS-MUN-4821',
    bookingDate: '2026-08-10',
    isDemo: true
  },
  {
    id: 'book-102',
    tripId: 'trip-coorg',
    tripTitle: 'Coorg — Into the Wild',
    travelerCount: 2,
    totalAmount: 15998,
    contactName: 'Tanvi Iyer',
    contactEmail: 'tanvi.iyer@example.com',
    contactPhone: '+91 98451 22334',
    city: 'Chennai',
    tribePersonality: 'THE SLOW TRAVELLER',
    roommatePreference: 'Female Roommate',
    specialNotes: 'Traveling with my sister. Both passionate about photography.',
    status: 'CONFIRMED',
    bookingReference: 'BS-CRG-9102',
    bookingDate: '2026-08-12',
    isDemo: true
  },
  {
    id: 'book-103',
    tripId: 'trip-meghalaya',
    tripTitle: 'Meghalaya — Beyond the Clouds',
    travelerCount: 1,
    totalAmount: 14999,
    contactName: 'Vikramaditya Sen',
    contactEmail: 'vikram.sen@example.com',
    contactPhone: '+91 99001 88776',
    city: 'Kolkata',
    tribePersonality: 'THE EXPLORER',
    roommatePreference: 'No Preference',
    specialNotes: 'First solo trip. Ready for 3500 stairs hike!',
    status: 'PENDING',
    bookingReference: 'BS-MEG-3319',
    bookingDate: '2026-08-13',
    isDemo: true
  }
];

export const VERIFIED_TRIP_LOCATIONS: VerifiedLocation[] = [
  {
    id: 'loc-gavi-sanctuary',
    name: 'Gavi Eco-Sanctuary & Rainforest',
    districtRegion: 'Pathanamthitta / Western Ghats, Kerala',
    category: 'FOREST',
    lat: 9.4357,
    lng: 77.1656,
    googleMapsUrl: 'https://www.google.com/maps/place/Gavi,+Kerala+685533/@9.4357,77.1656,14z',
    verificationStatus: 'LOCATION_VERIFIED',
    verifiedBy: 'Dharsh (Founder)',
    verificationDate: '2026-08-10',
    description: 'Pristine evergreen tropical rainforest sanctuary at 1,036m altitude, home to Lion-tailed macaques, Nilgiri tahrs, hornbills, and quiet Shola grasslands.',
    activityTags: ['FOREST', 'WILDLIFE', 'ECO-TRAIL', 'NATURE'],
    verifiedLandmarkNotes: 'Kerala Forest Development Corporation (KFDC) Gavi Reception & Shola Grasslands',
    elevation: '1,036 m (3,400 ft)',
    associatedTripId: 'trip-gavi-thekkady'
  },
  {
    id: 'loc-kochupampa-lake',
    name: 'Kochupampa Lake & Reservoir Boating',
    districtRegion: 'Gavi Sanctuary, Pathanamthitta, Kerala',
    category: 'BOATING',
    lat: 9.4215,
    lng: 77.1482,
    googleMapsUrl: 'https://www.google.com/maps/search/Kochupampa+Lake+Gavi/@9.4215,77.1482,14z',
    verificationStatus: 'LOCATION_VERIFIED',
    verifiedBy: 'Dharsh (Founder)',
    verificationDate: '2026-08-10',
    description: 'Tranquil reservoir lake enveloped by dense high-canopy jungle, reserved for silent row-boating and reflective group moments away from motorboats.',
    activityTags: ['BOATING', 'LAKE WATERWAYS', 'SILENCE', 'KAYAKING'],
    verifiedLandmarkNotes: 'Kochupampa KFDC Pier & Silent Waterway Reservoir',
    elevation: '980 m',
    associatedTripId: 'trip-gavi-thekkady'
  },
  {
    id: 'loc-gavi-cascades',
    name: 'Forest Streams & Natural Cascades',
    districtRegion: 'Gavi Valley, Western Ghats, Kerala',
    category: 'WATERFALL',
    lat: 9.4480,
    lng: 77.1720,
    googleMapsUrl: 'https://www.google.com/maps/search/Gavi+waterfalls+Kerala/@9.448,77.172,14z',
    verificationStatus: 'LOCATION_VERIFIED',
    verifiedBy: 'Beyond Strangers Operations Team',
    verificationDate: '2026-08-11',
    description: 'Natural forest stream and secluded fresh-water cascades accessed via accompanied KFDC nature trek. Clean mountain water surrounded by mossy rocks.',
    activityTags: ['WATERFALL', 'NATURAL DIP', 'STREAM TREK', 'NATURE'],
    verifiedLandmarkNotes: 'Forest Department verified spring stream in Gavi core zone',
    elevation: '1,010 m',
    associatedTripId: 'trip-gavi-thekkady'
  },
  {
    id: 'loc-periyar-thekkady',
    name: 'Thekkady & Periyar Tiger Reserve',
    districtRegion: 'Kumily / Idukki District, Kerala',
    category: 'FOREST',
    lat: 9.6031,
    lng: 77.1615,
    googleMapsUrl: 'https://www.google.com/maps/place/Periyar+National+Park/@9.6031,77.1615,13z',
    verificationStatus: 'LOCATION_VERIFIED',
    verifiedBy: 'Dharsh (Founder)',
    verificationDate: '2026-08-10',
    description: 'World-renowned protected bio-reserve featuring expansive waterways, Asian elephant corridors, hornbill roosts, and protected bamboo trails.',
    activityTags: ['WILDLIFE', 'BAMBOO RAFTING', 'FOREST CANOPY', 'NATURE'],
    verifiedLandmarkNotes: 'Periyar Tiger Reserve Forest Sanctuary Station & Boat Jetty, Thekkady',
    elevation: '900 m',
    associatedTripId: 'trip-gavi-thekkady'
  },
  {
    id: 'loc-ottakatha-viewpoint',
    name: 'Ottakathalamedu Panoramic Viewpoint',
    districtRegion: 'Thekkady Ridge / Idukki, Kerala',
    category: 'VIEWPOINT',
    lat: 9.5824,
    lng: 77.1950,
    googleMapsUrl: 'https://www.google.com/maps/place/Ottakathalamedu+view+point/@9.5824,77.195,14z',
    verificationStatus: 'LOCATION_VERIFIED',
    verifiedBy: 'Dharsh (Founder)',
    verificationDate: '2026-08-11',
    description: 'Elevated vantage point 4km from Kumily providing dramatic 360-degree sunset panoramas across the Western Ghat mountain ranges and neighboring plains.',
    activityTags: ['VIEWPOINT', 'SUNSET', 'PANORAMA', 'PHOTOGRAPHY'],
    verifiedLandmarkNotes: 'Ottakathalamedu Watchtower and Western Ghats Ridge Lookout',
    elevation: '1,300 m (4,265 ft)',
    associatedTripId: 'trip-gavi-thekkady'
  },
  {
    id: 'loc-kumily-spice',
    name: 'Kumily Organic Spice & Cultural Heritage',
    districtRegion: 'Kumily, Idukki District, Kerala',
    category: 'CULTURAL',
    lat: 9.6105,
    lng: 77.1685,
    googleMapsUrl: 'https://www.google.com/maps/place/Kumily,+Kerala+685509/@9.6105,77.1685,15z',
    verificationStatus: 'LOCATION_VERIFIED',
    verifiedBy: 'Beyond Strangers Operations Team',
    verificationDate: '2026-08-10',
    description: 'Centuries-old spice trading settlement nestled amidst aromatic cardamom, pepper, and cinnamon gardens, home to traditional Kalaripayattu and Kathakali cultural heritage.',
    activityTags: ['CULTURAL', 'SPICE PLANTATION', 'HERITAGE', 'LOCAL CUISINE'],
    verifiedLandmarkNotes: 'Kumily Native Spice Trail & Cultural Pavilion',
    elevation: '880 m',
    associatedTripId: 'trip-gavi-thekkady'
  },
  {
    id: 'loc-chellarkovil-falls',
    name: 'Chellarkovil Eco-Viewpoint & Cascades',
    districtRegion: 'Idukki / High Range Kerala',
    category: 'VIEWPOINT',
    lat: 9.6830,
    lng: 77.2025,
    googleMapsUrl: 'https://www.google.com/maps/place/Chellarkovil+View+Point/@9.683,77.2025,14z',
    verificationStatus: 'LOCATION_VERIFIED',
    verifiedBy: 'Beyond Strangers Operations Team',
    verificationDate: '2026-08-12',
    description: 'Sloping green ridge with natural cliff waterfalls flowing downward toward the plains of Tamil Nadu. Known for peaceful village breeze and organic coconut groves.',
    activityTags: ['VIEWPOINT', 'WATERFALL', 'ECO-VILLAGE', 'NATURE'],
    verifiedLandmarkNotes: 'Chellarkovil Ecotourism Observation Balcony',
    elevation: '1,200 m',
    associatedTripId: 'trip-gavi-thekkady'
  }
];

export const DEMO_MEDIA_LIBRARY: MediaItem[] = [
  {
    id: 'vid-gavi-1',
    title: 'Gavi / Thekkady — Official Strangers Trip Film (21–23 Aug)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    type: 'video',
    category: 'Destinations',
    size: '14.2 MB',
    createdAt: '2026-08-12',
    assignedSlot: 'hero',
    isDemo: false,
    location: 'Gavi Sanctuary, Pathanamthitta',
    exactLocation: 'Gavi Eco-Sanctuary & Forest Trail (9.4357° N, 77.1656° E)',
    districtRegion: 'Pathanamthitta, Kerala',
    lat: 9.4357,
    lng: 77.1656,
    source: 'Beyond Strangers Original',
    usageRights: 'Owned by Beyond Strangers',
    verificationStatus: 'LOCATION_VERIFIED',
    googleMapsRefUrl: 'https://www.google.com/maps/place/Gavi,+Kerala+685533/@9.4357,77.1656,14z',
    caption: 'Official promotional release for the upcoming August 21–23 chapter. ₹9,999 / Person • No Age Restriction.',
    instagramUrl: 'https://instagram.com/dharsh_here__'
  },
  {
    id: 'vid-gavi-2',
    title: 'Private Waterfalls & Forest Lake Boating',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
    type: 'video',
    category: 'Nature',
    size: '18.6 MB',
    createdAt: '2026-08-12',
    assignedSlot: 'experience',
    isDemo: false,
    location: 'Kochupampa Lake & Gavi Cascades',
    exactLocation: 'Kochupampa Reservoir & Forest Stream (9.4215° N, 77.1482° E)',
    districtRegion: 'Pathanamthitta, Kerala',
    lat: 9.4215,
    lng: 77.1482,
    source: 'Provided Video Footages',
    usageRights: 'Owned by Beyond Strangers',
    verificationStatus: 'LOCATION_VERIFIED',
    googleMapsRefUrl: 'https://www.google.com/maps/search/Kochupampa+Lake+Gavi/@9.4215,77.1482,14z',
    caption: 'Unscripted moments beneath private natural cascades and tranquil reservoir boat rides.',
    instagramUrl: 'https://instagram.com/dharsh_here__'
  },
  {
    id: 'vid-gavi-3',
    title: 'Culture, Wildlife & Starlit Campfire Moments',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-camp-fire-in-the-night-42273-large.mp4',
    type: 'video',
    category: 'Campfire',
    size: '16.4 MB',
    createdAt: '2026-08-12',
    assignedSlot: 'instagram',
    isDemo: false,
    location: 'Thekkady Base & Gavi Camp',
    exactLocation: 'Thekkady Periyar Reserve Buffer (9.6031° N, 77.1615° E)',
    districtRegion: 'Idukki, Kerala',
    lat: 9.6031,
    lng: 77.1615,
    source: 'Beyond Strangers Original',
    usageRights: 'Owned by Beyond Strangers',
    verificationStatus: 'LOCATION_VERIFIED',
    googleMapsRefUrl: 'https://www.google.com/maps/place/Periyar+National+Park/@9.6031,77.1615,13z',
    caption: 'Traditional Kerala cultural expressions, forest birdlife, and fireside connections under the stars.',
    instagramUrl: 'https://instagram.com/dharsh_here__'
  },
  {
    id: 'med-gavi-boating',
    title: 'Tranquil Forest Lake Boating',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85',
    type: 'image',
    category: 'Nature',
    size: '3.4 MB',
    createdAt: '2026-08-12',
    assignedSlot: 'experience',
    isDemo: false,
    location: 'Kochupampa Pier, Gavi',
    exactLocation: 'Kochupampa Lake (9.4215° N, 77.1482° E)',
    districtRegion: 'Pathanamthitta, Kerala',
    lat: 9.4215,
    lng: 77.1482,
    source: 'Licensed Photography',
    usageRights: 'Licensed by Content Team',
    verificationStatus: 'LOCATION_VERIFIED',
    googleMapsRefUrl: 'https://www.google.com/maps/search/Kochupampa+Lake+Gavi',
    caption: 'Experiencing the tranquil waters surrounded by the high canopy rainforests of the region.',
    instagramUrl: 'https://instagram.com/dharsh_here__'
  },
  {
    id: 'med-gavi-waterfall',
    title: 'Private Falls & Natural Cascade',
    url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=85',
    type: 'image',
    category: 'Nature',
    size: '3.8 MB',
    createdAt: '2026-08-12',
    assignedSlot: 'experience',
    isDemo: false,
    location: 'Gavi Valley Stream Cascades',
    exactLocation: 'Gavi Forest Cascades (9.4480° N, 77.1720° E)',
    districtRegion: 'Pathanamthitta, Kerala',
    lat: 9.4480,
    lng: 77.1720,
    source: 'Licensed Photography',
    usageRights: 'Licensed by Content Team',
    verificationStatus: 'LOCATION_VERIFIED',
    googleMapsRefUrl: 'https://www.google.com/maps/search/Gavi+waterfalls+Kerala',
    caption: 'Secret waterfall dip away from commercial tourist tracks in verified forest zone.',
    instagramUrl: 'https://instagram.com/dharsh_here__'
  },
  {
    id: 'med-gavi-mist',
    title: 'Misty Forest Road Expedition',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    type: 'image',
    category: 'Destinations',
    size: '3.1 MB',
    createdAt: '2026-08-12',
    assignedSlot: 'hero',
    isDemo: false,
    location: 'Gavi Sanctuary Forest Route',
    exactLocation: 'Gavi Sanctuary Corridor (9.4357° N, 77.1656° E)',
    districtRegion: 'Pathanamthitta, Kerala',
    lat: 9.4357,
    lng: 77.1656,
    source: 'Licensed Photography',
    usageRights: 'Licensed by Content Team',
    verificationStatus: 'LOCATION_VERIFIED',
    googleMapsRefUrl: 'https://www.google.com/maps/place/Gavi,+Kerala+685533',
    caption: 'Roads disappear into the forest canopy as morning mist wraps the mountain ridges.',
    instagramUrl: 'https://instagram.com/dharsh_here__'
  },
  {
    id: 'med-gavi-wildlife',
    title: 'Dense Rainforest & Sanctuary Birds',
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85',
    type: 'image',
    category: 'Nature',
    size: '2.9 MB',
    createdAt: '2026-08-12',
    assignedSlot: 'experience',
    isDemo: false,
    location: 'Thekkady Periyar Reserve Buffer',
    exactLocation: 'Periyar National Park (9.6031° N, 77.1615° E)',
    districtRegion: 'Idukki, Kerala',
    lat: 9.6031,
    lng: 77.1615,
    source: 'Licensed Photography',
    usageRights: 'Licensed by Content Team',
    verificationStatus: 'LOCATION_VERIFIED',
    googleMapsRefUrl: 'https://www.google.com/maps/place/Periyar+National+Park',
    caption: 'Untamed greenery, endemic birds, and wildlife roaming free in verified reserve zones.',
    instagramUrl: 'https://instagram.com/dharsh_here__'
  },
  {
    id: 'med-gavi-campfire',
    title: 'Night Fireside & Starlit Hearth',
    url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=85',
    type: 'image',
    category: 'Campfire',
    size: '2.5 MB',
    createdAt: '2026-08-12',
    assignedSlot: 'community',
    isDemo: false,
    location: 'Gavi Eco Basecamp',
    exactLocation: 'Gavi KFDC Camp Area (9.4357° N, 77.1656° E)',
    districtRegion: 'Pathanamthitta, Kerala',
    lat: 9.4357,
    lng: 77.1656,
    source: 'Beyond Strangers Original',
    usageRights: 'Owned by Beyond Strangers',
    verificationStatus: 'LOCATION_VERIFIED',
    googleMapsRefUrl: 'https://www.google.com/maps/place/Gavi,+Kerala+685533',
    caption: 'When the sun goes down, the journey doesn’t end: intimate acoustic & campfire conversations.',
    instagramUrl: 'https://instagram.com/dharsh_here__'
  },
  {
    id: 'med-gavi-culture',
    title: 'Traditional Cultural Heritage Performance',
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
    type: 'image',
    category: 'Destinations',
    size: '2.7 MB',
    createdAt: '2026-08-12',
    assignedSlot: 'experience',
    isDemo: false,
    location: 'Kumily Cultural Centre, Thekkady',
    exactLocation: 'Kumily Heritage Stage (9.6105° N, 77.1685° E)',
    districtRegion: 'Idukki, Kerala',
    lat: 9.6105,
    lng: 77.1685,
    source: 'Licensed Photography',
    usageRights: 'Licensed by Content Team',
    verificationStatus: 'LOCATION_VERIFIED',
    googleMapsRefUrl: 'https://www.google.com/maps/place/Kumily,+Kerala+685509',
    caption: 'Honoring centuries of classical arts, Kalaripayattu martial traditions and regional folklore.',
    instagramUrl: 'https://instagram.com/dharsh_here__'
  }
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'Beyond Strangers',
  tagline: 'Where strangers find their tribe.',
  subTagline: 'Curated journeys across India for people who believe the best stories begin with strangers.',
  announcement: '🌿 Autumn 2026 Chapters are open for applications! Group capacity strictly capped at 12 travelers.',
  founderName: 'Dharsh',
  founderRole: 'Founder, Beyond Strangers',
  founderBio: [
    "Beyond Strangers was born out of a simple realization: the most transformative, hilarious, and deep travel memories rarely happen because of famous monuments. They happen because of the people sitting next to you around a campfire at 2 AM.",
    "When I started Beyond Strangers, I wanted to curate small-group escapes where young travelers could show up solo, shed their urban armor, and build genuine human connections across India's most breathtaking landscapes.",
    "Today, The Stranger Society is a growing movement of explorers, storytellers, and dreamers who prove that you don't need a pre-existing group to travel. You just need the courage to show up."
  ],
  founderImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  instagramHandle: '@dharsh_here__',
  contactEmail: 'tribe@beyondstrangers.in',
  whatsappNumber: '+91 94812 00420',
  cancellationSummary: '100% full refund up to 14 days before journey start date. Free one-time rescheduling to any future chapter.'
};

export const INITIAL_SITE_SETTINGS = DEFAULT_SITE_SETTINGS;

export const DEMO_ADMIN_USER: AdminUser = {
  id: 'admin-1',
  email: 'dharsh@beyondstrangers.in',
  name: 'Dharsh (Founder & Admin)',
  role: 'ADMIN',
  token: 'mock-jwt-strangers-admin-token-2026'
};

