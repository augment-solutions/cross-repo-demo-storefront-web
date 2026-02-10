'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        'flex items-start gap-2 p-3 rounded-lg bg-red-50 text-red-700',
        className
      )}
      role="alert"
    >
      <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

