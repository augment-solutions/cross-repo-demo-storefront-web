'use client';

import { useState } from 'react';
import { TruckIcon } from '@heroicons/react/24/outline';

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

interface ShippingOptionsProps {
  options?: ShippingOption[];
  selectedId?: string;
  onSelect?: (option: ShippingOption) => void;
}

const defaultOptions: ShippingOption[] = [
  { id: 'standard', name: 'Standard Shipping', description: 'Delivered in 5-7 business days', price: 5.99, estimatedDays: '5-7 days' },
  { id: 'express', name: 'Express Shipping', description: 'Delivered in 2-3 business days', price: 12.99, estimatedDays: '2-3 days' },
  { id: 'overnight', name: 'Overnight Shipping', description: 'Delivered next business day', price: 24.99, estimatedDays: '1 day' },
];

export function ShippingOptions({ options = defaultOptions, selectedId, onSelect }: ShippingOptionsProps) {
  const [selected, setSelected] = useState(selectedId || options[0]?.id);

  const handleSelect = (option: ShippingOption) => {
    setSelected(option.id);
    onSelect?.(option);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Shipping Method</h3>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
              selected === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={selected === option.id}
                onChange={() => handleSelect(option)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <TruckIcon className="w-6 h-6 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{option.name}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">${option.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{option.estimatedDays}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ShippingOptions;

