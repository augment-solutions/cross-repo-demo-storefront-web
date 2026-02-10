'use client';

import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { HeartIcon } from '@heroicons/react/24/outline';

interface EmptyWishlistProps {
  title?: string;
  message?: string;
}

export function EmptyWishlist({
  title = 'Your wishlist is empty',
  message = 'Save items you love by clicking the heart icon on any product.',
}: EmptyWishlistProps) {
  return (
    <div className="text-center py-16 bg-white rounded-lg shadow-sm">
      <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <HeartIcon className="h-10 w-10 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{message}</p>
      <Link href="/products">
        <Button>Browse Products</Button>
      </Link>
    </div>
  );
}

