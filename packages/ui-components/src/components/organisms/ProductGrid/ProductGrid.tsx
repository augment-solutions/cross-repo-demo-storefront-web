import * as React from 'react';
import { cn } from '../../../utils/cn';
import { ProductCard, ProductCardProps } from '../ProductCard';
import { Spinner } from '../../atoms/Spinner';

export interface ProductGridProps {
  products: Omit<ProductCardProps, 'onAddToCart' | 'onAddToWishlist' | 'onClick'>[];
  columns?: 2 | 3 | 4 | 5;
  isLoading?: boolean;
  emptyMessage?: string;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
  onProductClick?: (id: string) => void;
  className?: string;
}

const gridColsMap = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
};

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 4,
  isLoading = false,
  emptyMessage = 'No products found',
  onAddToCart,
  onAddToWishlist,
  onProductClick,
  className,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-6', gridColsMap[columns], className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};

ProductGrid.displayName = 'ProductGrid';

