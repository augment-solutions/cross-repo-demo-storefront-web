import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WishlistItem } from '@/types/wishlist';

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  setItems: (items: WishlistItem[]) => void;
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      isLoading: false,

      setItems: (items) => set({ items }),

      addItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.productId === item.productId)) {
            return state;
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      clearWishlist: () => set({ items: [] }),

      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

