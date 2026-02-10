'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { formatPrice } from '@/lib/formatters';
import type { WishlistItem } from '@/types/wishlist';
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';

interface WishlistGridProps {
  items: WishlistItem[];
  onRemove: (productId: string) => void;
  onAddToCart: (item: WishlistItem) => void;
  isLoading?: boolean;
}

export function WishlistGrid({
  items,
  onRemove,
  onAddToCart,
  isLoading,
}: WishlistGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden group"
        >
          <Link href={`/products/${item.productId}`}>
            <div className="relative aspect-square bg-gray-100">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
              {item.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
          </Link>

          <div className="p-4">
            <Link
              href={`/products/${item.productId}`}
              className="font-medium text-gray-900 hover:text-primary-600 line-clamp-2"
            >
              {item.name}
            </Link>

            <div className="mt-2 flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                {formatPrice(item.price)}
              </span>
              {item.compareAtPrice && item.compareAtPrice > item.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(item.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                onClick={() => onAddToCart(item)}
                disabled={item.stock === 0 || isLoading}
                className="flex-1"
                size="sm"
              >
                <ShoppingCartIcon className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.productId)}
                disabled={isLoading}
                className="text-red-600 hover:text-red-700"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

