'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { SearchBar } from '@/components/search/SearchBar';
import { MiniCart } from '@/components/cart/MiniCart';
import { useCart } from '@/hooks/useCart';
import { useUser } from '@/hooks/useUser';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Shop', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'New Arrivals', href: '/products?sort=newest' },
  { name: 'Sale', href: '/products?sale=true' },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user, isAuthenticated } = useUser();
  const { openMobileMenu, openCartDrawer } = useUIStore();
  const [showSearch, setShowSearch] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary-200 bg-white">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden rounded-md p-2 text-secondary-600 hover:bg-secondary-100"
            onClick={openMobileMenu}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-600',
                  pathname === item.href
                    ? 'text-primary-600'
                    : 'text-secondary-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden flex-1 max-w-lg mx-8 lg:block">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search toggle (Mobile) */}
            <button
              type="button"
              className="lg:hidden rounded-md p-2 text-secondary-600 hover:bg-secondary-100"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden sm:block rounded-md p-2 text-secondary-600 hover:bg-secondary-100"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <div className="relative" onMouseEnter={() => setShowMiniCart(true)} onMouseLeave={() => setShowMiniCart(false)}>
              <button
                type="button"
                className="relative rounded-md p-2 text-secondary-600 hover:bg-secondary-100"
                onClick={openCartDrawer}
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>
              {showMiniCart && itemCount > 0 && <MiniCart />}
            </div>

            {/* User Account */}
            <Link
              href={isAuthenticated ? '/account/profile' : '/login'}
              className="rounded-md p-2 text-secondary-600 hover:bg-secondary-100"
              aria-label={isAuthenticated ? 'Account' : 'Sign in'}
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="py-3 lg:hidden border-t border-secondary-100">
            <SearchBar autoFocus onClose={() => setShowSearch(false)} />
          </div>
        )}
      </div>
    </header>
  );
}

