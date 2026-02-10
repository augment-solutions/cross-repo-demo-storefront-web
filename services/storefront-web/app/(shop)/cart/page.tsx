import { Suspense } from 'react';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Skeleton } from '@/components/common/Skeleton';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { ProductGridSkeleton } from '@/components/product/ProductGridSkeleton';

export const metadata = {
  title: 'Shopping Cart',
  description: 'Review and manage your shopping cart',
};

export default function CartPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/cart' },
  ];

  return (
    <div className="container-custom py-8">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="mt-6 text-3xl font-bold text-secondary-900">Shopping Cart</h1>

      <Suspense fallback={<CartPageSkeleton />}>
        <CartContent />
      </Suspense>

      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold text-secondary-900">
          You Might Also Like
        </h2>
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <RelatedProducts />
        </Suspense>
      </section>
    </div>
  );
}

function CartContent() {
  // This will use client-side cart state
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="divide-y divide-secondary-200">
          {/* Cart items will be rendered by client component */}
          <CartItemsList />
        </div>
      </div>

      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  );
}

function CartItemsList() {
  'use client';
  // This is a placeholder - actual implementation uses useCart hook
  return (
    <div className="space-y-4">
      {/* Cart items will be mapped here */}
    </div>
  );
}

function CartPageSkeleton() {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
      <div className="lg:col-span-1">
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}

