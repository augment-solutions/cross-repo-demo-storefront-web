'use client';

import { CreditCardIcon, TrashIcon } from '@heroicons/react/24/outline';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault?: boolean;
}

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

export function PaymentMethodCard({ paymentMethod, onDelete, onSetDefault }: PaymentMethodCardProps) {
  const cardTypeLabels = {
    visa: 'Visa',
    mastercard: 'Mastercard',
    amex: 'American Express',
    discover: 'Discover',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          <CreditCardIcon className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">
            {cardTypeLabels[paymentMethod.type]} •••• {paymentMethod.last4}
          </p>
          <p className="text-sm text-gray-500">
            Expires {paymentMethod.expiryMonth.toString().padStart(2, '0')}/{paymentMethod.expiryYear}
          </p>
        </div>
        {paymentMethod.isDefault && (
          <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
            Default
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {!paymentMethod.isDefault && onSetDefault && (
          <button
            onClick={() => onSetDefault(paymentMethod.id)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Set as default
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(paymentMethod.id)}
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentMethodCard;

