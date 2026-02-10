'use client';

import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { QuickView } from './QuickView';
import { useProducts } from '@/hooks/api/useProducts';
import type { Product, ProductsQueryParams } from '@/types/product';

type SortOption = ProductsQueryParams['sort'];

interface ProductGridProps {
  page?: number;
  sort?: SortOption;
  filters?: Record<string, string | undefined>;
  products?: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({
  page = 1,
  sort = 'newest',
  filters,
  products: initialProducts,
  columns = 4,
}: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data, isLoading } = useProducts({
    page,
    sort,
    ...filters,
    enabled: !initialProducts,
  });

  const products = initialProducts || data?.items || [];

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (isLoading) {
    return null; // Let the Suspense fallback handle loading
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-secondary-900">No products found</p>
        <p className="mt-2 text-secondary-600">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid gap-6 ${gridCols[columns]}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>

      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}

