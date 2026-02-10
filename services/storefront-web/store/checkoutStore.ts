import { create } from 'zustand';
import type { ShippingAddress, PaymentMethod, ShippingMethod } from '@/types/checkout';

interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  shippingMethod: ShippingMethod | null;
  isLoading: boolean;
  setShippingAddress: (address: ShippingAddress | null) => void;
  setPaymentMethod: (method: PaymentMethod | null) => void;
  setShippingMethod: (method: ShippingMethod | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState = {
  shippingAddress: null,
  paymentMethod: null,
  shippingMethod: null,
  isLoading: false,
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  ...initialState,

  setShippingAddress: (shippingAddress) => set({ shippingAddress }),

  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),

  setShippingMethod: (shippingMethod) => set({ shippingMethod }),

  setIsLoading: (isLoading) => set({ isLoading }),

  reset: () => set(initialState),
}));

