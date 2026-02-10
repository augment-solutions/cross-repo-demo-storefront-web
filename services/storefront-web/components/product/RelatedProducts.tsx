'use client';

import { ProductCard } from './ProductCard';
import { useProducts } from '@/hooks/api/useProducts';

interface RelatedProductsProps {
  productId?: string;
  categoryId?: string;
  limit?: number;
}

export function RelatedProducts({
  productId,
  categoryId,
  limit = 4,
}: RelatedProductsProps) {
  const { data, isLoading } = useProducts({
    category: categoryId,
    limit,
    exclude: productId,
    sort: 'bestselling',
  });

  if (isLoading) {
    return null;
  }

  const products = data?.items || [];

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

