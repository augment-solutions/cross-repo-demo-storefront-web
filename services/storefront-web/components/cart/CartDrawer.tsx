'use client';

import Link from 'next/link';
import { X, ShoppingBag } from 'lucide-react';
import { CartItem } from './CartItem';
import { Button } from '@/components/common/Button';
import { useCart } from '@/hooks/useCart';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/formatters';

export function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const { items, total, itemCount, isLoading } = useCart();

  if (!isCartDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={closeCartDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-secondary-200 px-4 py-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-secondary-900">
            <ShoppingBag className="h-5 w-5" />
            Cart ({itemCount})
          </h2>
          <button
            onClick={closeCartDrawer}
            className="rounded-md p-2 text-secondary-400 hover:bg-secondary-100 hover:text-secondary-600"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <ShoppingBag className="h-16 w-16 text-secondary-300" />
              <p className="mt-4 text-lg font-medium text-secondary-900">
                Your cart is empty
              </p>
              <p className="mt-1 text-secondary-500">
                Add some items to get started
              </p>
              <Link href="/products" onClick={closeCartDrawer}>
                <Button className="mt-6">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-secondary-200">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-secondary-200 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-secondary-900">Subtotal</span>
              <span className="text-lg font-bold text-secondary-900">{formatPrice(total)}</span>
            </div>
            <p className="text-sm text-secondary-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/checkout" onClick={closeCartDrawer}>
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
              </Link>
              <Link href="/cart" onClick={closeCartDrawer}>
                <Button variant="outline" className="w-full">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

