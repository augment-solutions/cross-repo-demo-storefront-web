'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/product/ProductGridSkeleton';
import { useProducts } from '@/hooks/api/useProducts';

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  viewAllLink?: string;
}

export function FeaturedProducts({
  title = 'Featured Products',
  subtitle,
  limit = 4,
  viewAllLink = '/products',
}: FeaturedProductsProps) {
  const { data, isLoading } = useProducts({
    featured: true,
    limit,
    sort: 'bestselling',
  });

  const products = data?.items || [];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-secondary-900 sm:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-secondary-600">{subtitle}</p>
            )}
          </div>
          <Link
            href={viewAllLink}
            className="hidden items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 sm:flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="mt-8">
          {isLoading ? (
            <ProductGridSkeleton count={limit} />
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

