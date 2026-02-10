'use client';

import { Suspense, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { UserReviews } from '@/components/account/UserReviews';
import { Pagination } from '@/components/common/Pagination';
import { Skeleton } from '@/components/common/Skeleton';

function ReviewsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">My Reviews</h1>
        <p className="mt-1 text-secondary-600">
          Reviews you've written for products
        </p>
      </div>

      <div className="mt-8">
        <UserReviews />
      </div>

      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <Suspense fallback={<div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-64" /></div>}>
      <ReviewsContent />
    </Suspense>
  );
}

