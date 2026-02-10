'use client';

import { useState } from 'react';
import { Plus, Check, MapPin } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { ShippingForm } from './ShippingForm';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import type { Address } from '@/types/user';

interface AddressSelectorProps {
  selectedId?: string;
  onSelect: (address: Address) => void;
}

export function AddressSelector({ selectedId, onSelect }: AddressSelectorProps) {
  const { addresses } = useUser();
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddNew = () => {
    setIsAddingNew(false);
    // Refresh addresses
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-secondary-900">Select a shipping address</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((address) => (
          <button
            key={address.id}
            onClick={() => onSelect(address)}
            className={cn(
              'relative rounded-lg border-2 p-4 text-left transition-colors',
              selectedId === address.id
                ? 'border-primary-600 bg-primary-50'
                : 'border-secondary-200 hover:border-secondary-300'
            )}
          >
            {selectedId === address.id && (
              <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white">
                <Check className="h-4 w-4" />
              </span>
            )}
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-400" />
              <div>
                <p className="font-medium text-secondary-900">
                  {address.firstName} {address.lastName}
                </p>
                <p className="mt-1 text-sm text-secondary-600">
                  {address.address1}
                  {address.address2 && `, ${address.address2}`}
                </p>
                <p className="text-sm text-secondary-600">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-sm text-secondary-600">{address.country}</p>
                {address.isDefault && (
                  <span className="mt-2 inline-block rounded-full bg-secondary-100 px-2 py-0.5 text-xs font-medium text-secondary-600">
                    Default
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}

        {/* Add New Address */}
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-secondary-300 p-4 text-secondary-600 transition-colors hover:border-primary-400 hover:text-primary-600"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add New Address</span>
        </button>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddingNew}
        onClose={() => setIsAddingNew(false)}
        title="Add New Address"
      >
        <ShippingForm onNext={handleAddNew} />
      </Modal>
    </div>
  );
}

