'use client';

import { Suspense, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { OrderHistory } from '@/components/account/OrderHistory';
import { OrderFilters } from '@/components/account/OrderFilters';
import { Pagination } from '@/components/common/Pagination';
import { Skeleton } from '@/components/common/Skeleton';
import { useOrders } from '@/hooks/api/useOrders';

function OrdersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get('page')) || 1;
  const status = searchParams.get('status') || undefined;

  const { data: ordersData, isLoading } = useOrders({ page: currentPage, status });

  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Order History</h1>
          <p className="mt-1 text-secondary-600">
            View and track your orders
          </p>
        </div>
        <OrderFilters />
      </div>

      <div className="mt-8">
        <OrderHistory
          orders={ordersData?.items || []}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={ordersData?.totalPages || 1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-64" /></div>}>
      <OrdersContent />
    </Suspense>
  );
}

