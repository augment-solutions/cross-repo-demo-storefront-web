'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Badge } from '@/components/common/Badge';
import type { Address } from '@/types/user';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface AddressListProps {
  addresses: Address[];
  onAddAddress?: () => void;
  onEditAddress?: (address: Address) => void;
  onDeleteAddress?: (addressId: string) => void;
  onSetDefault?: (addressId: string) => void;
  isLoading?: boolean;
}

export function AddressList({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefault,
  isLoading,
}: AddressListProps) {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteConfirmId && onDeleteAddress) {
      onDeleteAddress(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  if (addresses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500 mb-4">You haven't added any addresses yet.</p>
        {onAddAddress && (
          <Button onClick={onAddAddress}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Address
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {onAddAddress && (
          <Button onClick={onAddAddress} variant="outline">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Address
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white rounded-lg shadow-sm p-6 relative"
          >
            {address.isDefault && (
              <Badge variant="success" className="absolute top-4 right-4">
                Default
              </Badge>
            )}

            <address className="not-italic text-gray-700 mb-4">
              <p className="font-medium">
                {address.firstName} {address.lastName}
              </p>
              <p>{address.address1}</p>
              {address.address2 && <p>{address.address2}</p>}
              <p>
                {address.city}, {address.state} {address.zipCode}
              </p>
              <p>{address.country}</p>
              {address.phone && <p className="mt-2">{address.phone}</p>}
            </address>

            <div className="flex gap-2 flex-wrap">
              {onEditAddress && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditAddress(address)}
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
              {!address.isDefault && onSetDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSetDefault(address.id)}
                >
                  Set as Default
                </Button>
              )}
              {onDeleteAddress && !address.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteConfirmId(address.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Address"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this address? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
            Cancel
          </Button>
          <Button variant="error" onClick={handleDelete} isLoading={isLoading}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

