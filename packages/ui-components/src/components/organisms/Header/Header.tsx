import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Badge } from '../../atoms/Badge';
import { SearchInput } from '../../molecules/SearchInput';

export interface HeaderProps {
  logo?: React.ReactNode;
  navigation?: Array<{ label: string; href: string }>;
  cartItemCount?: number;
  wishlistCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onAccountClick?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  navigation = [],
  cartItemCount = 0,
  wishlistCount = 0,
  isLoggedIn = false,
  userName,
  onSearch,
  onCartClick,
  onWishlistClick,
  onAccountClick,
  onMenuClick,
  className,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className={cn('bg-white border-b border-gray-200', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 -ml-2"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Icon name="menu" />
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">{logo || <span className="text-xl font-bold text-primary-600">Store</span>}</div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8 ml-10">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchInput
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
            />
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <button type="button" onClick={onWishlistClick} className="relative p-2 text-gray-600 hover:text-gray-900" aria-label="Wishlist">
              <Icon name="heart" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-primary-600 text-white text-xs rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button type="button" onClick={onCartClick} className="relative p-2 text-gray-600 hover:text-gray-900" aria-label="Cart">
              <Icon name="cart" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-primary-600 text-white text-xs rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Account */}
            <button type="button" onClick={onAccountClick} className="p-2 text-gray-600 hover:text-gray-900" aria-label="Account">
              <Icon name="user" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';

