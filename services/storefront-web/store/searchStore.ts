import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchState {
  recentSearches: string[];
  popularSearches: string[];
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  setPopularSearches: (searches: string[]) => void;
}

const MAX_RECENT_SEARCHES = 10;

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      recentSearches: [],
      popularSearches: [
        'Summer Collection',
        'Running Shoes',
        'Wireless Earbuds',
        'Organic Skincare',
        'Home Decor',
      ],

      addRecentSearch: (query) =>
        set((state) => {
          const filtered = state.recentSearches.filter(
            (s) => s.toLowerCase() !== query.toLowerCase()
          );
          return {
            recentSearches: [query, ...filtered].slice(0, MAX_RECENT_SEARCHES),
          };
        }),

      removeRecentSearch: (query) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter(
            (s) => s.toLowerCase() !== query.toLowerCase()
          ),
        })),

      clearRecentSearches: () => set({ recentSearches: [] }),

      setPopularSearches: (popularSearches) => set({ popularSearches }),
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
);

