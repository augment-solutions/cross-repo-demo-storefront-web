import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/common/Button';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-secondary-100 p-6">
        <ShoppingBag className="h-12 w-12 text-secondary-400" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-secondary-900">
        Your cart is empty
      </h2>
      <p className="mt-2 max-w-sm text-secondary-600">
        Looks like you haven't added any items to your cart yet. Start shopping
        to fill it up!
      </p>
      <Link href="/products" className="mt-8">
        <Button size="lg">Start Shopping</Button>
      </Link>
    </div>
  );
}

