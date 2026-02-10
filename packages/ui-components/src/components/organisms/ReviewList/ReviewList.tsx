import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Avatar } from '../../atoms/Avatar';
import { Rating } from '../../molecules/Rating';
import { Button } from '../../atoms/Button';

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title?: string;
  content: string;
  date: string;
  verified?: boolean;
  helpful?: number;
}

export interface ReviewListProps {
  reviews: Review[];
  averageRating?: number;
  totalReviews?: number;
  showSummary?: boolean;
  onHelpful?: (id: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  averageRating,
  totalReviews,
  showSummary = true,
  onHelpful,
  onLoadMore,
  hasMore = false,
  isLoading = false,
  className,
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Summary */}
      {showSummary && averageRating !== undefined && (
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
            <Rating value={averageRating} size="sm" className="mt-1" />
            <div className="text-sm text-gray-500 mt-1">{totalReviews} reviews</div>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
            <div className="flex items-start gap-4">
              <Avatar src={review.avatar} fallback={review.author.charAt(0)} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{review.author}</span>
                  {review.verified && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">Verified</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Rating value={review.rating} size="sm" />
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                {review.title && <h4 className="font-medium text-gray-900 mt-2">{review.title}</h4>}
                <p className="text-gray-600 mt-2">{review.content}</p>
                {onHelpful && (
                  <button
                    type="button"
                    onClick={() => onHelpful(review.id)}
                    className="mt-3 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Helpful {review.helpful ? `(${review.helpful})` : ''}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && onLoadMore && (
        <div className="text-center pt-4">
          <Button variant="outline" onClick={onLoadMore} isLoading={isLoading}>
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

ReviewList.displayName = 'ReviewList';

