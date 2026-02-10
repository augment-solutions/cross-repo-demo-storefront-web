'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserIcon, ShoppingBagIcon, MapPinIcon, HeartIcon, StarIcon, CreditCardIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const navItems = [
  { href: '/account/profile', label: 'Profile', icon: UserIcon },
  { href: '/account/orders', label: 'Orders', icon: ShoppingBagIcon },
  { href: '/account/addresses', label: 'Addresses', icon: MapPinIcon },
  { href: '/account/wishlist', label: 'Wishlist', icon: HeartIcon },
  { href: '/account/reviews', label: 'Reviews', icon: StarIcon },
  { href: '/account/payment-methods', label: 'Payment Methods', icon: CreditCardIcon },
];

interface AccountSidebarProps {
  className?: string;
  onLogout?: () => void;
}

export function AccountSidebar({ className, onLogout }: AccountSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('bg-white rounded-lg shadow-sm p-4', className)}>
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {onLogout && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      )}
    </nav>
  );
}

