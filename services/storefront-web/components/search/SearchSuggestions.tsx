'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, TrendingUp, Search, X } from 'lucide-react';
import { useSearchSuggestions } from '@/hooks/api/useSearch';
import { useSearchStore } from '@/store/searchStore';
import { formatPrice } from '@/lib/formatters';

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
}

export function SearchSuggestions({ query, onSelect }: SearchSuggestionsProps) {
  const { recentSearches, popularSearches, removeRecentSearch, clearRecentSearches } = useSearchStore();
  const { data, isLoading } = useSearchSuggestions(query);

  const suggestions = data?.suggestions || [];
  const products = data?.products || [];

  if (!query) {
    return (
      <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border border-secondary-200 bg-white shadow-xl">
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-secondary-900">Recent Searches</h3>
              <button onClick={clearRecentSearches} className="text-xs text-secondary-500 hover:text-secondary-700">Clear all</button>
            </div>
            <ul className="mt-2 space-y-1">
              {recentSearches.slice(0, 5).map((search) => (
                <li key={search} className="flex items-center justify-between">
                  <button onClick={() => onSelect(search)} className="flex items-center gap-2 py-1 text-sm text-secondary-600 hover:text-secondary-900">
                    <Clock className="h-4 w-4" />
                    {search}
                  </button>
                  <button onClick={() => removeRecentSearch(search)} className="p-1 text-secondary-400 hover:text-secondary-600" aria-label="Remove">
                    <X className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Popular Searches */}
        {popularSearches.length > 0 && (
          <div className="border-t border-secondary-200 p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium text-secondary-900">
              <TrendingUp className="h-4 w-4" />
              Popular Searches
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button key={search} onClick={() => onSelect(search)} className="rounded-full bg-secondary-100 px-3 py-1 text-sm text-secondary-700 hover:bg-secondary-200">
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border border-secondary-200 bg-white p-4 shadow-xl">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (<div key={i} className="h-4 w-3/4 rounded bg-secondary-200" />))}
        </div>
      </div>
    );
  }

  if (suggestions.length === 0 && products.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border border-secondary-200 bg-white shadow-xl">
      {suggestions.length > 0 && (
        <ul className="border-b border-secondary-200 p-2">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>
              <button onClick={() => onSelect(suggestion)} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50">
                <Search className="h-4 w-4 text-secondary-400" />
                <span dangerouslySetInnerHTML={{ __html: suggestion.replace(new RegExp(`(${query})`, 'gi'), '<strong>$1</strong>') }} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {products.length > 0 && (
        <div className="p-2">
          <h4 className="px-3 py-1 text-xs font-medium uppercase text-secondary-500">Products</h4>
          {products.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-secondary-50">
              <div className="relative h-10 w-10 overflow-hidden rounded bg-secondary-100">
                <Image src={product.image || '/placeholder-product.jpg'} alt="" fill className="object-cover" sizes="40px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-secondary-900">{product.name}</p>
                <p className="text-sm text-primary-600">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

