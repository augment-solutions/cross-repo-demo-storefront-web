'use client';

import { useCallback } from 'react';
import { useUIStore } from '@/store/uiStore';

interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export function useToast() {
  const { addToast, removeToast } = useUIStore();

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = crypto.randomUUID();
      addToast({
        id,
        type: options.type || 'info',
        title: options.title,
        message: options.message,
        duration: options.duration || 5000,
      });
      return id;
    },
    [addToast]
  );

  const dismiss = useCallback(
    (id: string) => {
      removeToast(id);
    },
    [removeToast]
  );

  return { toast, dismiss };
}

