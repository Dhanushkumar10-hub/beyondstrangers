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
      id: 'trip-gavi-thekkady',
      slug: 'gavi-thekkady-monsoon',
      title: 'GAVI / THEKKADY',
      chapterTitle: 'CHAPTER 04 • KERALA MONSOON',
      destination: 'Gavi & Periyar, Western Ghats, Kerala',
      dates: '21 — 23 AUGUST',
      startDate: '2026-08-21',
      endDate: '2026-08-23',
      duration: '2 NIGHTS / 3 DAYS',
      price: '₹9,999 / PERSON',
      priceCents: 999900,
      currency: 'INR',
      ageRestriction: 'NO AGE RESTRICTION',
      media: {
        type: 'image',
        urls: {
          poster: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
          desktop: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80'
        },
        alt: 'Gavi Thekkady Rainforest'
      },
      spotsAvailable: 5,
      overview: 'An intimate rainforest expedition crossing serene reservoir waters, secluded waterfall pools, and starlit campfire circles with fellow solo explorers.',
      inclusions: [
        'Curated Plantation & Forest Cottage Stay (2 Nights)',
        'Private Forest Vehicle & Local Transport Throughout',
        'Official KFDC Forest Entry Permits & Guide Fees',
        'Guided Reservoir Boating Experience',
        'All Authentic Kerala Meals on Trail',
        'Founder-Led Group Facilitation & Campfire Circles'
      ],
      publicMapAllowed: true,
      regionSummary: 'Gavi / Thekkady region — forests, boating, waterfalls and viewpoints.'
    }
  };
}
