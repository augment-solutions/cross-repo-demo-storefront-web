import * as React from 'react';
import { cn } from '../../../utils/cn';
import { CheckoutForm, CheckoutFormData } from '../../organisms/CheckoutForm';
import { Card, CardHeader, CardTitle, CardContent } from '../../molecules/Card';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CheckoutTemplateProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  step?: 'shipping' | 'payment' | 'review';
  onSubmitShipping?: (data: CheckoutFormData) => void;
  isLoading?: boolean;
  className?: string;
}

export const CheckoutTemplate: React.FC<CheckoutTemplateProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  step = 'shipping',
  onSubmitShipping,
  isLoading = false,
  className,
}) => {
  const steps = [
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' },
    { id: 'review', label: 'Review' },
  ];

  return (
    <div className={cn('max-w-7xl mx-auto px-4 py-8', className)}>
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className={cn('flex items-center gap-2', step === s.id ? 'text-primary-600' : 'text-gray-400')}>
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium', step === s.id ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600')}>
                {i + 1}
              </div>
              <span className="hidden sm:inline font-medium">{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className="w-12 sm:w-24 h-px bg-gray-300 mx-2 sm:mx-4" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          {step === 'shipping' && onSubmitShipping && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <CheckoutForm onSubmit={onSubmitShipping} isLoading={isLoading} />
              </CardContent>
            </Card>
          )}
          {step === 'payment' && (
            <Card>
              <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
              <CardContent><p className="text-gray-500">Payment form would go here</p></CardContent>
            </Card>
          )}
          {step === 'review' && (
            <Card>
              <CardHeader><CardTitle>Order Review</CardTitle></CardHeader>
              <CardContent><p className="text-gray-500">Order review details would go here</p></CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-sm"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

CheckoutTemplate.displayName = 'CheckoutTemplate';

