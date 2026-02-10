'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  className?: string;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, className, onQuickView }: ProductCardProps) {
  const { addItem, isLoading: isAddingToCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    await addItem(product.id, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView?.(product);
  };

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <article
      className={cn('group relative rounded-lg border border-secondary-200 bg-white transition-shadow hover:shadow-lg', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-secondary-100">
          <Image
            src={product.images[0]?.url || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.isNew && <Badge variant="primary">New</Badge>}
            {discountPercentage > 0 && <Badge variant="error">-{discountPercentage}%</Badge>}
            {product.stock === 0 && <Badge variant="secondary">Out of Stock</Badge>}
          </div>
          {/* Quick Actions */}
          <div
            className={cn(
              'absolute right-2 top-2 flex flex-col gap-2 transition-opacity',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            <button onClick={handleWishlistToggle} className={cn('rounded-full bg-white p-2 shadow-md transition-colors', inWishlist ? 'text-red-500' : 'text-secondary-400 hover:text-red-500')} aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
              <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
            </button>
            {onQuickView && (
              <button onClick={handleQuickView} className="rounded-full bg-white p-2 text-secondary-400 shadow-md transition-colors hover:text-primary-600" aria-label="Quick view">
                <Eye className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/categories/${product.category.slug}`} className="text-xs text-secondary-500 hover:text-primary-600">
          {product.category.name}
        </Link>
        <Link href={`/products/${product.id}`}>
          <h3 className="mt-1 font-medium text-secondary-900 line-clamp-2 hover:text-primary-600">{product.name}</h3>
        </Link>
        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn('h-4 w-4', i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-secondary-200')} />
            ))}
          </div>
          <span className="text-sm text-secondary-500">({product.reviewCount})</span>
        </div>
        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-secondary-900">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-secondary-400 line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
        {/* Add to Cart */}
        <Button onClick={handleAddToCart} disabled={product.stock === 0} isLoading={isAddingToCart} className="mt-4 w-full" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </article>
  );
}

