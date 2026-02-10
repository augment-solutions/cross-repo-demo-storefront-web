'use client';

import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { WishlistGrid } from './WishlistGrid';
import { EmptyWishlist } from './EmptyWishlist';
import { Skeleton } from '@/components/common/Skeleton';
import type { WishlistItem } from '@/types/wishlist';

export function WishlistContent() {
  const { items, removeItem, isLoading } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleRemove = (productId: string) => {
    removeItem(productId);
  };

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: `cart-${item.productId}-${Date.now()}`,
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      maxQuantity: 99, // Default max quantity
    });
    // Optionally remove from wishlist after adding to cart
    removeItem(item.productId);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <WishlistGrid
      items={items}
      onRemove={handleRemove}
      onAddToCart={handleAddToCart}
      isLoading={isLoading}
    />
  );
}

