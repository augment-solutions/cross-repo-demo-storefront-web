'use client';

import { useCallback } from 'react';
import useSWR from 'swr';
import { useUserStore } from '@/store/userStore';
import { userApi } from '@/services/api/user';
import { useToast } from './useToast';
import type { UpdateProfileData, Address } from '@/types/user';

export function useUser() {
  const { user, setUser, isLoading, setIsLoading } = useUserStore();
  const { toast } = useToast();

  const { data: addresses = [], mutate: mutateAddresses } = useSWR(
    user ? '/api/user/addresses' : null,
    userApi.getAddresses,
    { revalidateOnFocus: false }
  );

  const updateProfile = useCallback(
    async (data: UpdateProfileData) => {
      setIsLoading(true);
      try {
        const updatedUser = await userApi.updateProfile(data);
        setUser(updatedUser);
        toast({ type: 'success', title: 'Profile updated successfully' });
        return updatedUser;
      } catch (error) {
        toast({ type: 'error', title: 'Failed to update profile' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, setIsLoading, toast]
  );

  const addAddress = useCallback(
    async (address: Omit<Address, 'id'>) => {
      setIsLoading(true);
      try {
        await userApi.addAddress(address);
        mutateAddresses();
        toast({ type: 'success', title: 'Address added successfully' });
      } catch (error) {
        toast({ type: 'error', title: 'Failed to add address' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, mutateAddresses, toast]
  );

  const updateAddress = useCallback(
    async (addressId: string, address: Partial<Address>) => {
      setIsLoading(true);
      try {
        await userApi.updateAddress(addressId, address);
        mutateAddresses();
        toast({ type: 'success', title: 'Address updated successfully' });
      } catch (error) {
        toast({ type: 'error', title: 'Failed to update address' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, mutateAddresses, toast]
  );

  const deleteAddress = useCallback(
    async (addressId: string) => {
      setIsLoading(true);
      try {
        await userApi.deleteAddress(addressId);
        mutateAddresses();
        toast({ type: 'success', title: 'Address deleted successfully' });
      } catch (error) {
        toast({ type: 'error', title: 'Failed to delete address' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, mutateAddresses, toast]
  );

  const setDefaultAddress = useCallback(
    async (addressId: string) => {
      setIsLoading(true);
      try {
        await userApi.setDefaultAddress(addressId);
        mutateAddresses();
        toast({ type: 'success', title: 'Default address updated' });
      } catch (error) {
        toast({ type: 'error', title: 'Failed to set default address' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, mutateAddresses, toast]
  );

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    addresses,
    isLoading,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
}

