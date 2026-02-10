import useSWR from 'swr';
import { searchApi } from '@/services/api/search';
import type { SearchResponse, SearchSuggestionsResponse } from '@/types/search';

export function useSearch(query: string, filters: Record<string, string[]> = {}) {
  const filterString = Object.entries(filters)
    .flatMap(([key, values]) => values.map((v) => `${key}=${v}`))
    .join('&');

  return useSWR<SearchResponse>(
    query ? `/api/search?q=${encodeURIComponent(query)}&${filterString}` : null,
    () => searchApi.search(query, filters),
    {
      revalidateOnFocus: false,
    }
  );
}

export function useSearchSuggestions(query: string) {
  return useSWR<SearchSuggestionsResponse>(
    query && query.length >= 2 ? `/api/search/suggestions?q=${encodeURIComponent(query)}` : null,
    () => searchApi.getSuggestions(query),
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000,
    }
  );
}

