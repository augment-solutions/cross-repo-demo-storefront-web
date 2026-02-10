'use client';

import { useCallback } from 'react';
import useSWR from 'swr';
import { useWishlistStore } from '@/store/wishlistStore';
import { wishlistApi } from '@/services/api/wishlist';
import { useToast } from './useToast';

export function useWishlist() {
  const { items, setItems, isLoading, setIsLoading } = useWishlistStore();
  const { toast } = useToast();

  const { mutate } = useSWR('/api/wishlist', wishlistApi.getWishlist, {
    onSuccess: (data) => setItems(data.items),
    revalidateOnFocus: false,
  });

  const addItem = useCallback(
    async (productId: string) => {
      setIsLoading(true);
      try {
        const updatedWishlist = await wishlistApi.addItem(productId);
        setItems(updatedWishlist.items);
        mutate();
        toast({ type: 'success', title: 'Added to wishlist' });
      } catch (error) {
        toast({ type: 'error', title: 'Failed to add to wishlist' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setItems, setIsLoading, mutate, toast]
  );

  const removeItem = useCallback(
    async (productId: string) => {
      setIsLoading(true);
      try {
        const updatedWishlist = await wishlistApi.removeItem(productId);
        setItems(updatedWishlist.items);
        mutate();
        toast({ type: 'success', title: 'Removed from wishlist' });
      } catch (error) {
        toast({ type: 'error', title: 'Failed to remove from wishlist' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setItems, setIsLoading, mutate, toast]
  );

  const toggleItem = useCallback(
    async (productId: string) => {
      const isInList = items.some((item) => item.productId === productId);
      if (isInList) {
        await removeItem(productId);
      } else {
        await addItem(productId);
      }
    },
    [items, addItem, removeItem]
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return items.some((item) => item.productId === productId);
    },
    [items]
  );

  const clearWishlist = useCallback(async () => {
    setIsLoading(true);
    try {
      await wishlistApi.clearWishlist();
      setItems([]);
      mutate();
    } catch (error) {
      toast({ type: 'error', title: 'Failed to clear wishlist' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setItems, setIsLoading, mutate, toast]);

  return {
    items,
    itemCount: items.length,
    isLoading,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    clearWishlist,
    refresh: mutate,
  };
}

