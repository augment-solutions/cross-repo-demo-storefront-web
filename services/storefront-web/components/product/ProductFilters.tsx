'use client';

import { useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  filters?: FilterGroup[];
  selectedFilters?: Record<string, string[]>;
  onFilterChange?: (filters: Record<string, string[]>) => void;
}

const defaultFilters: FilterGroup[] = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { id: 'electronics', label: 'Electronics', count: 42 },
      { id: 'clothing', label: 'Clothing', count: 128 },
      { id: 'home', label: 'Home & Garden', count: 56 },
    ],
  },
  {
    id: 'price',
    name: 'Price Range',
    options: [
      { id: 'under-25', label: 'Under $25' },
      { id: '25-50', label: '$25 - $50' },
      { id: '50-100', label: '$50 - $100' },
      { id: 'over-100', label: 'Over $100' },
    ],
  },
];

export function ProductFilters({ filters = defaultFilters, selectedFilters = {}, onFilterChange }: ProductFiltersProps) {
  const [selected, setSelected] = useState<Record<string, string[]>>(selectedFilters);
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (groupId: string, optionId: string) => {
    const current = selected[groupId] || [];
    const updated = current.includes(optionId)
      ? current.filter(id => id !== optionId)
      : [...current, optionId];
    
    const newSelected = { ...selected, [groupId]: updated };
    setSelected(newSelected);
    onFilterChange?.(newSelected);
  };

  const clearFilters = () => {
    setSelected({});
    onFilterChange?.({});
  };

  const hasActiveFilters = Object.values(selected).some(arr => arr.length > 0);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <FunnelIcon className="w-5 h-5" />
        Filters
        {hasActiveFilters && (
          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
            {Object.values(selected).flat().length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700">
                Clear all
              </button>
            )}
            <button onClick={() => setIsOpen(false)} className="p-1 text-gray-400 hover:text-gray-500">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          {filters.map(group => (
            <div key={group.id} className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">{group.name}</h4>
              <div className="space-y-2">
                {group.options.map(option => (
                  <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(selected[group.id] || []).includes(option.id)}
                      onChange={() => toggleFilter(group.id, option.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-xs text-gray-400">({option.count})</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductFilters;

