'use client';

import { useCallback } from 'react';
import useSWR from 'swr';
import { useCartStore } from '@/store/cartStore';
import { cartApi } from '@/services/api/cart';
import { useToast } from '@/hooks/useToast';

export function useCart() {
  const { items, setItems, isLoading, setIsLoading } = useCartStore();
  const { toast } = useToast();

  const { data, mutate } = useSWR('/api/cart', cartApi.getCart, {
    onSuccess: (data) => setItems(data.items),
    revalidateOnFocus: false,
  });

  const addItem = useCallback(
    async (productId: string, quantity: number = 1, variantId?: string) => {
      setIsLoading(true);
      try {
        const updatedCart = await cartApi.addItem(productId, quantity, variantId);
        setItems(updatedCart.items);
        mutate();
        toast({ type: 'success', title: 'Added to cart' });
      } catch (error) {
        toast({ type: 'error', title: 'Failed to add item to cart' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setItems, setIsLoading, mutate, toast]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      setIsLoading(true);
      try {
        const updatedCart = await cartApi.updateItem(itemId, quantity);
        setItems(updatedCart.items);
        mutate();
      } catch (error) {
        toast({ type: 'error', title: 'Failed to update quantity' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setItems, setIsLoading, mutate, toast]
  );

  const removeItem = useCallback(
    async (itemId: string) => {
      setIsLoading(true);
      try {
        const updatedCart = await cartApi.removeItem(itemId);
        setItems(updatedCart.items);
        mutate();
        toast({ type: 'success', title: 'Item removed from cart' });
      } catch (error) {
        toast({ type: 'error', title: 'Failed to remove item' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setItems, setIsLoading, mutate, toast]
  );

  const clearCart = useCallback(async () => {
    setIsLoading(true);
    try {
      await cartApi.clearCart();
      setItems([]);
      mutate();
    } catch (error) {
      toast({ type: 'error', title: 'Failed to clear cart' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setItems, setIsLoading, mutate, toast]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items,
    itemCount,
    total,
    shipping: data?.shipping || 0,
    tax: data?.tax || 0,
    discount: data?.discount || 0,
    isLoading,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    refresh: mutate,
  };
}

