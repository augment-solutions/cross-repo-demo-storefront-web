'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface Filter {
  id: string;
  name: string;
  options: FilterOption[];
}

interface SearchFiltersProps {
  filters: Filter[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, values: string[]) => void;
  onClearAll: () => void;
}

export function SearchFilters({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
}: SearchFiltersProps) {
  const [expandedFilters, setExpandedFilters] = useState<string[]>(filters.map((f) => f.id));

  const toggleExpanded = (filterId: string) => {
    setExpandedFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  };

  const handleOptionToggle = (filterId: string, value: string) => {
    const current = activeFilters[filterId] || [];
    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(filterId, newValues);
  };

  const activeCount = Object.values(activeFilters).flat().length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-secondary-900">Filters</h2>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear All ({activeCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([filterId, values]) =>
            values.map((value) => (
              <button
                key={`${filterId}-${value}`}
                onClick={() => handleOptionToggle(filterId, value)}
                className="flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700 hover:bg-primary-100"
              >
                {value}
                <X className="h-3 w-3" />
              </button>
            ))
          )}
        </div>
      )}

      {/* Filter Groups */}
      <div className="divide-y divide-secondary-200">
        {filters.map((filter) => (
          <div key={filter.id} className="py-4">
            <button
              onClick={() => toggleExpanded(filter.id)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="font-medium text-secondary-900">{filter.name}</span>
              <ChevronDown
                className={cn('h-5 w-5 text-secondary-400 transition-transform', expandedFilters.includes(filter.id) && 'rotate-180')}
              />
            </button>
            {expandedFilters.includes(filter.id) && (
              <div className="mt-3 space-y-2">
                {filter.options.map((option) => {
                  const isChecked = activeFilters[filter.id]?.includes(option.value);
                  return (
                    <label key={option.value} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleOptionToggle(filter.id, option.value)}
                        className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="flex-1 text-sm text-secondary-700">{option.label}</span>
                      {option.count !== undefined && (
                        <span className="text-sm text-secondary-400">({option.count})</span>
                      )}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

