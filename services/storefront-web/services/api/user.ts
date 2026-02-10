import { apiClient } from './client';
import type { User, UpdateProfileData, Address } from '@/types/user';

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/api/user');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    const response = await apiClient.patch<User>('/api/user', data);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await apiClient.post('/api/user/change-password', {
      currentPassword,
      newPassword,
    });
  },

  getAddresses: async (): Promise<Address[]> => {
    const response = await apiClient.get<Address[]>('/api/user/addresses');
    return response.data;
  },

  addAddress: async (address: Omit<Address, 'id'>): Promise<Address> => {
    const response = await apiClient.post<Address>('/api/user/addresses', address);
    return response.data;
  },

  updateAddress: async (addressId: string, address: Partial<Address>): Promise<Address> => {
    const response = await apiClient.patch<Address>(`/api/user/addresses/${addressId}`, address);
    return response.data;
  },

  deleteAddress: async (addressId: string): Promise<void> => {
    await apiClient.delete(`/api/user/addresses/${addressId}`);
  },

  setDefaultAddress: async (addressId: string): Promise<void> => {
    await apiClient.post(`/api/user/addresses/${addressId}/default`);
  },

  deleteAccount: async (): Promise<void> => {
    await apiClient.delete('/api/user');
  },
};

