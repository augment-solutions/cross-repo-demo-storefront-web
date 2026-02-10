import Link from 'next/link';
import { Logo } from '@/components/common/Logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 bg-primary-600 lg:block">
        <div className="flex h-full flex-col items-center justify-center p-12 text-white">
          <Logo variant="white" size="lg" />
          <h1 className="mt-8 text-4xl font-bold">Welcome to Ecomm Store</h1>
          <p className="mt-4 max-w-md text-center text-lg text-primary-100">
            Discover amazing products at great prices. Join our community of
            happy shoppers today.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm text-primary-200">Products</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-sm text-primary-200">Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100K+</p>
              <p className="text-sm text-primary-200">Orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex w-full flex-col lg:w-1/2">
        <header className="p-6">
          <Link href="/" className="lg:hidden">
            <Logo />
          </Link>
        </header>
        <main className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md">{children}</div>
        </main>
        <footer className="p-6 text-center text-sm text-secondary-500">
          <p>© {new Date().getFullYear()} Ecomm Store. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

