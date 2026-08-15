import React from 'react';
import { Filter, X, RotateCcw, Check } from 'lucide-react';
import { TripCategory } from '../types';

export interface FilterState {
  searchTerm: string;
  selectedDestination: string;
  selectedCategory: TripCategory | 'All';
  selectedRegion: string;
  maxPrice: number;
  durationFilter: 'All' | 'Short (1-3 Days)' | 'Medium (4-5 Days)' | 'Long (6+ Days)';
  onlyAvailableSpots: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'duration';
}

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  destinations: string[];
  totalResultsCount: number;
  onReset: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

const CATEGORIES: (TripCategory | 'All')[] = [
  'All',
  'Adventure',
  'Beach',
  'Backpacking',
  'Photography',
  'Food',
  'Nature',
  'Social',
  'Slow Travel'
];

const REGIONS = ['All', 'South India', 'West India', 'North East', 'North India & Himalayas'];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilters,
  destinations,
  totalResultsCount,
  onReset,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  return (
    <div id="filter-panel" className="bg-stone-900 border border-stone-800 rounded-2xl p-5 text-stone-200 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-sm text-stone-100">Filter Trips</h3>
          <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800">
            {totalResultsCount} found
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-reset-filters"
            onClick={onReset}
            className="text-xs text-stone-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          {isMobileDrawer && onCloseMobileDrawer && (
            <button
              id="btn-close-filter-drawer"
              onClick={onCloseMobileDrawer}
              className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category / Travel Style */}
      <div>
        <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2.5">
          Travel Style / Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-cat-${cat}`}
                onClick={() => setFilters(prev => ({ ...prev, selectedCategory: cat }))}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-stone-950 font-bold shadow-md'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Destination Dropdown */}
      <div>
        <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2">
          Destination
        </label>
        <select
          id="filter-destination-select"
          value={filters.selectedDestination}
          onChange={(e) => setFilters(prev => ({ ...prev, selectedDestination: e.target.value }))}
          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="All">All Destinations ({destinations.length})</option>
          {destinations.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div>
        <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2">
          Region
        </label>
        <div className="space-y-1.5">
          {REGIONS.map((r) => {
            const isSelected = filters.selectedRegion === r;
            return (
              <button
                key={r}
                id={`filter-region-${r}`}
                onClick={() => setFilters(prev => ({ ...prev, selectedRegion: r }))}
                className={`w-full text-left text-xs px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 font-bold'
                    : 'bg-stone-950/50 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
              >
                <span>{r}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-stone-300 uppercase tracking-wider">
            Max Budget
          </label>
          <span className="text-xs font-extrabold text-emerald-400 font-mono">
            ₹{filters.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          id="filter-max-price-range"
          type="range"
          min={5000}
          max={25000}
          step={1000}
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-emerald-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
          <span>₹5,000</span>
          <span>₹15,000</span>
          <span>₹25,000</span>
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2">
          Duration
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {(['All', 'Short (1-3 Days)', 'Medium (4-5 Days)', 'Long (6+ Days)'] as const).map((dur) => {
            const isSelected = filters.durationFilter === dur;
            return (
              <button
                key={dur}
                id={`filter-duration-${dur}`}
                onClick={() => setFilters(prev => ({ ...prev, durationFilter: dur }))}
                className={`text-[11px] px-2.5 py-2 rounded-xl text-center font-medium transition-colors ${
                  isSelected
                    ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-700 font-bold'
                    : 'bg-stone-950/60 text-stone-400 hover:bg-stone-800'
                }`}
              >
                {dur}
              </button>
            );
          })}
        </div>
      </div>

      {/* Only Open Spots Toggle */}
      <div className="pt-2 border-t border-stone-800">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-medium text-stone-300">
            Only show trips with open spots
          </span>
          <input
            id="filter-only-open-spots-checkbox"
            type="checkbox"
            checked={filters.onlyAvailableSpots}
            onChange={(e) => setFilters(prev => ({ ...prev, onlyAvailableSpots: e.target.checked }))}
            className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
          />
        </label>
      </div>

      {isMobileDrawer && (
        <button
          id="btn-apply-mobile-filters"
          onClick={onCloseMobileDrawer}
          className="w-full py-3 bg-emerald-600 text-stone-950 font-bold rounded-xl text-xs text-center shadow-lg"
        >
          Show {totalResultsCount} Results
        </button>
      )}
    </div>
  );
};
