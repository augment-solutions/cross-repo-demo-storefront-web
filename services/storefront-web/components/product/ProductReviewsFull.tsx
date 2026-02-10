'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  verified?: boolean;
}

interface ProductReviewsFullProps {
  productId: string;
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

const defaultReviews: Review[] = [
  {
    id: '1',
    author: 'John D.',
    rating: 5,
    title: 'Excellent product!',
    content: 'This exceeded my expectations. Great quality and fast shipping.',
    date: '2024-01-15',
    helpful: 12,
    verified: true,
  },
  {
    id: '2',
    author: 'Sarah M.',
    rating: 4,
    title: 'Good value',
    content: 'Nice product for the price. Would recommend.',
    date: '2024-01-10',
    helpful: 5,
    verified: true,
  },
];

export function ProductReviewsFull({ 
  reviews = defaultReviews, 
  averageRating = 4.5, 
  totalReviews = 127 
}: ProductReviewsFullProps) {
  const [sortBy, setSortBy] = useState('recent');

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          star <= rating ? (
            <StarIcon key={star} className="w-5 h-5 text-yellow-400" />
          ) : (
            <StarOutlineIcon key={star} className="w-5 h-5 text-gray-300" />
          )
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-2">
            {renderStars(Math.round(averageRating))}
            <span className="text-lg font-medium text-gray-900">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({totalReviews} reviews)</span>
          </div>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {renderStars(review.rating)}
                <span className="font-medium text-gray-900">{review.title}</span>
              </div>
              {review.verified && (
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                  Verified Purchase
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-2">
              By {review.author} on {new Date(review.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{review.content}</p>
            <div className="mt-4 flex items-center gap-4">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Helpful ({review.helpful})
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductReviewsFull;

