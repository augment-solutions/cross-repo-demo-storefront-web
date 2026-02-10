'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, formatDate } from '@/lib/formatters';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Skeleton } from '@/components/common/Skeleton';
import type { Order } from '@/types/order';
import { ORDER_STATUSES } from '@/lib/constants';

interface OrderHistoryProps {
  orders: Order[];
  isLoading?: boolean;
}

export function OrderHistory({ orders, isLoading }: OrderHistoryProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
        <Link href="/products">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const statusConfig = ORDER_STATUSES[order.status];

        return (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  Order {order.orderNumber}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <Badge variant={statusConfig.color as any}>
                  {statusConfig.label}
                </Badge>
                <span className="font-semibold">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {order.items.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
              {order.items.length > 4 && (
                <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">
                    +{order.items.length - 4}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <Link href={`/account/orders/${order.id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

