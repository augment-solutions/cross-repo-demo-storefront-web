'use client';

import { useState } from 'react';
import { CreditCardIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal' | 'apple_pay' | 'google_pay';
  label: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

interface PaymentMethodSelectorProps {
  methods?: PaymentMethod[];
  selectedId?: string;
  onSelect?: (method: PaymentMethod) => void;
  onAddNew?: () => void;
}

const defaultMethods: PaymentMethod[] = [
  { id: '1', type: 'card', label: 'Visa', last4: '4242', expiryMonth: 12, expiryYear: 2025 },
  { id: '2', type: 'card', label: 'Mastercard', last4: '8888', expiryMonth: 6, expiryYear: 2026 },
];

export function PaymentMethodSelector({ 
  methods = defaultMethods, 
  selectedId, 
  onSelect,
  onAddNew 
}: PaymentMethodSelectorProps) {
  const [selected, setSelected] = useState(selectedId || methods[0]?.id);

  const handleSelect = (method: PaymentMethod) => {
    setSelected(method.id);
    onSelect?.(method);
  };

  const getIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'bank':
        return <BuildingLibraryIcon className="w-6 h-6 text-gray-600" />;
      default:
        return <CreditCardIcon className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
      <div className="space-y-3">
        {methods.map(method => (
          <label
            key={method.id}
            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
              selected === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="payment-method"
              value={method.id}
              checked={selected === method.id}
              onChange={() => handleSelect(method)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            {getIcon(method.type)}
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {method.label} {method.last4 && `•••• ${method.last4}`}
              </p>
              {method.expiryMonth && method.expiryYear && (
                <p className="text-sm text-gray-500">
                  Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
      {onAddNew && (
        <button
          onClick={onAddNew}
          className="w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          + Add New Payment Method
        </button>
      )}
    </div>
  );
}

export default PaymentMethodSelector;

