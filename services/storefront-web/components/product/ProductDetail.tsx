'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Truck, Shield, RotateCcw, Star, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Rating } from '@/components/common/Rating';
import { ProductVariants } from './ProductVariants';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem, isLoading: isAddingToCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async () => {
    await addItem(product.id, quantity, selectedVariant || undefined);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.stock)));
  };

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex gap-2">
        {product.isNew && <Badge variant="primary">New Arrival</Badge>}
        {discountPercentage > 0 && <Badge variant="error">{discountPercentage}% Off</Badge>}
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 md:text-3xl">{product.name}</h1>
        <p className="mt-1 text-secondary-500">{product.brand}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <Rating value={product.rating} />
        <span className="text-sm text-secondary-500">
          {product.rating.toFixed(1)} ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-secondary-900">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-xl text-secondary-400 line-through">{formatPrice(product.compareAtPrice)}</span>
        )}
      </div>

      {/* Description */}
      <p className="text-secondary-600">{product.description}</p>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <ProductVariants variants={product.variants} selected={selectedVariant} onSelect={setSelectedVariant} />
      )}

      {/* Quantity & Add to Cart */}
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-md border border-secondary-200">
          <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="p-3 text-secondary-600 hover:bg-secondary-50 disabled:opacity-50" aria-label="Decrease quantity">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock} className="p-3 text-secondary-600 hover:bg-secondary-50 disabled:opacity-50" aria-label="Increase quantity">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button onClick={handleAddToCart} disabled={product.stock === 0} isLoading={isAddingToCart} className="flex-1" size="lg">
          <ShoppingCart className="mr-2 h-5 w-5" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        <Button variant="outline" onClick={() => toggleItem(product.id)} size="lg" className={cn(inWishlist && 'text-red-500 border-red-200')}>
          <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
        </Button>
      </div>

      {/* Stock Status */}
      <div className="text-sm">
        {product.stock > 0 ? (
          <span className={cn('font-medium', product.stock <= 5 ? 'text-warning-600' : 'text-success-600')}>
            {product.stock <= 5 ? `Only ${product.stock} left in stock!` : 'In Stock'}
          </span>
        ) : (
          <span className="font-medium text-error-600">Out of Stock</span>
        )}
      </div>

      {/* Features */}
      <div className="grid gap-4 border-t border-secondary-200 pt-6 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <Truck className="h-6 w-6 text-primary-600" />
          <div><p className="font-medium text-secondary-900">Free Shipping</p><p className="text-sm text-secondary-500">Orders over $50</p></div>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="h-6 w-6 text-primary-600" />
          <div><p className="font-medium text-secondary-900">Free Returns</p><p className="text-sm text-secondary-500">Within 30 days</p></div>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary-600" />
          <div><p className="font-medium text-secondary-900">Warranty</p><p className="text-sm text-secondary-500">1 year coverage</p></div>
        </div>
      </div>
    </div>
  );
}

