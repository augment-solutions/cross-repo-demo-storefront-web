import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { WishlistContent } from '@/components/wishlist/WishlistContent';

export const metadata = {
  title: 'Wishlist',
  description: 'Your saved products',
};

export default function WishlistPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Wishlist', href: '/wishlist' },
  ];

  return (
    <div className="container-custom py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-secondary-900">My Wishlist</h1>
        <p className="mt-2 text-secondary-600">
          Products you&apos;ve saved for later
        </p>

        <div className="mt-8">
          <WishlistContent />
        </div>
      </div>
    </div>
  );
}

