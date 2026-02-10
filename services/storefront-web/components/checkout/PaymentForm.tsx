'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Lock } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useCheckout } from '@/hooks/useCheckout';
import { cn } from '@/lib/utils';

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Invalid card number'),
  cardHolder: z.string().min(1, 'Cardholder name is required'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Format: MM/YY'),
  cvv: z.string().min(3, 'Invalid CVV'),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onNext: () => void;
  onBack: () => void;
}

export function PaymentForm({ onNext, onBack }: PaymentFormProps) {
  const { setPaymentMethod, isLoading, processPayment } = useCheckout();
  const [paymentType, setPaymentType] = useState<'card' | 'paypal'>('card');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = async (data: PaymentFormData) => {
    await setPaymentMethod({ type: 'card', ...data });
    await processPayment();
    onNext();
  };

  const handlePayPal = async () => {
    await setPaymentMethod({ type: 'paypal' });
    await processPayment();
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setPaymentType('card')}
          className={cn(
            'flex-1 rounded-lg border-2 p-4 text-center transition-colors',
            paymentType === 'card' ? 'border-primary-600 bg-primary-50' : 'border-secondary-200 hover:border-secondary-300'
          )}
        >
          <CreditCard className="mx-auto h-8 w-8 text-secondary-600" />
          <p className="mt-2 font-medium">Credit Card</p>
        </button>
        <button
          type="button"
          onClick={() => setPaymentType('paypal')}
          className={cn(
            'flex-1 rounded-lg border-2 p-4 text-center transition-colors',
            paymentType === 'paypal' ? 'border-primary-600 bg-primary-50' : 'border-secondary-200 hover:border-secondary-300'
          )}
        >
          <div className="mx-auto h-8 w-8 text-2xl font-bold text-blue-600">P</div>
          <p className="mt-2 font-medium">PayPal</p>
        </button>
      </div>

      {paymentType === 'card' ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Card Number" {...register('cardNumber')} error={errors.cardNumber?.message} placeholder="1234 5678 9012 3456" required />
          <Input label="Cardholder Name" {...register('cardHolder')} error={errors.cardHolder?.message} placeholder="John Doe" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Expiry Date" {...register('expiryDate')} error={errors.expiryDate?.message} placeholder="MM/YY" required />
            <Input label="CVV" type="password" {...register('cvv')} error={errors.cvv?.message} placeholder="123" required />
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-secondary-50 p-3 text-sm text-secondary-600">
            <Lock className="h-4 w-4" />
            <span>Your payment information is encrypted and secure.</span>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>Back</Button>
            <Button type="submit" isLoading={isLoading} size="lg">Complete Order</Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="text-center text-secondary-600">You will be redirected to PayPal to complete your payment.</p>
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>Back</Button>
            <Button onClick={handlePayPal} isLoading={isLoading} size="lg">Continue with PayPal</Button>
          </div>
        </div>
      )}
    </div>
  );
}

