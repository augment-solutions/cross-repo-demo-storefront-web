'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useUserStore } from '@/store/userStore';
import { authApi } from '@/services/api/auth';
import { useToast } from './useToast';
import type { LoginCredentials, RegisterData } from '@/types/auth';

export function useAuth() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, setUser, isLoading, setIsLoading, clearUser } = useUserStore();

  const { mutate } = useSWR('/api/auth/me', authApi.getCurrentUser, {
    onSuccess: (data) => setUser(data),
    onError: () => clearUser(),
    revalidateOnFocus: false,
  });

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      try {
        const data = await authApi.login(credentials);
        setUser(data.user);
        mutate();
        toast({ type: 'success', title: 'Welcome back!' });
        router.push('/');
        return data;
      } catch (error: any) {
        toast({
          type: 'error',
          title: 'Login failed',
          message: error.message || 'Invalid credentials',
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, setIsLoading, mutate, router, toast]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      setIsLoading(true);
      try {
        const response = await authApi.register(data);
        setUser(response.user);
        mutate();
        toast({ type: 'success', title: 'Account created successfully!' });
        router.push('/');
        return response;
      } catch (error: any) {
        toast({
          type: 'error',
          title: 'Registration failed',
          message: error.message || 'Could not create account',
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, setIsLoading, mutate, router, toast]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
      clearUser();
      mutate(null, false);
      router.push('/');
      toast({ type: 'success', title: 'Logged out successfully' });
    } catch (error) {
      toast({ type: 'error', title: 'Logout failed' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [clearUser, setIsLoading, mutate, router, toast]);

  const forgotPassword = useCallback(
    async (email: string) => {
      setIsLoading(true);
      try {
        await authApi.forgotPassword(email);
        toast({
          type: 'success',
          title: 'Password reset email sent',
          message: 'Check your inbox for instructions',
        });
      } catch (error) {
        toast({ type: 'error', title: 'Failed to send reset email' });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, toast]
  );

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    refresh: mutate,
  };
}

