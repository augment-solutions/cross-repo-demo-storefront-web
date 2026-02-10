'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  { name: 'Shop All', href: '/products' },
  {
    name: 'Categories',
    href: '/categories',
    children: [
      { name: 'Electronics', href: '/categories/electronics' },
      { name: 'Clothing', href: '/categories/clothing' },
      { name: 'Home & Garden', href: '/categories/home-garden' },
      { name: 'Sports', href: '/categories/sports' },
      { name: 'Beauty', href: '/categories/beauty' },
    ],
  },
  { name: 'New Arrivals', href: '/products?sort=newest' },
  { name: 'Best Sellers', href: '/products?sort=bestselling' },
  { name: 'Sale', href: '/products?sale=true' },
];

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className={cn('flex items-center gap-8', className)}>
      {navigationItems.map((item) => (
        <div
          key={item.name}
          className="relative"
          onMouseEnter={() => item.children && handleMouseEnter(item.name)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={item.href}
            className={cn(
              'flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary-600',
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'text-primary-600'
                : 'text-secondary-600'
            )}
          >
            {item.name}
            {item.children && <ChevronDown className="h-4 w-4" />}
          </Link>

          {/* Dropdown */}
          {item.children && openDropdown === item.name && (
            <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-lg border border-secondary-200 bg-white py-2 shadow-lg animate-fade-in">
              {item.children.map((child) => (
                <Link
                  key={child.name}
                  href={child.href}
                  className={cn(
                    'block px-4 py-2 text-sm transition-colors hover:bg-secondary-50',
                    pathname === child.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-600'
                  )}
                >
                  {child.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

