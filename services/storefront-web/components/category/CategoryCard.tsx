import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types/category';

interface CategoryCardProps {
  category: Category;
  variant?: 'default' | 'compact' | 'featured';
}

export function CategoryCard({ category, variant = 'default' }: CategoryCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className="flex items-center gap-4 rounded-lg border border-secondary-200 bg-white p-4 transition-shadow hover:shadow-md"
      >
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary-100">
          <Image
            src={category.image || '/placeholder-category.jpg'}
            alt={category.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-secondary-900">{category.name}</h3>
          {category.productCount && (
            <p className="text-sm text-secondary-500">
              {category.productCount} products
            </p>
          )}
        </div>
        <ArrowRight className="h-5 w-5 text-secondary-400" />
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className="group relative overflow-hidden rounded-2xl"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={category.image || '/placeholder-category.jpg'}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white">{category.name}</h3>
          {category.description && (
            <p className="mt-2 text-white/80 line-clamp-2">{category.description}</p>
          )}
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white">
            Shop Now <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group overflow-hidden rounded-lg border border-secondary-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-secondary-100">
        <Image
          src={category.image || '/placeholder-category.jpg'}
          alt={category.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-secondary-900 group-hover:text-primary-600">
          {category.name}
        </h3>
        {category.productCount && (
          <p className="mt-1 text-sm text-secondary-500">
            {category.productCount} products
          </p>
        )}
      </div>
    </Link>
  );
}

