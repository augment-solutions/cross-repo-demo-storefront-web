import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Icon } from '../../atoms/Icon';
import { Rating } from '../../molecules/Rating';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  inStock?: boolean;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  badge,
  inStock = true,
  onAddToCart,
  onAddToWishlist,
  onClick,
  className,
}) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div
      className={cn(
        'group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow hover:shadow-lg',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => onClick?.(id)}
          role={onClick ? 'button' : undefined}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {badge && <Badge variant="primary">{badge}</Badge>}
          {discount > 0 && <Badge variant="error">-{discount}%</Badge>}
          {!inStock && <Badge variant="gray">Out of Stock</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => onAddToWishlist?.(id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          aria-label="Add to wishlist"
        >
          <Icon name="heart" size="sm" className="text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-medium text-gray-900 line-clamp-2 mb-1 cursor-pointer hover:text-primary-600"
          onClick={() => onClick?.(id)}
        >
          {name}
        </h3>

        {/* Rating */}
        {rating !== undefined && (
          <div className="flex items-center gap-1 mb-2">
            <Rating value={rating} size="sm" />
            {reviewCount !== undefined && (
              <span className="text-xs text-gray-500">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full"
          size="sm"
          onClick={() => onAddToCart?.(id)}
          isDisabled={!inStock}
          leftIcon={<Icon name="cart" size="sm" />}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};

ProductCard.displayName = 'ProductCard';

