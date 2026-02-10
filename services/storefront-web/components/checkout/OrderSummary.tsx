'use client';

import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { useCheckout } from '@/hooks/useCheckout';
import { formatPrice } from '@/lib/formatters';

export function OrderSummary() {
  const { items } = useCart();
  const { subtotal, shipping, tax, discount, total } = useCheckout();

  return (
    <div className="rounded-lg border border-secondary-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-secondary-900">Order Summary</h2>

      {/* Items */}
      <div className="mt-4 divide-y divide-secondary-200">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 py-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-secondary-100">
              <Image
                src={item.image || '/placeholder-product.jpg'}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-600 text-xs text-white">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-secondary-900">{item.name}</p>
              {item.variant && (
                <p className="text-sm text-secondary-500">{item.variant}</p>
              )}
            </div>
            <p className="font-medium text-secondary-900">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-4 space-y-2 border-t border-secondary-200 pt-4">
        <div className="flex justify-between text-secondary-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-secondary-600">
          <span>Shipping</span>
          <span>{shipping > 0 ? formatPrice(shipping) : 'Free'}</span>
        </div>
        <div className="flex justify-between text-secondary-600">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success-600">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-secondary-200 pt-2">
          <span className="text-lg font-semibold text-secondary-900">Total</span>
          <span className="text-lg font-bold text-secondary-900">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

