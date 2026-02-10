'use client';

import { useState } from 'react';
import { AddressList } from '@/components/account/AddressList';
import { AddAddressButton } from '@/components/account/AddAddressButton';
import { Skeleton } from '@/components/common/Skeleton';
import { useUser } from '@/hooks/useUser';

export default function AddressesPage() {
  const { addresses, isLoading, deleteAddress, setDefaultAddress } = useUser();
  const [showAddressForm, setShowAddressForm] = useState(false);

  if (isLoading && addresses.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">My Addresses</h1>
            <p className="mt-1 text-secondary-600">
              Manage your shipping and billing addresses
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">My Addresses</h1>
          <p className="mt-1 text-secondary-600">
            Manage your shipping and billing addresses
          </p>
        </div>
        <AddAddressButton />
      </div>

      <div className="mt-8">
        <AddressList
          addresses={addresses}
          onAddAddress={() => setShowAddressForm(true)}
          onDeleteAddress={deleteAddress}
          onSetDefault={setDefaultAddress}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

