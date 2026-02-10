'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/formatters';

export function MiniCart() {
  const { items, total } = useCart();

  const displayItems = items.slice(0, 3);
  const remainingCount = items.length - displayItems.length;

  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-secondary-200 bg-white p-4 shadow-xl animate-fade-in">
      {items.length === 0 ? (
        <p className="py-4 text-center text-secondary-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-3">
            {displayItems.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.productId}`}
                className="flex gap-3 rounded-md p-2 hover:bg-secondary-50"
              >
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-secondary-100">
                  <Image
                    src={item.image || '/placeholder-product.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-secondary-900">
                    {item.name}
                  </p>
                  <p className="text-sm text-secondary-500">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {remainingCount > 0 && (
            <p className="mt-2 text-center text-sm text-secondary-500">
              +{remainingCount} more item{remainingCount > 1 ? 's' : ''}
            </p>
          )}

          <div className="mt-4 border-t border-secondary-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-secondary-900">Subtotal</span>
              <span className="font-bold text-secondary-900">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Link href="/cart">
              <Button variant="outline" className="w-full" size="sm">
                View Cart
              </Button>
            </Link>
            <Link href="/checkout">
              <Button className="w-full" size="sm">
                Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

