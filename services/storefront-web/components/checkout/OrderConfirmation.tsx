'use client';

import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface OrderConfirmationProps {
  orderId: string;
  email: string;
  total: number;
}

export function OrderConfirmation({ orderId, email, total }: OrderConfirmationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="p-4 bg-green-100 rounded-full mb-6">
        <CheckCircleIcon className="w-12 h-12 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 mb-4">
        Thank you for your order. We&apos;ve sent a confirmation email to{' '}
        <span className="font-medium">{email}</span>
      </p>
      <div className="bg-gray-50 rounded-lg p-6 mb-6 w-full max-w-md">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Order Number</span>
          <span className="font-medium text-gray-900">{orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="font-medium text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Link
          href={`/account/orders/${orderId}`}
          className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          View Order
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;

