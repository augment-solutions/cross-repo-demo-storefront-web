import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProductReviewsFull } from '@/components/product/ProductReviewsFull';
import { ReviewStats } from '@/components/product/ReviewStats';
import { WriteReviewForm } from '@/components/product/WriteReviewForm';
import { Skeleton } from '@/components/common/Skeleton';
import { getProduct } from '@/services/api/products';

interface ReviewsPageProps {
  params: { id: string };
  searchParams: {
    page?: string;
    sort?: string;
    rating?: string;
  };
}

export async function generateMetadata({ params }: ReviewsPageProps) {
  try {
    const product = await getProduct(params.id);
    return {
      title: `Reviews for ${product.name}`,
      description: `Read customer reviews for ${product.name}`,
    };
  } catch {
    return { title: 'Reviews' };
  }
}

export default async function ProductReviewsPage({
  params,
  searchParams,
}: ReviewsPageProps) {
  let product;

  try {
    product = await getProduct(params.id);
  } catch {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.name, href: `/products/${product.id}` },
    { label: 'Reviews', href: `/products/${product.id}/reviews` },
  ];

  return (
    <div className="container-custom py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-8">
        <h1 className="text-3xl font-bold text-secondary-900">
          Reviews for {product.name}
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Suspense fallback={<Skeleton className="h-64" />}>
              <ReviewStats
                averageRating={product.rating || 0}
                totalReviews={product.reviewCount || 0}
              />
            </Suspense>

            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold">Write a Review</h3>
              <WriteReviewForm productId={params.id} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <Suspense fallback={<Skeleton className="h-96" />}>
              <ProductReviewsFull
                productId={params.id}
                averageRating={product.rating || 0}
                totalReviews={product.reviewCount || 0}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

