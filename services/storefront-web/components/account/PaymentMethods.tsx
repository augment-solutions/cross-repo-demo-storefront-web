'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Badge } from '@/components/common/Badge';
import { CreditCardIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface PaymentMethodData {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'paypal';
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  email?: string;
  isDefault: boolean;
}

interface PaymentMethodsProps {
  methods: PaymentMethodData[];
  onAddMethod?: () => void;
  onDeleteMethod?: (methodId: string) => void;
  onSetDefault?: (methodId: string) => void;
  isLoading?: boolean;
}

const cardIcons: Record<string, string> = {
  visa: '💳 Visa',
  mastercard: '💳 Mastercard',
  amex: '💳 Amex',
  paypal: '🅿️ PayPal',
};

export function PaymentMethods({
  methods,
  onAddMethod,
  onDeleteMethod,
  onSetDefault,
  isLoading,
}: PaymentMethodsProps) {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteConfirmId && onDeleteMethod) {
      onDeleteMethod(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  if (methods.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <CreditCardIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 mb-4">You haven't added any payment methods yet.</p>
        {onAddMethod && (
          <Button onClick={onAddMethod}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Payment Method
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {onAddMethod && (
          <Button onClick={onAddMethod} variant="outline">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Payment Method
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{cardIcons[method.type]}</span>
              <div>
                {method.type === 'paypal' ? (
                  <p className="font-medium">{method.email}</p>
                ) : (
                  <>
                    <p className="font-medium">•••• •••• •••• {method.last4}</p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                  </>
                )}
              </div>
              {method.isDefault && (
                <Badge variant="success">Default</Badge>
              )}
            </div>

            <div className="flex gap-2">
              {!method.isDefault && onSetDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSetDefault(method.id)}
                >
                  Set as Default
                </Button>
              )}
              {onDeleteMethod && !method.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteConfirmId(method.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Remove Payment Method"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove this payment method?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
          <Button variant="error" onClick={handleDelete} isLoading={isLoading}>Remove</Button>
        </div>
      </Modal>
    </div>
  );
}

