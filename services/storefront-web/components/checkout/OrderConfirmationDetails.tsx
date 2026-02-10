'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Package, MapPin, CreditCard, Mail } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { formatPrice, formatDate } from '@/lib/formatters';
import type { Order } from '@/types/order';

interface OrderConfirmationDetailsProps {
  order: Order;
}

export function OrderConfirmationDetails({ order }: OrderConfirmationDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
          <CheckCircle className="h-10 w-10 text-success-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-secondary-900">Order Confirmed!</h1>
        <p className="mt-2 text-secondary-600">
          Thank you for your order. We've sent a confirmation email to{' '}
          <span className="font-medium">{order.email}</span>
        </p>
        <p className="mt-1 text-lg font-medium text-primary-600">
          Order #{order.orderNumber}
        </p>
      </div>

      {/* Order Details */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Shipping Address */}
        <div className="rounded-lg border border-secondary-200 p-4">
          <div className="flex items-center gap-2 text-secondary-900">
            <MapPin className="h-5 w-5" />
            <h3 className="font-medium">Shipping Address</h3>
          </div>
          <div className="mt-3 text-sm text-secondary-600">
            <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p>{order.shippingAddress.address1}</p>
            {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-lg border border-secondary-200 p-4">
          <div className="flex items-center gap-2 text-secondary-900">
            <CreditCard className="h-5 w-5" />
            <h3 className="font-medium">Payment Method</h3>
          </div>
          <div className="mt-3 text-sm text-secondary-600">
            <p>{order.paymentMethod.type === 'card' ? `Card ending in ${order.paymentMethod.last4}` : 'PayPal'}</p>
            <p className="mt-1 font-medium text-secondary-900">Total: {formatPrice(order.total)}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="rounded-lg border border-secondary-200">
        <div className="border-b border-secondary-200 p-4">
          <div className="flex items-center gap-2 text-secondary-900">
            <Package className="h-5 w-5" />
            <h3 className="font-medium">Order Items</h3>
          </div>
        </div>
        <div className="divide-y divide-secondary-200">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-secondary-100">
                <Image src={item.image || '/placeholder-product.jpg'} alt={item.name} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-secondary-900">{item.name}</p>
                {item.variant && <p className="text-sm text-secondary-500">{item.variant}</p>}
                <p className="text-sm text-secondary-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-secondary-900">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className="rounded-lg bg-primary-50 p-4 text-center">
        <p className="font-medium text-primary-900">Estimated Delivery</p>
        <p className="text-2xl font-bold text-primary-600">{formatDate(order.estimatedDelivery)}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link href={`/orders/${order.id}`}><Button variant="outline">View Order Details</Button></Link>
        <Link href="/products"><Button>Continue Shopping</Button></Link>
      </div>
    </div>
  );
}

