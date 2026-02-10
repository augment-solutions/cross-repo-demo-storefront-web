import { Suspense } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductGridSkeleton } from '@/components/product/ProductGridSkeleton';
import { SortDropdown } from '@/components/search/SortDropdown';
import { FacetFilters } from '@/components/search/FacetFilters';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { UrlPagination } from '@/components/common/UrlPagination';
import type { ProductsQueryParams } from '@/types/product';

type SortOption = ProductsQueryParams['sort'];

const validSortOptions: SortOption[] = ['newest', 'price-asc', 'price-desc', 'bestselling', 'rating'];

function isValidSortOption(value: string | undefined): value is SortOption {
  return validSortOptions.includes(value as SortOption);
}

interface ProductsPageProps {
  searchParams: {
    page?: string;
    sort?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    brand?: string;
    rating?: string;
  };
}

export const metadata = {
  title: 'All Products',
  description: 'Browse our complete collection of products',
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const sort: SortOption = isValidSortOption(searchParams.sort) ? searchParams.sort : 'newest';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
  ];

  return (
    <div className="container-custom py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 lg:flex-shrink-0">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-secondary-100" />}>
            <FacetFilters />
          </Suspense>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-secondary-900">All Products</h1>
            <SortDropdown />
          </div>

          <Suspense fallback={<ProductGridSkeleton count={12} />}>
            <ProductGrid
              page={currentPage}
              sort={sort}
              filters={searchParams}
            />
          </Suspense>

          <div className="mt-8">
            <UrlPagination currentPage={currentPage} totalPages={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

