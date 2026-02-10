'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckoutStore } from '@/store/checkoutStore';
import { checkoutApi } from '@/services/api/checkout';
import { useCart } from './useCart';
import { useToast } from './useToast';
import type { ShippingAddress, PaymentMethod } from '@/types/checkout';

export function useCheckout() {
  const router = useRouter();
  const { toast } = useToast();
  const { items, total: cartTotal, clearCart } = useCart();
  const {
    shippingAddress,
    paymentMethod,
    shippingMethod,
    isLoading,
    setShippingAddress: setStoreShippingAddress,
    setPaymentMethod: setStorePaymentMethod,
    setShippingMethod: setStoreShippingMethod,
    setIsLoading,
    reset,
  } = useCheckoutStore();

  const setShippingAddress = useCallback(
    async (address: ShippingAddress) => {
      setIsLoading(true);
      try {
        await checkoutApi.validateAddress(address);
        setStoreShippingAddress(address);
      } catch (error) {
        toast({ type: 'error', title: 'Invalid address' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setStoreShippingAddress, setIsLoading, toast]
  );

  const setPaymentMethod = useCallback(
    async (method: PaymentMethod) => {
      setIsLoading(true);
      try {
        setStorePaymentMethod(method);
      } finally {
        setIsLoading(false);
      }
    },
    [setStorePaymentMethod, setIsLoading]
  );

  const processPayment = useCallback(async () => {
    if (!shippingAddress || !paymentMethod) {
      throw new Error('Missing checkout information');
    }

    setIsLoading(true);
    try {
      const order = await checkoutApi.createOrder({
        items,
        shippingAddress,
        paymentMethod,
        shippingMethod,
      });

      await clearCart();
      reset();

      router.push(`/checkout/confirmation?orderId=${order.id}`);
      return order;
    } catch (error) {
      toast({ type: 'error', title: 'Payment failed. Please try again.' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [
    shippingAddress,
    paymentMethod,
    shippingMethod,
    items,
    clearCart,
    reset,
    router,
    toast,
    setIsLoading,
  ]);

  // Calculate totals
  const subtotal = cartTotal;
  const shippingCost = shippingMethod?.price || 0;
  const taxRate = 0.08; // 8% tax
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const discount = 0; // Could be from promo codes
  const total = subtotal + shippingCost + tax - discount;

  return {
    shippingAddress,
    paymentMethod,
    shippingMethod,
    subtotal,
    shipping: shippingCost,
    tax,
    discount,
    total,
    isLoading,
    setShippingAddress,
    setPaymentMethod,
    setShippingMethod: setStoreShippingMethod,
    processPayment,
    reset,
  };
}

