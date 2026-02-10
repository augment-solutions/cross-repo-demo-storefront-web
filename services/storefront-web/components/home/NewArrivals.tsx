'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/product/ProductGridSkeleton';
import { useProducts } from '@/hooks/api/useProducts';

interface NewArrivalsProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

export function NewArrivals({
  title = 'New Arrivals',
  subtitle = 'Check out the latest additions to our collection',
  limit = 4,
}: NewArrivalsProps) {
  const { data, isLoading } = useProducts({
    sort: 'newest',
    limit,
  });

  const products = data?.items || [];

  return (
    <div>
      {isLoading ? (
        <ProductGridSkeleton count={limit} />
      ) : products.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-secondary-500 text-center py-8">No new arrivals yet</p>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/products?sort=newest"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View All New Arrivals
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

