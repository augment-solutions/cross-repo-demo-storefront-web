import { apiClient } from './client';
import type { Order, OrdersResponse } from '@/types/order';

export const ordersApi = {
  getOrders: async (params: { page?: number; status?: string } = {}): Promise<OrdersResponse> => {
    const response = await apiClient.get<OrdersResponse>('/api/orders', { params });
    return response.data;
  },

  getOrder: async (orderId: string): Promise<Order> => {
    const response = await apiClient.get<Order>(`/api/orders/${orderId}`);
    return response.data;
  },

  cancelOrder: async (orderId: string): Promise<Order> => {
    const response = await apiClient.post<Order>(`/api/orders/${orderId}/cancel`);
    return response.data;
  },

  trackOrder: async (orderId: string): Promise<{ status: string; updates: any[] }> => {
    const response = await apiClient.get<{ status: string; updates: any[] }>(`/api/orders/${orderId}/tracking`);
    return response.data;
  },
};

// Standalone export for direct imports
export const getOrder = ordersApi.getOrder;

