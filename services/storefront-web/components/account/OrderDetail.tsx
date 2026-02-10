'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, formatDate } from '@/lib/formatters';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import type { Order } from '@/types/order';
import { ORDER_STATUSES } from '@/lib/constants';

interface OrderDetailProps {
  order: Order;
  onCancelOrder?: () => void;
  isCancelling?: boolean;
}

export function OrderDetail({ order, onCancelOrder, isCancelling }: OrderDetailProps) {
  const statusConfig = ORDER_STATUSES[order.status];
  const canCancel = ['pending', 'confirmed'].includes(order.status);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Order {order.orderNumber}</h2>
            <p className="text-gray-500">{formatDate(order.createdAt)}</p>
          </div>
          <Badge variant={statusConfig.color as any} className="mt-2 md:mt-0">
            {statusConfig.label}
          </Badge>
        </div>

        {order.trackingNumber && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Tracking Number</p>
            <a
              href={order.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-600 hover:underline"
            >
              {order.trackingNumber}
            </a>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4">
              <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                )}
              </div>
              <div className="flex-grow">
                <Link href={`/products/${item.productId}`} className="font-medium hover:text-primary-600">
                  {item.name}
                </Link>
                {item.variant && <p className="text-sm text-gray-500">{item.variant}</p>}
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span><span>{formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span><span>{formatPrice(order.tax)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span><span>-{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span><span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-3">Shipping Address</h3>
          <address className="not-italic text-gray-600 text-sm">
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
            {order.shippingAddress.address1}<br />
            {order.shippingAddress.address2 && <>{order.shippingAddress.address2}<br /></>}
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
          </address>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-3">Payment Method</h3>
          <p className="text-gray-600 text-sm">
            {order.paymentMethod.type === 'card' && `Card ending in ${order.paymentMethod.last4}`}
            {order.paymentMethod.type === 'paypal' && 'PayPal'}
          </p>
        </div>
      </div>

      {canCancel && onCancelOrder && (
        <div className="flex justify-end">
          <Button variant="error" onClick={onCancelOrder} isLoading={isCancelling}>Cancel Order</Button>
        </div>
      )}
    </div>
  );
}

