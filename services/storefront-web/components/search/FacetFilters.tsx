'use client';

import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { categoriesApi } from '@/services/api/categories';

interface FacetValue {
  value: string;
  count: number;
  selected?: boolean;
}

interface Facet {
  name: string;
  field: string;
  values: FacetValue[];
}

interface FacetFiltersProps {
  facets?: Facet[];
  onFacetChange?: (field: string, values: string[]) => void;
}

// Static facets for price and rating (these don't need backend data)
const staticFacets: Facet[] = [
  {
    name: 'Price Range',
    field: 'price',
    values: [
      { value: 'Under $5', count: 0 },
      { value: '$5 - $10', count: 0 },
      { value: 'Over $10', count: 0 },
    ],
  },
  {
    name: 'Rating',
    field: 'rating',
    values: [
      { value: '4 Stars & Up', count: 0 },
      { value: '3 Stars & Up', count: 0 },
      { value: '2 Stars & Up', count: 0 },
    ],
  },
];

export function FacetFilters({ facets: propFacets, onFacetChange }: FacetFiltersProps) {
  const [facets, setFacets] = useState<Facet[]>(propFacets || staticFacets);
  const [isLoading, setIsLoading] = useState(!propFacets);
  const [expandedFacets, setExpandedFacets] = useState<Set<string>>(
    new Set(facets.map(f => f.field))
  );

  // Fetch categories from backend if no facets provided
  useEffect(() => {
    if (propFacets) return;

    const fetchCategories = async () => {
      try {
        const categories = await categoriesApi.getCategories();
        const categoryFacet: Facet = {
          name: 'Category',
          field: 'category',
          values: categories.map(cat => ({
            value: cat.name,
            count: cat.productCount || 0,
          })),
        };
        setFacets([categoryFacet, ...staticFacets]);
        setExpandedFacets(new Set(['category', 'price', 'rating']));
      } catch (error) {
        console.error('Failed to fetch categories for filters:', error);
        // Keep static facets on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [propFacets]);

  const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({});

  const toggleFacet = (field: string) => {
    setExpandedFacets(prev => {
      const next = new Set(prev);
      if (next.has(field)) {
        next.delete(field);
      } else {
        next.add(field);
      }
      return next;
    });
  };

  const toggleValue = (field: string, value: string) => {
    const current = selectedValues[field] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    setSelectedValues(prev => ({ ...prev, [field]: updated }));
    onFacetChange?.(field, updated);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="border-b border-gray-200 pb-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-24 mb-2" />
            <div className="space-y-2">
              {[1, 2, 3].map(j => (
                <div key={j} className="h-4 bg-gray-100 rounded animate-pulse w-32" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {facets.map(facet => (
        <div key={facet.field} className="border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleFacet(facet.field)}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="font-medium text-gray-900">{facet.name}</span>
            {expandedFacets.has(facet.field) ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {expandedFacets.has(facet.field) && (
            <div className="mt-2 space-y-2">
              {facet.values.map(fv => (
                <label key={fv.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(selectedValues[facet.field] || []).includes(fv.value)}
                    onChange={() => toggleValue(facet.field, fv.value)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{fv.value}</span>
                  <span className="text-xs text-gray-400">({fv.count})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FacetFilters;

