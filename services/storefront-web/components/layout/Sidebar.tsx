'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: 'left' | 'right';
  className?: string;
}

export function Sidebar({
  isOpen,
  onClose,
  title,
  children,
  position = 'left',
  className,
}: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        className={cn(
          'fixed inset-y-0 z-50 w-full max-w-sm bg-white shadow-xl transition-transform duration-300',
          position === 'left' ? 'left-0' : 'right-0',
          isOpen
            ? 'translate-x-0'
            : position === 'left'
            ? '-translate-x-full'
            : 'translate-x-full',
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-secondary-200 px-4 py-4">
            <h2 className="text-lg font-semibold text-secondary-900">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-secondary-400 hover:bg-secondary-100 hover:text-secondary-600"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </>
  );
}

