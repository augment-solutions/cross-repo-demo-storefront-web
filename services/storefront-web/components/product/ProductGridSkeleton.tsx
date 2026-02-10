import { Skeleton } from '@/components/common/Skeleton';

interface ProductGridSkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4;
}

export function ProductGridSkeleton({ count = 8, columns = 4 }: ProductGridSkeletonProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-secondary-200 bg-white overflow-hidden"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-full" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

