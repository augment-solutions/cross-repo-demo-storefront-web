import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductGridSkeleton } from '@/components/product/ProductGridSkeleton';
import { CategoryBanner } from '@/components/category/CategoryBanner';
import { SortDropdown } from '@/components/search/SortDropdown';
import { FacetFilters } from '@/components/search/FacetFilters';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { UrlPagination } from '@/components/common/UrlPagination';
import { getCategoryBySlug } from '@/services/api/categories';
import type { ProductsQueryParams } from '@/types/product';

type SortOption = ProductsQueryParams['sort'];

const validSortOptions: SortOption[] = ['newest', 'price-asc', 'price-desc', 'bestselling', 'rating'];

function isValidSortOption(value: string | undefined): value is SortOption {
  return validSortOptions.includes(value as SortOption);
}

interface CategoryPageProps {
  params: { slug: string };
  searchParams: {
    page?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    brand?: string;
    rating?: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  try {
    const category = await getCategoryBySlug(params.slug);
    return {
      title: category.name,
      description: category.description,
    };
  } catch {
    return { title: 'Category Not Found' };
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  let category;

  try {
    category = await getCategoryBySlug(params.slug);
  } catch {
    notFound();
  }

  const currentPage = Number(searchParams.page) || 1;
  const sort: SortOption = isValidSortOption(searchParams.sort) ? searchParams.sort : 'newest';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: category.name, href: `/categories/${category.slug}` },
  ];

  return (
    <div>
      <CategoryBanner
        name={category.name}
        description={category.description}
        image={category.image}
        productCount={category.productCount}
      />

      <div className="container-custom py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-6 flex flex-col gap-8 lg:flex-row">
          <aside className="w-full lg:w-64 lg:flex-shrink-0">
            <FacetFilters
              facets={[
                {
                  name: 'Price Range',
                  field: 'price',
                  values: [
                    { value: 'Under $50', count: 25 },
                    { value: '$50 - $100', count: 42 },
                    { value: '$100 - $200', count: 18 },
                    { value: 'Over $200', count: 10 },
                  ],
                },
                {
                  name: 'Rating',
                  field: 'rating',
                  values: [
                    { value: '4 stars & up', count: 65 },
                    { value: '3 stars & up', count: 82 },
                    { value: '2 stars & up', count: 90 },
                  ],
                },
              ]}
            />
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-secondary-600">
                {category.productCount ?? 0} products
              </p>
              <SortDropdown />
            </div>

            <Suspense fallback={<ProductGridSkeleton count={12} />}>
              <ProductGrid
                page={currentPage}
                sort={sort}
                filters={{ ...searchParams, category: category.id }}
              />
            </Suspense>

            <div className="mt-8">
              <UrlPagination
                currentPage={currentPage}
                totalPages={Math.ceil((category.productCount ?? 0) / 12)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

