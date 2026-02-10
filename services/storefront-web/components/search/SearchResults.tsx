'use client';

import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { useProducts } from '@/hooks/api/useProducts';

interface SearchResult {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  category?: string;
}

interface SearchResultsProps {
  query: string;
  results?: SearchResult[];
  totalResults?: number;
}

export function SearchResults({ query, results: propResults, totalResults: propTotalResults }: SearchResultsProps) {
  const { data, isLoading } = useProducts({
    search: query,
    limit: 12,
    enabled: !propResults,
  });

  const results = propResults || (data?.items || []).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.compareAtPrice,
    image: p.images?.[0]?.url,
    rating: p.rating,
    reviewCount: p.reviewCount,
    category: p.category.name,
  }));
  const totalResults = propTotalResults ?? data?.total;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No results found{query ? ` for "${query}"` : ''}
        </p>
        <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div>
      {totalResults !== undefined && (
        <p className="text-sm text-gray-500 mb-4">
          {totalResults} results{query ? ` for "${query}"` : ''}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map(product => (
          <Link 
            key={product.id} 
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sale
                </span>
              )}
            </div>
            <h3 className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
              {product.name}
            </h3>
            {product.category && (
              <p className="text-sm text-gray-500">{product.category}</p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.rating !== undefined && (
              <div className="flex items-center gap-1 mt-1">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
                {product.reviewCount !== undefined && (
                  <span className="text-sm text-gray-400">({product.reviewCount})</span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;

