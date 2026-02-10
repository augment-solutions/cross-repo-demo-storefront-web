'use client';

import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/formatters';

interface CartSummaryProps {
  showPromoCode?: boolean;
}

export function CartSummary({ showPromoCode = true }: CartSummaryProps) {
  const { total, itemCount, shipping, tax, discount } = useCart();

  const subtotal = total;
  const shippingCost = shipping || 0;
  const taxAmount = tax || 0;
  const discountAmount = discount || 0;
  const grandTotal = subtotal + shippingCost + taxAmount - discountAmount;

  return (
    <div className="rounded-lg border border-secondary-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-secondary-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-secondary-600">
          <span>Subtotal ({itemCount} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {shippingCost > 0 && (
          <div className="flex justify-between text-secondary-600">
            <span>Shipping</span>
            <span>{formatPrice(shippingCost)}</span>
          </div>
        )}

        {taxAmount > 0 && (
          <div className="flex justify-between text-secondary-600">
            <span>Tax</span>
            <span>{formatPrice(taxAmount)}</span>
          </div>
        )}

        {discountAmount > 0 && (
          <div className="flex justify-between text-success-600">
            <span>Discount</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        {showPromoCode && (
          <div className="border-t border-secondary-200 pt-4">
            <label
              htmlFor="promo-code"
              className="block text-sm font-medium text-secondary-700"
            >
              Promo Code
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                id="promo-code"
                className="flex-1 rounded-md border border-secondary-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter code"
              />
              <Button variant="outline" size="sm">
                Apply
              </Button>
            </div>
          </div>
        )}

        <div className="border-t border-secondary-200 pt-4">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-secondary-900">Total</span>
            <span className="text-lg font-bold text-secondary-900">
              {formatPrice(grandTotal)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Link href="/checkout">
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="mt-6 text-center text-sm text-secondary-500">
        <p>Free shipping on orders over $50</p>
      </div>
    </div>
  );
}

