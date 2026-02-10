import { apiClient } from './client';
import type { ShippingAddress, ShippingMethod, CreateOrderData } from '@/types/checkout';
import type { Order } from '@/types/order';

export const checkoutApi = {
  validateAddress: async (address: ShippingAddress): Promise<{ valid: boolean }> => {
    const response = await apiClient.post<{ valid: boolean }>('/api/checkout/validate-address', address);
    return response.data;
  },

  getShippingMethods: async (address: ShippingAddress): Promise<ShippingMethod[]> => {
    const response = await apiClient.post<ShippingMethod[]>('/api/checkout/shipping-methods', { address });
    return response.data;
  },

  calculateTax: async (
    subtotal: number,
    shippingAddress: ShippingAddress
  ): Promise<{ tax: number; taxRate: number }> => {
    const response = await apiClient.post<{ tax: number; taxRate: number }>('/api/checkout/calculate-tax', {
      subtotal,
      shippingAddress,
    });
    return response.data;
  },

  createOrder: async (data: CreateOrderData): Promise<Order> => {
    const response = await apiClient.post<Order>('/api/checkout', data);
    return response.data;
  },

  getOrder: async (orderId: string): Promise<Order> => {
    const response = await apiClient.get<Order>(`/api/orders/${orderId}`);
    return response.data;
  },
};

