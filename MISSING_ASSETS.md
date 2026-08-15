# Missing / Expected Local Assets Inventory

This document tracks local asset requirements, expected paths, referencing components, and recommended placeholder dimensions or formats for the Beyond Strangers South India travel platform.

| Asset Path | Component / View | Description / Purpose | Recommended Dimension & Aspect Ratio | Status |
|---|---|---|---|---|
| `assets/brand/logo.png` | `Navbar.tsx`, `Footer.tsx`, `AdminDashboard.tsx` | Main brand badge / logo mark | 400x120px (PNG with transparent alpha) | Present |
| `assets/videos/hero_loop.mp4` | `Hero.tsx`, `VideoGallerySection.tsx` | Ambient background loop of Western Ghats mist | 1920x1080 (16:9), H.264 MP4, muted, optimized web streaming | Present |
| `assets/videos/previews/kodaikanal.mp4` | `VideoGallerySection.tsx` | Video clip preview for Kodaikanal Pine Forest | 1080x1920 or 1080x1350 (9:16 or 4:5 vertical), MP4 | Present |
| `assets/videos/previews/ooty.mp4` | `VideoGallerySection.tsx` | Video clip preview for Nilgiris & Ooty ridge | 1080x1350 (4:5 vertical), MP4 | Missing (Falls back to `hero_loop.mp4`) |
| `assets/videos/previews/valparai.mp4` | `VideoGallerySection.tsx` | Video clip preview for Valparai Tea Trails & Hairpin bends | 1080x1350 (4:5 vertical), MP4 | Missing (Falls back to `hero_loop.mp4`) |
| `assets/videos/previews/kolli_hills.mp4` | `VideoGallerySection.tsx` | Video clip preview for Kolli Hills Agaya Gangai waterfall | 1080x1350 (4:5 vertical), MP4 | Missing (Falls back to `hero_loop.mp4`) |
| `assets/videos/previews/meghamalai.mp4` | `VideoGallerySection.tsx` | Video clip preview for Meghamalai Cloud Mountain sunrise | 1080x1350 (4:5 vertical), MP4 | Missing (Falls back to `hero_loop.mp4`) |
| `assets/images/destinations/kodaikanal.jpg` | `TripCard.tsx`, `DestinationsView.tsx`, `Hero.tsx` | Kodaikanal Pine Forest & Lake Viewpoint | 1600x1000 (16:10), JPEG | Present |
| `assets/images/destinations/ooty.jpg` | `TripCard.tsx`, `DestinationsView.tsx` | Nilgiris mountain tea ridges & mist | 1600x1000 (16:10), JPEG | Present |
| `assets/images/destinations/valparai.jpg` | `TripCard.tsx`, `DestinationsView.tsx` | Valparai tea plantation roads & forest | 1600x1000 (16:10), JPEG | Present |
| `assets/images/destinations/kolli_hills.jpg` | `TripCard.tsx`, `DestinationsView.tsx` | Kolli Hills 70 hairpin bends & waterfall valley | 1600x1000 (16:10), JPEG | Present |
| `assets/images/destinations/meghamalai.jpg` | `TripCard.tsx`, `DestinationsView.tsx` | Meghamalai High Wavys cloud peak | 1600x1000 (16:10), JPEG | Present |
| `assets/images/destinations/munnar.jpg` | `DestinationsView.tsx` | Western Ghats tea valley | 1600x1000 (16:10), JPEG | Present |
| `assets/images/destinations/gavi.jpg` | `DestinationsView.tsx` | Evergreen rainforest reservoir | 1600x1000 (16:10), JPEG | Present |
| `assets/images/destinations/coorg.jpg` | `DestinationsView.tsx` | Coffee estate canopy | 1600x1000 (16:10), JPEG | Present |
| `assets/images/experiences/forest_trails.jpg` | `ExperienceHighlights.tsx` | Shola forest walk with sunlight filtering through leaves | 1200x800 (3:2), JPEG | Present |
| `assets/images/experiences/private_waterfalls.jpg` | `ExperienceHighlights.tsx` | Secluded stream & natural dipping pool | 1200x800 (3:2), JPEG | Present |
| `assets/images/experiences/evening_campfire.jpg` | `ExperienceHighlights.tsx` | Acoustic campfire gathering at night | 1200x800 (3:2), JPEG | Present |
| `assets/images/experiences/meet_new_people.jpg` | `ExperienceHighlights.tsx`, `SocietyView.tsx` | Small group cohort walking together on mountain trail | 1200x800 (3:2), JPEG | Present |
| `assets/images/experiences/tea_walk.jpg` | `ExperienceHighlights.tsx` | Tea garden stroll in morning mist | 1200x800 (3:2), JPEG | Present |
| `assets/images/experiences/cloud_sunrise.jpg` | `ExperienceHighlights.tsx` | Golden sunrise over cloud inversion in Tamil Nadu hills | 1200x800 (3:2), JPEG | Present |
| `assets/images/stories/story_kodaikanal.jpg` | `StoriesView.tsx` | Solo traveler overlooking Kodaikanal valley | 1200x800 (3:2), JPEG | Present |
| `assets/images/stories/story_valparai.jpg` | `StoriesView.tsx`, `InstagramGallerySection.tsx` | Travelers taking tea break at Valparai estate | 1200x800 (3:2), JPEG | Present |
| `assets/images/stories/story_kolli.jpg` | `StoriesView.tsx`, `InstagramGallerySection.tsx` | Hikers ascending rocky steps of Kolli Hills | 1200x800 (3:2), JPEG | Present |
| `assets/images/stories/story_campfire.jpg` | `StoriesView.tsx`, `InstagramGallerySection.tsx` | Travelers laughing around acoustic campfire | 1200x800 (3:2), JPEG | Present |
| `assets/images/stories/avatar_priya.jpg` | `StoriesView.tsx` | Traveler portrait | 300x300 (1:1), JPEG | Present |
| `assets/images/stories/avatar_arjun.jpg` | `StoriesView.tsx` | Traveler portrait | 300x300 (1:1), JPEG | Present |
| `assets/images/stories/avatar_sneha.jpg` | `StoriesView.tsx` | Traveler portrait | 300x300 (1:1), JPEG | Present |
