import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MapSection, DEFAULT_JOURNEY_WAYPOINTS } from '../src/components/MapSection';
import '@testing-library/jest-dom';

describe('MapSection Component (Public UI & Privacy)', () => {
  beforeEach(() => {
    // Mock IntersectionObserver for unit tests
    window.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }));
  });

  test('renders Section title "THE JOURNEY" and regional description without coords', () => {
    render(
      <MapSection 
        title="THE JOURNEY"
        regionDescription="Gavi / Thekkady region — forests, boating, waterfalls and viewpoints."
        publicMapAllowed={true}
      />
    );

    expect(screen.getByRole('heading', { name: /THE JOURNEY/i })).toBeInTheDocument();
    expect(screen.getByText(/Gavi \/ Thekkady region — forests, boating, waterfalls and viewpoints./i)).toBeInTheDocument();

    // Verify NO raw coordinates or verification statements are present
    expect(screen.queryByText(/LOCATION ACCURACY/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/LOCATION_VERIFIED/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/°N/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/°E/i)).not.toBeInTheDocument();
  });

  test('renders all 7 default waypoints with accordion behavior and aria attributes', () => {
    render(<MapSection />);

    // Check all 7 waypoints are listed
    DEFAULT_JOURNEY_WAYPOINTS.forEach((wp) => {
      expect(screen.getByText(wp.title)).toBeInTheDocument();
    });

    // Verify first waypoint is expanded by default
    const firstButton = screen.getByRole('button', { name: new RegExp(DEFAULT_JOURNEY_WAYPOINTS[0].title, 'i') });
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(firstButton).toHaveAttribute('aria-controls', `waypoint-panel-${DEFAULT_JOURNEY_WAYPOINTS[0].id}`);

    // Click second waypoint to expand it
    const secondButton = screen.getByRole('button', { name: new RegExp(DEFAULT_JOURNEY_WAYPOINTS[1].title, 'i') });
    fireEvent.click(secondButton);
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('shows static poster image by default and loads interactive map on user click', async () => {
    render(
      <MapSection 
        publicMapAllowed={true}
        mapQuery="Gavi+Thekkady+Kerala"
      />
    );

    // Initial state shows the poster image and the load button
    const loadButton = screen.getByRole('button', { name: /Load interactive regional map/i });
    expect(loadButton).toBeInTheDocument();

    // Click "Load interactive map" button
    fireEvent.click(loadButton);

    // Wait for the dynamic import to resolve and iframe to appear
    await waitFor(() => {
      const iframe = screen.getByTitle(/Regional map for THE JOURNEY/i);
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('loading', 'lazy');
      expect(iframe).toHaveAttribute('referrerPolicy', 'no-referrer-when-downgrade');
      expect(iframe).toHaveAttribute('src', expect.stringContaining('Gavi%2BThekkady%2BKerala'));
    });
  });

  test('hides "Load interactive map" button when publicMapAllowed is false', () => {
    render(
      <MapSection 
        publicMapAllowed={false}
      />
    );

    // "Load interactive map" button must NOT be rendered when publicMapAllowed is false
    expect(screen.queryByRole('button', { name: /Load interactive regional map/i })).not.toBeInTheDocument();
  });
});
