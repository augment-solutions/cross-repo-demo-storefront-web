'use client';

import { useState } from 'react';
import { PaymentMethods } from '@/components/account/PaymentMethods';
import { AddPaymentMethodButton } from '@/components/account/AddPaymentMethodButton';
import { Skeleton } from '@/components/common/Skeleton';

export default function PaymentMethodsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  // Payment methods would be fetched via a hook/API
  // For now, using empty array - in production, this would be:
  // const { data: methods, isLoading } = usePaymentMethods();
  const methods: any[] = [];
  const isLoading = false;

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Payment Methods</h1>
            <p className="mt-1 text-secondary-600">
              Manage your saved payment methods
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Payment Methods</h1>
          <p className="mt-1 text-secondary-600">
            Manage your saved payment methods
          </p>
        </div>
        <AddPaymentMethodButton />
      </div>

      <div className="mt-8">
        <PaymentMethods
          methods={methods}
          onAddMethod={() => setShowAddForm(true)}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-8 rounded-lg bg-secondary-50 p-4 text-sm text-secondary-600">
        <p>
          Your payment information is encrypted and securely stored. We never
          store your full card number.
        </p>
      </div>
    </div>
  );
}

