import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { CartItem, CartItemProps } from '../../organisms/CartItem';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../molecules/Card';

export interface CartPageTemplateProps {
  items: Omit<CartItemProps, 'onQuantityChange' | 'onRemove'>[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  total: number;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onApplyCoupon?: (code: string) => void;
  onCheckout?: () => void;
  isCheckoutLoading?: boolean;
  className?: string;
}

export const CartPageTemplate: React.FC<CartPageTemplateProps> = ({
  items,
  subtotal,
  shipping = 0,
  tax = 0,
  total,
  onQuantityChange,
  onRemove,
  onApplyCoupon,
  onCheckout,
  isCheckoutLoading = false,
  className,
}) => {
  const [couponCode, setCouponCode] = React.useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyCoupon?.(couponCode);
    setCouponCode('');
  };

  if (items.length === 0) {
    return (
      <div className={cn('max-w-7xl mx-auto px-4 py-12 text-center', className)}>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button as="a" href="/products">Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className={cn('max-w-7xl mx-auto px-4 py-8', className)}>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart ({items.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {tax > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon */}
              {onApplyCoupon && (
                <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-4">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="outline">Apply</Button>
                </form>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={onCheckout} isLoading={isCheckoutLoading}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

CartPageTemplate.displayName = 'CartPageTemplate';

