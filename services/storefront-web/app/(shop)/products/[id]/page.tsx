import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product/ProductDetail';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductReviews } from '@/components/product/ProductReviews';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Skeleton } from '@/components/common/Skeleton';
import { ProductGridSkeleton } from '@/components/product/ProductGridSkeleton';
import { getProduct } from '@/services/api/products';

interface ProductPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const product = await getProduct(params.id);
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        images: [{ url: product.images[0]?.url }],
      },
    };
  } catch {
    return {
      title: 'Product Not Found',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product;

  try {
    product = await getProduct(params.id);
  } catch {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.category.name, href: `/categories/${product.category.slug}` },
    { label: product.name, href: `/products/${product.id}` },
  ];

  return (
    <div className="container-custom py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Suspense fallback={<Skeleton className="aspect-square w-full" />}>
          <ProductGallery images={product.images} productName={product.name} />
        </Suspense>

        <ProductDetail product={product} />
      </div>

      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold text-secondary-900">Customer Reviews</h2>
        <Suspense fallback={<Skeleton className="h-64" />}>
          <ProductReviews productId={params.id} />
        </Suspense>
      </section>

      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold text-secondary-900">You May Also Like</h2>
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <RelatedProducts productId={params.id} categoryId={product.category.id} />
        </Suspense>
      </section>
    </div>
  );
}

