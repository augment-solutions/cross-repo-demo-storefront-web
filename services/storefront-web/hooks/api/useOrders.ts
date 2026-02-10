import useSWR from 'swr';
import { ordersApi } from '@/services/api/orders';
import type { Order, OrdersResponse } from '@/types/order';

export function useOrders(params: { page?: number; status?: string } = {}) {
  const queryString = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  return useSWR<OrdersResponse>(
    `/api/orders?${queryString}`,
    () => ordersApi.getOrders(params),
    {
      revalidateOnFocus: false,
    }
  );
}

export function useOrder(orderId: string | undefined) {
  return useSWR<Order>(
    orderId ? `/api/orders/${orderId}` : null,
    () => ordersApi.getOrder(orderId!),
    {
      revalidateOnFocus: false,
    }
  );
}

