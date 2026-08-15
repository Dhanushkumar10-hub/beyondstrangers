import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  Filter as FilterIcon, 
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowUpRight
} from 'lucide-react';
import { Trip, TripCategory } from '../types';
import { TripCard } from '../components/TripCard';
import { FilterPanel, FilterState } from '../components/FilterPanel';

interface ExploreViewProps {
  trips: Trip[];
  destinations: string[];
  onSelectTrip: (trip: Trip) => void;
  onBookNow: (trip: Trip) => void;
  savedTripIds: string[];
  onToggleSaveTrip: (tripId: string) => void;
  initialSearchTerm?: string;
  initialCategory?: string;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  trips,
  destinations,
  onSelectTrip,
  onBookNow,
  savedTripIds,
  onToggleSaveTrip,
  initialSearchTerm = '',
  initialCategory = 'All'
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: initialSearchTerm,
    selectedDestination: 'All',
    selectedCategory: (initialCategory as TripCategory) || 'All',
    selectedRegion: 'All',
    maxPrice: 25000,
    durationFilter: 'All',
    onlyAvailableSpots: false,
    sortBy: 'featured'
  });

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      selectedDestination: 'All',
      selectedCategory: 'All',
      selectedRegion: 'All',
      maxPrice: 25000,
      durationFilter: 'All',
      onlyAvailableSpots: false,
      sortBy: 'featured'
    });
  };

  // Filtered and sorted trips calculation
  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      // Search term
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        const matchesTitle = trip.title.toLowerCase().includes(term);
        const matchesDest = trip.destination.toLowerCase().includes(term);
        const matchesCat = trip.category.toLowerCase().includes(term);
        if (!matchesTitle && !matchesDest && !matchesCat) return false;
      }

      // Destination
      if (filters.selectedDestination !== 'All') {
        if (!trip.destination.toLowerCase().includes(filters.selectedDestination.toLowerCase())) {
          return false;
        }
      }

      // Category
      if (filters.selectedCategory !== 'All') {
        if (trip.category !== filters.selectedCategory) return false;
      }

      // Region
      if (filters.selectedRegion !== 'All') {
        if (trip.region !== filters.selectedRegion) return false;
      }

      // Price
      if (trip.price > filters.maxPrice) return false;

      // Duration
      if (filters.durationFilter === 'Short (1-3 Days)') {
        if (trip.durationDays > 3) return false;
      } else if (filters.durationFilter === 'Medium (4-5 Days)') {
        if (trip.durationDays < 4 || trip.durationDays > 5) return false;
      } else if (filters.durationFilter === 'Long (6+ Days)') {
        if (trip.durationDays < 6) return false;
      }

      // Available spots
      if (filters.onlyAvailableSpots) {
        if (trip.spotsTaken >= trip.totalSpots) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'duration') return b.durationDays - a.durationDays;
      // Default featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [trips, filters]);

  return (
    <div id="explore-view-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Title Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="bg-emerald-950 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-800 inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Group Trip Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100">
            Discover Your Next Group Escape
          </h1>
          <p className="text-xs sm:text-sm text-stone-300">
            Browse small-group trips hosted by vetted trip leaders. Search by destination, budget, or travel style.
          </p>
        </div>
      </div>

      {/* Main Exploration Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              destinations={destinations}
              totalResultsCount={filteredTrips.length}
              onReset={resetFilters}
            />
          </div>
        </div>

        {/* Trips Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Control Bar: Search Input, Mobile Filter Drawer Toggle, View Modes, Sort */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Bar Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                id="explore-search-input"
                type="text"
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                placeholder="Search trip name, destination, category..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Mobile Filter Button */}
            <button
              id="btn-open-mobile-filter-drawer"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden w-full sm:w-auto px-4 py-2 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters ({filteredTrips.length})</span>
            </button>

            {/* Right Controls: Sort Dropdown & View Mode Toggle */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
              
              {/* Sort selector */}
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <select
                  id="explore-sort-select"
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated (Demo)</option>
                  <option value="duration">Longest Duration</option>
                </select>
              </div>

              {/* Grid/List View Toggle */}
              <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
                <button
                  id="btn-view-grid"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-emerald-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  id="btn-view-list"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-emerald-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-stone-400 px-1">
            <span>Showing <strong className="text-stone-200">{filteredTrips.length}</strong> group trips</span>
            {filters.selectedCategory !== 'All' && (
              <span className="bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-800 font-medium">
                Category: {filters.selectedCategory}
              </span>
            )}
          </div>

          {/* Empty State */}
          {filteredTrips.length === 0 ? (
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-12 text-center space-y-4">
              <FilterIcon className="w-10 h-10 text-stone-600 mx-auto" />
              <h3 className="text-lg font-bold text-stone-200">No group trips match your filters</h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Try widening your search budget, selecting a different category, or resetting all filters.
              </p>
              <button
                onClick={resetFilters}
                className="bg-emerald-600 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Trips Grid or List View */
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredTrips.map((trip) => {
                if (viewMode === 'list') {
                  const spotsLeft = trip.totalSpots - trip.spotsTaken;
                  return (
                    <div
                      key={trip.id}
                      id={`trip-list-row-${trip.id}`}
                      className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          src={trip.heroImage}
                          alt={trip.title}
                          className="w-24 h-24 rounded-xl object-cover shrink-0"
                        />
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 uppercase">
                            {trip.category}
                          </span>
                          <h4 
                            onClick={() => onSelectTrip(trip)}
                            className="font-bold text-stone-100 text-sm hover:text-emerald-400 cursor-pointer line-clamp-1"
                          >
                            {trip.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-stone-400">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> {trip.destination}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-stone-400" /> {trip.durationDays}D/{trip.durationNights}N</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-0 border-stone-800 pt-3 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <span className="text-base font-extrabold text-stone-100 font-mono block">
                            ₹{trip.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-stone-400">{spotsLeft} spots left</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectTrip(trip)}
                            className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onBookNow(trip)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-stone-950 rounded-xl text-xs font-bold flex items-center gap-1"
                          >
                            <span>Join</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    onSelectTrip={onSelectTrip}
                    onBookNow={onBookNow}
                    isSaved={savedTripIds.includes(trip.id)}
                    onToggleSave={onToggleSaveTrip}
                  />
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filter Drawer Overlay */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end lg:hidden">
          <div className="w-full max-w-sm bg-stone-900 h-full p-6 overflow-y-auto">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              destinations={destinations}
              totalResultsCount={filteredTrips.length}
              onReset={resetFilters}
              isMobileDrawer
              onCloseMobileDrawer={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};
