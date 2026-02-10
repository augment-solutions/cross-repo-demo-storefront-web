'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Rating } from '@/components/common/Rating';
import { ProductVariants } from './ProductVariants';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const { addItem, isLoading: isAddingToCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async () => {
    await addItem(product.id, quantity, selectedVariant || undefined);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary-100">
            <Image
              src={product.images[selectedImageIndex]?.url || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={image.id || index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2',
                    selectedImageIndex === index ? 'border-primary-600' : 'border-transparent'
                  )}
                >
                  <Image src={image.url} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <Link href={`/categories/${product.category.slug}`} className="text-sm text-secondary-500 hover:text-primary-600">
              {product.category.name}
            </Link>
            <h2 className="mt-1 text-2xl font-bold text-secondary-900">{product.name}</h2>
          </div>

          <div className="flex items-center gap-3">
            <Rating value={product.rating} />
            <span className="text-sm text-secondary-500">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-secondary-900">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-secondary-400 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <p className="text-secondary-600 line-clamp-3">{product.description}</p>

          {product.variants && product.variants.length > 0 && (
            <ProductVariants variants={product.variants} selected={selectedVariant} onSelect={setSelectedVariant} />
          )}

          {/* Quantity & Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-md border border-secondary-200">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2 text-secondary-600 hover:bg-secondary-50" aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="p-2 text-secondary-600 hover:bg-secondary-50" aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button onClick={handleAddToCart} isLoading={isAddingToCart} disabled={product.stock === 0} className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>

            <Button variant="outline" onClick={() => toggleItem(product.id)} className={cn(inWishlist && 'text-red-500')}>
              <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
            </Button>
          </div>

          <Link href={`/products/${product.id}`} className="block text-center text-sm text-primary-600 hover:underline" onClick={onClose}>
            View Full Details
          </Link>
        </div>
      </div>
    </Modal>
  );
}

