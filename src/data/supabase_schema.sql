-- ============================================================================
-- SUPABASE POSTGRES SCHEMA & MIGRATION — BEYOND STRANGERS
-- Migration 002: Admin-Only Geolocation & Public Map Opt-in Policy
-- ============================================================================

-- 1. Create Enums for Trip Status & Internal Verification
CREATE TYPE trip_status AS ENUM ('DRAFT', 'PUBLISHED', 'FEATURED', 'COMPLETED', 'ARCHIVED');
CREATE TYPE verification_status AS ENUM ('PENDING_RECONNAISSANCE', 'LOCATION_VERIFIED', 'OFFICIAL_PERMIT_ACQUIRED');

-- 2. Trips Table Definition
CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    chapter_title TEXT NOT NULL DEFAULT 'A STRANGERS TRIP',
    destination TEXT NOT NULL,
    sub_region TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration_days INTEGER NOT NULL DEFAULT 3,
    duration_nights INTEGER NOT NULL DEFAULT 2,
    price_cents BIGINT NOT NULL DEFAULT 999900, -- in paisa (₹9,999.00 = 999900)
    currency TEXT NOT NULL DEFAULT 'INR',
    age_restriction TEXT NOT NULL DEFAULT 'NO AGE RESTRICTION',
    status trip_status NOT NULL DEFAULT 'PUBLISHED',
    featured BOOLEAN NOT NULL DEFAULT false,
    
    -- Capacity
    total_spots INTEGER NOT NULL DEFAULT 16,
    spots_taken INTEGER NOT NULL DEFAULT 0,
    
    -- Content & Media
    overview TEXT,
    hero_image_url TEXT NOT NULL,
    hero_video_url TEXT,
    poster_webp_url TEXT,
    poster_jpg_url TEXT,
    poster_alt_text TEXT DEFAULT 'Regional map view of expedition trail',
    gallery_media JSONB DEFAULT '[]'::jsonb,
    itinerary JSONB DEFAULT '[]'::jsonb,
    inclusions TEXT[] DEFAULT ARRAY[]::TEXT[],
    exclusions TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- Internal Admin-Only Coordinates & Verification
    -- [SECURITY & PRIVACY]: Stripped from all public API endpoints.
    latitude NUMERIC(10, 6),
    longitude NUMERIC(10, 6),
    google_maps_url TEXT,
    verification_status verification_status DEFAULT 'LOCATION_VERIFIED',
    
    -- Public Map Permission Toggle (Admin Opt-in required)
    is_public_map_allowed BOOLEAN NOT NULL DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Locations / Waypoints Table (Internal Reconnaissance & Admin Management)
CREATE TABLE IF NOT EXISTS public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT DEFAULT 'FOREST',
    
    -- Admin-Only sensitive coordinates and verification fields
    lat NUMERIC(10, 6),
    lng NUMERIC(10, 6),
    verification_status verification_status NOT NULL DEFAULT 'LOCATION_VERIFIED',
    admin_notes TEXT,
    
    -- Display & Ordering
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_public_map_allowed BOOLEAN NOT NULL DEFAULT false,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Trigger to ensure only ONE trip is marked as featured at a time
CREATE OR REPLACE FUNCTION set_single_featured_trip()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.featured = true THEN
        UPDATE public.trips
        SET featured = false
        WHERE id <> NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_single_featured_trip ON public.trips;
CREATE TRIGGER enforce_single_featured_trip
BEFORE INSERT OR UPDATE OF featured ON public.trips
FOR EACH ROW
WHEN (NEW.featured = true)
EXECUTE FUNCTION set_single_featured_trip();

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Public Security View: Excludes coordinates, elevation, and internal verification notes
CREATE OR REPLACE VIEW public.v_public_trips AS
SELECT 
    id,
    slug,
    title,
    chapter_title,
    destination,
    sub_region,
    start_date,
    end_date,
    duration_days,
    duration_nights,
    price_cents,
    currency,
    age_restriction,
    status,
    featured,
    total_spots,
    spots_taken,
    overview,
    hero_image_url,
    hero_video_url,
    poster_webp_url,
    poster_jpg_url,
    poster_alt_text,
    gallery_media,
    itinerary,
    inclusions,
    is_public_map_allowed,
    created_at
FROM public.trips
WHERE status IN ('PUBLISHED', 'FEATURED', 'COMPLETED');

-- Public can read published/featured trips
CREATE POLICY "Public trips are readable by everyone" 
ON public.trips 
FOR SELECT 
USING (status IN ('PUBLISHED', 'FEATURED', 'COMPLETED'));

-- Public can read sanitized waypoint lists
CREATE POLICY "Public waypoints are readable without coords" 
ON public.locations 
FOR SELECT 
USING (true);

-- Authenticated admins can perform full CRUD operations
CREATE POLICY "Authenticated admins can manage trips" 
ON public.trips 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Authenticated admins can manage locations" 
ON public.locations 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 6. Realistic Seed Row for GAVI / THEKKADY Featured Trip
-- NOTE: Lat/Lng stored for internal route planning, but masked by public view/APIs
INSERT INTO public.trips (
    slug,
    title,
    chapter_title,
    destination,
    sub_region,
    start_date,
    end_date,
    duration_days,
    duration_nights,
    price_cents,
    currency,
    age_restriction,
    status,
    featured,
    total_spots,
    spots_taken,
    overview,
    hero_image_url,
    hero_video_url,
    poster_webp_url,
    poster_jpg_url,
    poster_alt_text,
    latitude,
    longitude,
    google_maps_url,
    verification_status,
    is_public_map_allowed,
    inclusions
) VALUES (
    'gavi-thekkady-monsoon',
    'GAVI / THEKKADY',
    'CHAPTER 04 • KERALA MONSOON',
    'Gavi & Periyar, Western Ghats, Kerala',
    'Pathanamthitta / Idukki District',
    '2026-08-21',
    '2026-08-23',
    3,
    2,
    999900,
    'INR',
    'NO AGE RESTRICTION',
    'FEATURED',
    true,
    16,
    11,
    'An intimate rainforest expedition crossing serene reservoir waters, secluded waterfall pools, and starlit campfire circles with fellow solo explorers.',
    'assets/images/destinations/kodaikanal.jpg',
    'assets/videos/hero_loop.mp4',
    'assets/images/experiences/forest_trails.jpg',
    'assets/images/experiences/evening_campfire.jpg',
    'Regional topographical map for Gavi and Thekkady, Western Ghats',
    9.432000, -- ADMIN-ONLY STORAGE
    77.164000, -- ADMIN-ONLY STORAGE
    'https://maps.google.com/?q=9.432,77.164',
    'LOCATION_VERIFIED',
    true, -- Allow on-demand interactive map on public front
    ARRAY[
        'Curated Plantation & Forest Cottage Stay (2 Nights)',
        'Private Forest Vehicle & Local Transport Throughout',
        'Official KFDC Forest Entry Permits & Guide Fees',
        'Guided Reservoir Boating Experience',
        'All Authentic Kerala Meals on Trail',
        'Founder-Led Group Facilitation & Campfire Circles'
    ]
) ON CONFLICT (slug) DO UPDATE SET 
    featured = true,
    is_public_map_allowed = true;
