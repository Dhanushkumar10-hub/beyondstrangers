import { getFeaturedTripData } from '../src/data/api_featured';

describe('Public API Sanitization & Privacy Tests', () => {
  test('getFeaturedTripData strips lat, lng, coordinates and raw verification notes', async () => {
    const result = await getFeaturedTripData();

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();

    const trip = result.data!;

    // 1. Must include public safe fields
    expect(trip.title).toBe('GAVI / THEKKADY');
    expect(trip.destination).toContain('Gavi & Periyar');
    expect(trip.publicMapAllowed).toBe(true);

    // 2. Sensitive admin-only fields MUST be undefined or absent
    expect((trip as any).coordinates).toBeUndefined();
    expect((trip as any).latitude).toBeUndefined();
    expect((trip as any).longitude).toBeUndefined();
    expect((trip as any).lat).toBeUndefined();
    expect((trip as any).lng).toBeUndefined();
    expect((trip as any).verification_status).toBeUndefined();
    expect((trip as any).verificationStatus).toBeUndefined();
    expect((trip as any).adminNotes).toBeUndefined();
  });

  test('Mock Supabase client response with raw lat/lng is sanitized before returning to client', async () => {
    // Mock Supabase returning raw database columns
    const mockSupabase = {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            gte: jest.fn().mockReturnValue({
              order: jest.fn().mockReturnValue({
                limit: jest.fn().mockReturnValue({
                  single: jest.fn().mockResolvedValue({
                    data: {
                      id: 'test-trip-uuid',
                      slug: 'gavi-monsoon',
                      title: 'GAVI EXPEDITION',
                      chapter_title: 'CHAPTER 04',
                      destination: 'Gavi Rainforest',
                      start_date: '2026-08-21',
                      end_date: '2026-08-23',
                      duration_days: 3,
                      duration_nights: 2,
                      price_cents: 999900,
                      currency: 'INR',
                      total_spots: 16,
                      spots_taken: 5,
                      overview: 'Rainforest trail',
                      hero_image_url: 'https://images.unsplash.com/photo-1',
                      hero_video_url: null,
                      inclusions: ['Meals', 'Stays'],
                      latitude: 9.432000,
                      longitude: 77.164000,
                      verification_status: 'LOCATION_VERIFIED',
                      is_public_map_allowed: false
                    },
                    error: null
                  })
                })
              })
            })
          })
        })
      })
    };

    const response = await getFeaturedTripData(mockSupabase);

    expect(response.success).toBe(true);
    expect(response.data?.id).toBe('test-trip-uuid');
    expect(response.data?.publicMapAllowed).toBe(false);

    // Ensure raw db fields were excluded
    expect((response.data as any).latitude).toBeUndefined();
    expect((response.data as any).longitude).toBeUndefined();
    expect((response.data as any).verification_status).toBeUndefined();
  });
});
