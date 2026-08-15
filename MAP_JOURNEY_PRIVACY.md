# "The Journey" Map Section & Geolocation Privacy Architecture

## 1. Rationale: Why Coordinates & Verification Flags Are Admin-Only
Public web pages and public REST/GraphQL endpoints must never expose sensitive raw GPS coordinates, decimal latitude/longitude markers, or internal land reconnaissance memos.
- **Privacy & Safety**: Precise coordinates of secluded camping spots, private estate pathways, and natural springs in wilderness regions are protected from scraping and unauthorized access.
- **Brand & Operations**: Verification statuses (`LOCATION_VERIFIED`, `PENDING_RECONNAISSANCE`, `OFFICIAL_PERMIT_ACQUIRED`) are internal logistics workflows used by tour founders and permit coordinators.
- **Public Presentation**: The public site presents an experiential, regional overview ("THE JOURNEY") highlighting 7 curated waypoints with descriptive narrative copy and a regional map view.

---

## 2. On-Demand Map Loading Architecture
Interactive map embeds (such as Google Maps or Mapbox SDKs) can easily add 300KB–1MB of JavaScript and network overhead on first paint.

### Mobile Viewports (< 768px)
- By default, mobile devices render a lightweight, responsive static poster image (`<picture>` with WebP and JPG fallbacks).
- No map iframes or map scripts are initialized on page load.
- Users can tap the **"Load interactive map"** button to dynamically import `MapIframe.tsx` via `React.lazy()` and `Suspense`, loading the embed on demand.

### Desktop Viewports (>= 768px)
- An `IntersectionObserver` watches the `#the-journey` section container.
- When the section enters within 200px of the viewport, `MapIframe.tsx` is dynamically imported and mounted automatically, keeping the initial HTML payload and first contentful paint (FCP) ultra-fast.

---

## 3. Database Schema & API Sanitization

### Database Table (`public.trips` and `public.locations`)
```sql
CREATE TABLE public.trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    -- ...
    -- Admin-Only Sensitive Geodata (Not exposed to public)
    latitude NUMERIC(10, 6),
    longitude NUMERIC(10, 6),
    verification_status verification_status DEFAULT 'LOCATION_VERIFIED',
    
    -- Public Map Permission Flag (Admin Opt-In)
    is_public_map_allowed BOOLEAN NOT NULL DEFAULT false,
    poster_webp_url TEXT,
    poster_jpg_url TEXT,
    poster_alt_text TEXT NOT NULL
);
```

### Public API Sanitization (`GET /api/featured` / `getFeaturedTripData`)
The public API strips all database coordinates and internal fields, returning a clean payload:
```ts
{
  "title": "GAVI / THEKKADY",
  "destination": "Gavi & Periyar, Western Ghats, Kerala",
  "publicMapAllowed": true,
  "regionSummary": "Gavi / Thekkady region — forests, boating, waterfalls and viewpoints."
  // Note: latitude, longitude, and verification_status are omitted.
}
```

---

## 4. Poster Images: Recommended Sizes & Formats
For optimal responsive performance and zero layout shift:
- **Aspect Ratio**: 16:9 or 4:3 (minimum 1200 × 800 px).
- **Formats**: WebP preferred (compressed with quality 80–85%) + JPG fallback.
- **Responsive Widths**: Provide images in 480w (mobile), 768w (tablet), 1200w (desktop), and 1600w (retina).
- **Alt Text**: Always supply descriptive alt text in the Admin CMS (e.g., *"Regional topographical overview of Gavi and Thekkady, Western Ghats"*).

---

## 5. Google Maps Embed & OpenStreetMap (OSM) Switching
The `MapIframe.tsx` component is completely self-contained and accepts a regional search query:

```tsx
<MapIframe 
  query="Gavi+Thekkady+Kerala" 
  title="Regional map for Gavi / Thekkady"
/>
```

To switch to OpenStreetMap / Leaflet or an alternative embed provider in the future, simply update the `embedUrl` template in `src/components/MapIframe.tsx`:

```tsx
// Example OpenStreetMap Embed:
const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=77.05,9.35,77.25,9.55&layer=mapnik`;
```

---

## 6. Running Tests
Run the test suite using Jest and React Testing Library:
```bash
npm test
# or specifically for the journey map and sanitization tests:
npx jest __tests__/MapSection.test.tsx __tests__/api_sanitization.test.ts
```
