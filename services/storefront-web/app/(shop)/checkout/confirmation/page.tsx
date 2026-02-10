import Link from 'next/link';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface ConfirmationPageProps {
  searchParams: {
    orderId?: string;
  };
}

export const metadata = {
  title: 'Order Confirmed',
  description: 'Your order has been placed successfully',
};

export default function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const orderId = searchParams.orderId;

  if (!orderId) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h2 className="text-2xl font-bold text-secondary-900">
          No order found
        </h2>
        <p className="mt-2 text-secondary-600">
          It looks like you haven&apos;t placed an order yet.
        </p>
        <Link href="/products" className="mt-6">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-50">
          <CheckCircle className="h-10 w-10 text-success-500" />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-secondary-900">
          Thank you for your order!
        </h2>

        <p className="mt-2 text-lg text-secondary-600">
          Your order has been placed successfully.
        </p>

        <p className="mt-4 text-secondary-600">
          Order number: <span className="font-semibold text-secondary-900">{orderId}</span>
        </p>

        <p className="mt-2 text-sm text-secondary-500">
          A confirmation email has been sent to your email address.
        </p>
      </div>

      {/* Order Next Steps */}
      <div className="mt-8 rounded-lg border border-secondary-200 p-6">
        <h3 className="font-semibold text-secondary-900 mb-4">What happens next?</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-secondary-900">Confirmation Email</p>
              <p className="text-sm text-secondary-600">We&apos;ve sent order details to your email</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-secondary-900">Order Processing</p>
              <p className="text-sm text-secondary-600">Your order is being prepared for shipment</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <ArrowRight className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-secondary-900">Shipping Updates</p>
              <p className="text-sm text-secondary-600">Track your package once it ships</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link href={`/account/orders/${orderId}`}>
          <Button variant="outline">View Order Details</Button>
        </Link>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>

      <div className="mt-12 rounded-lg bg-secondary-50 p-6 text-center">
        <h3 className="font-semibold text-secondary-900">Need help?</h3>
        <p className="mt-1 text-sm text-secondary-600">
          If you have any questions about your order, please contact our{' '}
          <Link href="/support" className="text-primary-600 hover:underline">
            customer support
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

