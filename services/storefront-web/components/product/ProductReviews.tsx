'use client';

import Link from 'next/link';
import { Star, ThumbsUp } from 'lucide-react';
import { Rating } from '@/components/common/Rating';
import { Button } from '@/components/common/Button';
import { useReviews } from '@/hooks/api/useReviews';
import { formatDate } from '@/lib/formatters';

interface ProductReviewsProps {
  productId: string;
  limit?: number;
}

export function ProductReviews({ productId, limit = 3 }: ProductReviewsProps) {
  const { data, isLoading } = useReviews(productId, { limit });

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-24 rounded-lg bg-secondary-100" />
      ))}
    </div>;
  }

  const reviews = data?.items || [];
  const averageRating = data?.averageRating ?? 0;
  const totalReviews = data?.total ?? 0;
  const distribution = data?.ratingDistribution;

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      {totalReviews > 0 && (
        <div className="flex flex-col gap-6 rounded-lg bg-secondary-50 p-6 sm:flex-row sm:items-center">
          <div className="text-center">
            <p className="text-4xl font-bold text-secondary-900">{averageRating.toFixed(1)}</p>
            <Rating value={averageRating} size="lg" className="mt-2 justify-center" />
            <p className="mt-1 text-sm text-secondary-500">{totalReviews} reviews</p>
          </div>
          {distribution && (
            <div className="flex-1 space-y-2">
              {([5, 4, 3, 2, 1] as const).map((star) => {
                const count = distribution[star] || 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-3 text-sm text-secondary-600">{star}</span>
                    <Star className="h-4 w-4 text-yellow-400" />
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary-200">
                      <div className="h-full rounded-full bg-yellow-400" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="w-8 text-right text-sm text-secondary-500">{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="divide-y divide-secondary-200">
        {reviews.length === 0 ? (
          <p className="py-8 text-center text-secondary-500">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review) => (
            <article key={review.id} className="py-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <Rating value={review.rating} size="sm" />
                    {review.isVerifiedPurchase && (
                      <span className="rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success-600">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <h4 className="mt-2 font-medium text-secondary-900">{review.title}</h4>
                </div>
                <time className="text-sm text-secondary-500">{formatDate(review.createdAt)}</time>
              </div>
              <p className="mt-3 text-secondary-600">{review.content}</p>
              <div className="mt-4 flex items-center gap-4">
                <p className="text-sm text-secondary-500">
                  By <span className="font-medium">{review.userName}</span>
                </p>
                <button className="flex items-center gap-1 text-sm text-secondary-500 hover:text-secondary-700">
                  <ThumbsUp className="h-4 w-4" />
                  Helpful ({review.helpfulCount})
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* View All Link */}
      {data && data.total > limit && (
        <div className="text-center">
          <Link href={`/products/${productId}/reviews`}>
            <Button variant="outline">View All {data.total} Reviews</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

