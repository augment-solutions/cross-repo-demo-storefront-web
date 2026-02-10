'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '@/components/common/Skeleton';
import { useCategories } from '@/hooks/api/useCategories';

interface CategoryShowcaseProps {
  title?: string;
  limit?: number;
}

export function CategoryShowcase({
  title = 'Shop by Category',
  limit = 4,
}: CategoryShowcaseProps) {
  const { data: categories, isLoading } = useCategories();

  const displayCategories = categories?.slice(0, limit) || [];

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(limit)].map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    );
  }

  if (displayCategories.length === 0) {
    return (
      <p className="text-secondary-500 text-center py-8">No categories available</p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {displayCategories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg"
        >
          <div className="aspect-square overflow-hidden">
            <Image
              src={category.image || '/placeholder-category.jpg'}
              alt={category.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/60 to-transparent p-6">
            <h3 className="text-xl font-semibold text-white">
              {category.name}
            </h3>
            {category.productCount && (
              <p className="mt-1 text-sm text-white/80">
                {category.productCount} Products
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

