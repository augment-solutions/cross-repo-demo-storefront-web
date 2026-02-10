'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronRight, User, Heart, ShoppingBag, HelpCircle } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useUIStore } from '@/store/uiStore';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'Shop All', href: '/products', icon: ShoppingBag },
  { name: 'Categories', href: '/categories', icon: null },
  { name: 'New Arrivals', href: '/products?sort=newest', icon: null },
  { name: 'Sale', href: '/products?sale=true', icon: null },
];

const categories = [
  { name: 'Electronics', href: '/categories/electronics' },
  { name: 'Clothing', href: '/categories/clothing' },
  { name: 'Home & Garden', href: '/categories/home-garden' },
  { name: 'Sports', href: '/categories/sports' },
  { name: 'Beauty', href: '/categories/beauty' },
];

const accountLinks = [
  { name: 'My Account', href: '/account/profile', icon: User },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export function MobileMenu() {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const { isAuthenticated } = useUser();

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-secondary-200 px-4 py-4">
          <Logo />
          <button
            type="button"
            onClick={closeMobileMenu}
            className="rounded-md p-2 text-secondary-400 hover:bg-secondary-100"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* Main Navigation */}
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  'flex items-center justify-between rounded-md px-3 py-2 text-base font-medium',
                  pathname === item.href
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-secondary-600 hover:bg-secondary-50'
                )}
              >
                <span className="flex items-center gap-3">
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.name}
                </span>
                <ChevronRight className="h-5 w-5 text-secondary-400" />
              </Link>
            ))}
          </nav>

          {/* Categories */}
          <div className="mt-6 border-t border-secondary-200 px-4 pt-6">
            <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-secondary-500">
              Categories
            </h3>
            <nav className="mt-3 space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    'block rounded-md px-3 py-2 text-sm',
                    pathname === category.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  )}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Account Links */}
          <div className="mt-6 border-t border-secondary-200 px-4 pt-6">
            <nav className="space-y-1">
              {accountLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-base text-secondary-600 hover:bg-secondary-50"
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Auth Button */}
          <div className="mt-6 px-4">
            {isAuthenticated ? (
              <Link
                href="/account/profile"
                onClick={closeMobileMenu}
                className="block w-full rounded-md bg-primary-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary-700"
              >
                My Account
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="block w-full rounded-md bg-primary-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

