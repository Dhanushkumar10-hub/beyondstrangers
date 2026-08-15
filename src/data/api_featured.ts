/**
 * Next.js App Router / Pages Router API Handler for GET /api/featured
 * 
 * Returns the currently featured upcoming trip (status=FEATURED and start_date >= today)
 * with graceful fallback to the next published upcoming trip.
 */

export interface SanitizedPublicTrip {
  id: string;
  slug: string;
  title: string;
  chapterTitle: string;
  destination: string;
  dates: string;
  startDate: string;
  endDate: string;
  duration: string;
  price: string;
  priceCents: number;
  currency: string;
  ageRestriction: string;
  media: {
    type: 'image' | 'video';
    urls: {
      poster: string;
      desktop?: string;
      mobile?: string;
    };
    alt: string;
  };
  spotsAvailable: number;
  overview: string;
  inclusions: string[];
  publicMapAllowed: boolean;
  regionSummary?: string;
}

export interface FeaturedTripResponse {
  success: boolean;
  data?: SanitizedPublicTrip;
  fallbackUsed?: boolean;
  error?: string;
}

export async function getFeaturedTripData(supabaseClient?: any): Promise<FeaturedTripResponse> {
  // If Supabase is connected:
  if (supabaseClient) {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // 1. Attempt to fetch explicitly featured upcoming trip
      let { data, error } = await supabaseClient
        .from('trips')
        .select('*')
        .eq('featured', true)
        .gte('start_date', today)
        .order('start_date', { ascending: true })
        .limit(1)
        .single();

      // 2. Fallback to earliest upcoming published trip if none marked featured
      if (!data || error) {
        const fallbackRes = await supabaseClient
          .from('trips')
          .select('*')
          .in('status', ['PUBLISHED', 'AVAILABLE', 'FEW_SPOTS_LEFT'])
          .gte('start_date', today)
          .order('start_date', { ascending: true })
          .limit(1)
          .single();
        
        data = fallbackRes.data;
      }

      if (data) {
        // Return sanitized payload (coordinates and internal verification are stripped for public privacy)
        return {
          success: true,
          data: {
            id: data.id,
            slug: data.slug,
            title: data.title,
            chapterTitle: data.chapter_title,
            destination: data.destination,
            dates: `${new Date(data.start_date).getDate()} — ${new Date(data.end_date).getDate()} ${new Date(data.start_date).toLocaleString('default', { month: 'short' }).toUpperCase()}`,
            startDate: data.start_date,
            endDate: data.end_date,
            duration: `${data.duration_nights} NIGHTS / ${data.duration_days} DAYS`,
            price: `₹${(data.price_cents / 100).toLocaleString('en-IN')}`,
            priceCents: data.price_cents,
            currency: data.currency,
            ageRestriction: data.age_restriction || 'NO AGE RESTRICTION',
            media: {
              type: data.hero_video_url ? 'video' : 'image',
              urls: {
                poster: data.hero_image_url,
                desktop: data.hero_video_url || data.hero_image_url,
                mobile: data.hero_image_url
              },
              alt: `${data.title} Experience in ${data.destination}`
            },
            spotsAvailable: data.total_spots - data.spots_taken,
            overview: data.overview,
            inclusions: data.inclusions || [],
            publicMapAllowed: Boolean(data.is_public_map_allowed ?? true),
            regionSummary: 'Gavi / Thekkady region — forests, boating, waterfalls and viewpoints.'
          }
        };
      }
    } catch (err: any) {
      console.warn('Supabase featured trip fetch fallback:', err?.message);
    }
  }

  // Graceful in-memory fallback for local mock / development (Strictly sanitized)
  return {
    success: true,
    fallbackUsed: true,
    data: {
      id: 'trip-kodaikanal',
      slug: 'kodaikanal-mist-escape',
      title: 'KODAIKANAL ESCAPE',
      chapterTitle: 'CHAPTER 01 • TAMIL NADU',
      destination: 'Kodaikanal, Tamil Nadu',
      dates: '21 — 22 AUGUST',
      startDate: '2026-08-21',
      endDate: '2026-08-22',
      duration: '1 NIGHT / 2 DAYS',
      price: '₹4,999 / PERSON',
      priceCents: 499900,
      currency: 'INR',
      ageRestriction: 'NO AGE RESTRICTION',
      media: {
        type: 'image',
        urls: {
          poster: 'assets/images/destinations/kodaikanal.jpg',
          desktop: 'assets/images/destinations/kodaikanal.jpg',
          mobile: 'assets/images/destinations/kodaikanal.jpg'
        },
        alt: 'Kodaikanal Pine Forest'
      },
      spotsAvailable: 5,
      overview: 'Pine forests, cool mist, lake sunsets, and warm acoustic campfire with fellow solo travellers.',
      inclusions: [
        'Hilltop Pine Cottage Stay (1 Night)',
        'Private Transport from Madurai / Dindigul',
        'Guided Pine Forest & Waterfall Walk',
        'All Authentic Tamil Nadu Meals on Trail',
        'Evening Acoustic Campfire Circle'
      ],
      publicMapAllowed: true,
      regionSummary: 'Kodaikanal region — pine forests, cool lakes, waterfalls, and hill views.'
    }
  };
}
