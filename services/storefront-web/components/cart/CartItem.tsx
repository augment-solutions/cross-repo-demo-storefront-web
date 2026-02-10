'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/formatters';
import type { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  compact?: boolean;
}

export function CartItem({ item, compact = false }: CartItemProps) {
  const { updateQuantity, removeItem, isLoading } = useCart();

  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className={`flex gap-4 py-4 ${compact ? 'py-3' : ''}`}>
      {/* Image */}
      <Link
        href={`/products/${item.productId}`}
        className={`relative flex-shrink-0 overflow-hidden rounded-md bg-secondary-100 ${
          compact ? 'h-16 w-16' : 'h-24 w-24'
        }`}
      >
        <Image
          src={item.image || '/placeholder-product.jpg'}
          alt={item.name}
          fill
          className="object-cover"
          sizes={compact ? '64px' : '96px'}
        />
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link
              href={`/products/${item.productId}`}
              className="font-medium text-secondary-900 hover:text-primary-600"
            >
              {item.name}
            </Link>
            {item.variant && (
              <p className="mt-0.5 text-sm text-secondary-500">{item.variant}</p>
            )}
          </div>
          <button
            onClick={handleRemove}
            disabled={isLoading}
            className="text-secondary-400 hover:text-error-500 disabled:opacity-50"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center rounded-md border border-secondary-200">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={isLoading}
              className="p-1.5 text-secondary-600 hover:bg-secondary-50 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={isLoading || item.quantity >= item.maxQuantity}
              className="p-1.5 text-secondary-600 hover:bg-secondary-50 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-medium text-secondary-900">
              {formatPrice(item.price * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="text-sm text-secondary-500">
                {formatPrice(item.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

