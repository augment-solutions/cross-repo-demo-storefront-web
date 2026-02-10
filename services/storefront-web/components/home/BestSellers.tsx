'use client';

import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/product/ProductGridSkeleton';
import { useProducts } from '@/hooks/api/useProducts';

interface BestSellersProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

export function BestSellers({
  title = 'Best Sellers',
  subtitle = 'Our most popular products',
  limit = 4,
}: BestSellersProps) {
  const { data, isLoading } = useProducts({
    sort: 'bestselling',
    limit,
  });

  const products = data?.items || [];

  return (
    <div>
      {isLoading ? (
        <ProductGridSkeleton count={limit} />
      ) : products.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div key={product.id} className="relative">
              {index < 3 && (
                <div className="absolute -top-2 -left-2 z-10 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  #{index + 1}
                </div>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-secondary-500 text-center py-8">No products available</p>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/products?sort=bestselling"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View All Best Sellers
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

