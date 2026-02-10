import { Suspense } from 'react';
import { CategoryCard } from '@/components/category/CategoryCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Skeleton } from '@/components/common/Skeleton';
import { getCategories } from '@/services/api/categories';

export const metadata = {
  title: 'Categories',
  description: 'Browse all product categories',
};

// Force dynamic rendering to prevent build-time API calls
export const dynamic = 'force-dynamic';

async function CategoriesContent() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];

  try {
    categories = await getCategories();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
      {categories.length === 0 && (
        <p className="col-span-full text-center text-secondary-500">
          No categories available at the moment.
        </p>
      )}
    </div>
  );
}

export default function CategoriesPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
  ];

  return (
    <div className="container-custom py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-secondary-900">All Categories</h1>
        <p className="mt-2 text-secondary-600">
          Explore our wide range of product categories
        </p>

        <Suspense
          fallback={
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          }
        >
          <CategoriesContent />
        </Suspense>
      </div>
    </div>
  );
}

