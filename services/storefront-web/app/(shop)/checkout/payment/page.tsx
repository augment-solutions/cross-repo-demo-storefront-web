'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Skeleton } from '@/components/common/Skeleton';

export default function PaymentPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/checkout/confirmation?orderId=ORD-' + Date.now());
  };

  const handleBack = () => {
    router.push('/checkout/shipping');
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-lg border border-secondary-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-secondary-900">
            Payment Method
          </h2>

          <div className="mt-6">
            <PaymentForm onNext={handleNext} onBack={handleBack} />
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-secondary-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-secondary-900">
            Billing Address
          </h2>

          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="text-secondary-700">
                Same as shipping address
              </span>
            </label>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-secondary-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-secondary-900">
            Promo Code
          </h2>

          <div className="mt-4 flex gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-1 rounded-md border border-secondary-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500"
            />
            <button className="rounded-md border border-secondary-300 px-4 py-2 hover:bg-secondary-50">Apply</button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <Suspense fallback={<Skeleton className="h-64" />}>
          <OrderSummary />
        </Suspense>
      </div>
    </div>
  );
}

