import { Suspense } from 'react';
import { SearchResults } from '@/components/search/SearchResults';
import { SortDropdown } from '@/components/search/SortDropdown';
import { FacetFilters } from '@/components/search/FacetFilters';
import { SearchBar } from '@/components/search/SearchBar';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { UrlPagination } from '@/components/common/UrlPagination';
import { ProductGridSkeleton } from '@/components/product/ProductGridSkeleton';

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
    sort?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    brand?: string;
    rating?: string;
  };
}

export function generateMetadata({ searchParams }: SearchPageProps) {
  const query = searchParams.q;
  return {
    title: query ? `Search results for "${query}"` : 'Search',
    description: query
      ? `Find products matching "${query}"`
      : 'Search our product catalog',
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const currentPage = Number(searchParams.page) || 1;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search' },
    ...(query ? [{ label: query, href: `/search?q=${encodeURIComponent(query)}` }] : []),
  ];

  return (
    <div className="container-custom py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-6">
        <SearchBar className="max-w-2xl" autoFocus={!query} />
      </div>

      {query ? (
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <aside className="w-full lg:w-64 lg:flex-shrink-0">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-secondary-100" />}>
              <FacetFilters />
            </Suspense>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-xl font-semibold text-secondary-900">
                Results for &quot;{query}&quot;
              </h1>
              <SortDropdown />
            </div>

            <Suspense fallback={<ProductGridSkeleton count={12} />}>
              <SearchResults query={query} />
            </Suspense>

            <div className="mt-8">
              <UrlPagination currentPage={currentPage} totalPages={10} />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-secondary-900">
            Start your search
          </h2>
          <p className="mt-2 text-secondary-600">
            Enter a search term to find products
          </p>
        </div>
      )}
    </div>
  );
}

