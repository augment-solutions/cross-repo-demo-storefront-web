import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { OrderDetail } from '@/components/account/OrderDetail';
import { OrderTimeline } from '@/components/account/OrderTimeline';
import { OrderItems } from '@/components/account/OrderItems';
import { getOrder } from '@/services/api/orders';

interface OrderDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: OrderDetailPageProps) {
  return {
    title: `Order #${params.id}`,
    description: 'View order details',
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  let order;

  try {
    order = await getOrder(params.id);
  } catch {
    notFound();
  }

  return (
    <div>
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-2 text-sm text-secondary-600 hover:text-secondary-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to orders
      </Link>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">
              Order #{params.id}
            </h1>
            <p className="mt-1 text-secondary-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              order.status === 'delivered'
                ? 'bg-success-50 text-success-600'
                : order.status === 'cancelled'
                ? 'bg-error-50 text-error-600'
                : 'bg-primary-50 text-primary-600'
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <OrderTimeline
            events={order.statusHistory.map((update, index) => ({
              id: `${order.id}-${index}`,
              status: update.status,
              description: update.message || `Order ${update.status}`,
              timestamp: update.timestamp,
              completed: true,
            }))}
          />

          <OrderItems items={order.items} />
        </div>

        <div className="lg:col-span-1">
          <OrderDetail order={order} />
        </div>
      </div>
    </div>
  );
}

