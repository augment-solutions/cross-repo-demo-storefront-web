import { Suspense } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { PromoBanner } from '@/components/home/PromoBanner';
import { NewArrivals } from '@/components/home/NewArrivals';
import { BestSellers } from '@/components/home/BestSellers';
import { Skeleton } from '@/components/common/Skeleton';
import { ProductGridSkeleton } from '@/components/product/ProductGridSkeleton';

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <HeroSection
          title="Discover Premium Quality"
          subtitle="Explore our curated collection of exceptional products designed to elevate your everyday experience."
          ctaText="Shop Now"
          ctaLink="/products"
          secondaryCtaText="View Collections"
          secondaryCtaLink="/categories"
          backgroundImage="/hero-bg.jpg"
        />
      </Suspense>

      <section className="container-custom">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-secondary-900 md:text-3xl">
          Shop by Category
        </h2>
        <Suspense fallback={<Skeleton className="h-48" />}>
          <CategoryShowcase />
        </Suspense>
      </section>

      <PromoBanner
        title="Summer Sale - Up to 50% Off"
        subtitle="Don't miss out on our biggest sale of the season. Limited time only!"
        ctaText="Shop the Sale"
        ctaLink="/products?sale=true"
        variant="primary"
      />

      <section className="container-custom">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-secondary-900 md:text-3xl">
          Featured Products
        </h2>
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <FeaturedProducts />
        </Suspense>
      </section>

      <section className="container-custom">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-secondary-900 md:text-3xl">
          New Arrivals
        </h2>
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <NewArrivals />
        </Suspense>
      </section>

      <section className="container-custom">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-secondary-900 md:text-3xl">
          Best Sellers
        </h2>
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <BestSellers />
        </Suspense>
      </section>
    </div>
  );
}

