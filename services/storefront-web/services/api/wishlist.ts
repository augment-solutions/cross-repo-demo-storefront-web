import { apiClient } from './client';
import type { Wishlist, WishlistItem } from '@/types/wishlist';

export const wishlistApi = {
  getWishlist: async (): Promise<Wishlist> => {
    const response = await apiClient.get<Wishlist>('/api/wishlist');
    return response.data;
  },

  addItem: async (productId: string): Promise<Wishlist> => {
    const response = await apiClient.post<Wishlist>('/api/wishlist', { productId });
    return response.data;
  },

  removeItem: async (productId: string): Promise<Wishlist> => {
    const response = await apiClient.delete<Wishlist>(`/api/wishlist/${productId}`);
    return response.data;
  },

  clearWishlist: async (): Promise<void> => {
    await apiClient.delete('/api/wishlist');
  },

  moveToCart: async (productId: string): Promise<void> => {
    await apiClient.post(`/api/wishlist/${productId}/move-to-cart`);
  },
};

