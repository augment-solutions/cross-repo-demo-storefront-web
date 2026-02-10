import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  className?: string;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
  size,
  color,
  onQuantityChange,
  onRemove,
  className,
}) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange?.(id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange?.(id, quantity + 1);
  };

  return (
    <div className={cn('flex gap-4 py-4 border-b border-gray-200', className)}>
      {/* Product Image */}
      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{name}</h3>
        <div className="mt-1 text-sm text-gray-500 space-x-2">
          {size && <span>Size: {size}</span>}
          {color && <span>Color: {color}</span>}
        </div>
        <p className="mt-1 font-medium text-gray-900">${price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Icon name="minus" size="xs" />
          </button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <button
            type="button"
            onClick={handleIncrement}
            className="p-2 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Icon name="plus" size="xs" />
          </button>
        </div>
      </div>

      {/* Subtotal & Remove */}
      <div className="flex flex-col items-end justify-between">
        <span className="font-semibold text-gray-900">${(price * quantity).toFixed(2)}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove?.(id)}
          className="text-gray-500 hover:text-error-600"
        >
          <Icon name="trash" size="sm" />
        </Button>
      </div>
    </div>
  );
};

CartItem.displayName = 'CartItem';

