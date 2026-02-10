'use client';

import { StarIcon } from '@heroicons/react/24/solid';

interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: number;
}

interface ReviewStatsProps {
  averageRating: number;
  totalReviews: number;
  breakdown?: RatingBreakdown[];
}

const defaultBreakdown: RatingBreakdown[] = [
  { stars: 5, count: 85, percentage: 67 },
  { stars: 4, count: 25, percentage: 20 },
  { stars: 3, count: 10, percentage: 8 },
  { stars: 2, count: 4, percentage: 3 },
  { stars: 1, count: 3, percentage: 2 },
];

export function ReviewStats({ 
  averageRating, 
  totalReviews, 
  breakdown = defaultBreakdown 
}: ReviewStatsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center mt-1">
            {[1, 2, 3, 4, 5].map(star => (
              <StarIcon 
                key={star} 
                className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-1">{totalReviews} reviews</div>
        </div>
      </div>
      
      <div className="space-y-2">
        {breakdown.map(item => (
          <div key={item.stars} className="flex items-center gap-2">
            <span className="text-sm text-gray-600 w-8">{item.stars}★</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-400 rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 w-12 text-right">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewStats;

