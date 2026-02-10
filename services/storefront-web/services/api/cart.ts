import { apiClient } from './client';
import type { Cart, CartItem } from '@/types/cart';

export const cartApi = {
  getCart: async (): Promise<Cart> => {
    const response = await apiClient.get<Cart>('/api/cart');
    return response.data;
  },

  addItem: async (
    productId: string,
    quantity: number = 1,
    variantId?: string
  ): Promise<Cart> => {
    const response = await apiClient.post<Cart>('/api/cart', {
      productId,
      quantity,
      variantId,
    });
    return response.data;
  },

  updateItem: async (itemId: string, quantity: number): Promise<Cart> => {
    const response = await apiClient.patch<Cart>(`/api/cart/${itemId}`, {
      quantity,
    });
    return response.data;
  },

  removeItem: async (itemId: string): Promise<Cart> => {
    const response = await apiClient.delete<Cart>(`/api/cart/${itemId}`);
    return response.data;
  },

  clearCart: async (): Promise<void> => {
    await apiClient.delete('/api/cart');
  },

  applyPromoCode: async (code: string): Promise<Cart> => {
    const response = await apiClient.post<Cart>('/api/cart/promo', { code });
    return response.data;
  },

  removePromoCode: async (): Promise<Cart> => {
    const response = await apiClient.delete<Cart>('/api/cart/promo');
    return response.data;
  },
};

