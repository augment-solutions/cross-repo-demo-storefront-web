import type { ShippingAddress, PaymentMethod } from './checkout';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
  image?: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderStatusUpdate {
  status: OrderStatus;
  timestamp: string;
  message?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  email: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: {
    type: string;
    last4?: string;
  };
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  statusHistory: OrderStatusUpdate[];
  estimatedDelivery: string;
  trackingNumber?: string;
  trackingUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  items: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

