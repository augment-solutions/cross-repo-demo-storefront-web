'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/types/category';

interface CategoryNavProps {
  categories: Category[];
  currentSlug?: string;
}

export function CategoryNav({ categories, currentSlug }: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1" aria-label="Categories">
      <Link
        href="/categories"
        className={cn(
          'flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',
          pathname === '/categories'
            ? 'bg-primary-50 text-primary-700'
            : 'text-secondary-700 hover:bg-secondary-50'
        )}
      >
        All Categories
      </Link>

      {categories.map((category) => (
        <div key={category.id}>
          <Link
            href={`/categories/${category.slug}`}
            className={cn(
              'flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',
              currentSlug === category.slug
                ? 'bg-primary-50 text-primary-700'
                : 'text-secondary-700 hover:bg-secondary-50'
            )}
          >
            <span>{category.name}</span>
            {category.productCount && (
              <span className="text-secondary-400">({category.productCount})</span>
            )}
          </Link>

          {/* Subcategories */}
          {category.children && category.children.length > 0 && (
            <div className="ml-4 mt-1 space-y-1">
              {category.children.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  href={`/categories/${subcategory.slug}`}
                  className={cn(
                    'flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors',
                    currentSlug === subcategory.slug
                      ? 'text-primary-700'
                      : 'text-secondary-600 hover:text-secondary-900'
                  )}
                >
                  <ChevronRight className="h-3 w-3" />
                  <span>{subcategory.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

