'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import type { Address } from '@/types/user';

export default function ShippingPage() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleNext = () => {
    router.push('/checkout/payment');
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-lg border border-secondary-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-secondary-900">
            Shipping Address
          </h2>

          <div className="mt-6">
            <ShippingForm onNext={handleNext} />
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-secondary-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-secondary-900">
            Shipping Method
          </h2>

          <ShippingMethodSelector />
        </div>
      </div>

      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  );
}

function ShippingMethodSelector() {
  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 12.99, days: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', price: 24.99, days: '1 business day' },
  ];

  return (
    <div className="mt-4 space-y-3">
      {shippingMethods.map((method) => (
        <label
          key={method.id}
          className="flex cursor-pointer items-center justify-between rounded-lg border border-secondary-200 p-4 hover:border-primary-500"
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="shipping"
              value={method.id}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <p className="font-medium text-secondary-900">{method.name}</p>
              <p className="text-sm text-secondary-500">{method.days}</p>
            </div>
          </div>
          <span className="font-medium text-secondary-900">
            ${method.price.toFixed(2)}
          </span>
        </label>
      ))}
    </div>
  );
}

