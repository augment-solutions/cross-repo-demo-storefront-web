'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface UserReview {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
}

interface UserReviewsProps {
  reviews?: UserReview[];
}

const defaultReviews: UserReview[] = [
  {
    id: '1',
    productId: 'prod-1',
    productName: 'Wireless Headphones',
    rating: 5,
    title: 'Amazing sound quality!',
    content: 'These headphones exceeded my expectations. Crystal clear audio.',
    date: '2024-01-15',
    helpful: 8,
  },
  {
    id: '2',
    productId: 'prod-2',
    productName: 'Smart Watch',
    rating: 4,
    title: 'Great features',
    content: 'Love the fitness tracking. Battery could be better.',
    date: '2024-01-10',
    helpful: 3,
  },
];

export function UserReviews({ reviews = defaultReviews }: UserReviewsProps) {
  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map(star => (
        star <= rating ? (
          <StarIcon key={star} className="w-4 h-4 text-yellow-400" />
        ) : (
          <StarOutlineIcon key={star} className="w-4 h-4 text-gray-300" />
        )
      ))}
    </div>
  );

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">You haven&apos;t written any reviews yet.</p>
        <Link href="/account/orders" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
          Review your past purchases
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Your Reviews</h2>
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <Link 
                  href={`/products/${review.productId}`}
                  className="font-medium text-gray-900 hover:text-blue-600"
                >
                  {review.productName}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
                <button className="text-sm text-red-600 hover:text-red-700">Delete</button>
              </div>
            </div>
            <h3 className="font-medium text-gray-900 mt-3">{review.title}</h3>
            <p className="text-gray-600 mt-1">{review.content}</p>
            <p className="text-sm text-gray-500 mt-2">{review.helpful} people found this helpful</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserReviews;

