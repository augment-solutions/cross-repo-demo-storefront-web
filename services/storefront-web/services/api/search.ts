import { apiClient } from './client';
import type { SearchResponse, SearchSuggestionsResponse } from '@/types/search';

export const searchApi = {
  search: async (
    query: string,
    filters: Record<string, string[]> = {},
    page: number = 1,
    sort?: string
  ): Promise<SearchResponse> => {
    const filterParams: Record<string, string> = {};
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        filterParams[key] = values.join(',');
      }
    });

    const response = await apiClient.get<SearchResponse>('/api/search', {
      params: {
        q: query,
        page,
        sort,
        ...filterParams,
      },
    });
    return response.data;
  },

  getSuggestions: async (query: string): Promise<SearchSuggestionsResponse> => {
    const response = await apiClient.get<SearchSuggestionsResponse>('/api/search/suggestions', {
      params: { q: query },
    });
    return response.data;
  },
};

