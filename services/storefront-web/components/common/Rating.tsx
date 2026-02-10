'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  interactive = false,
  onChange,
  className,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const handleClick = (rating: number) => {
    if (interactive && onChange) {
      onChange(rating);
    }
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const displayValue = interactive && hoverValue > 0 ? hoverValue : value;
    const isFilled = starValue <= Math.floor(displayValue);
    const isHalf = !isFilled && starValue <= displayValue + 0.5;

    return (
      <button
        key={index}
        type="button"
        onClick={() => handleClick(starValue)}
        onMouseEnter={() => interactive && setHoverValue(starValue)}
        onMouseLeave={() => interactive && setHoverValue(0)}
        disabled={!interactive}
        className={cn(
          'relative',
          interactive && 'cursor-pointer hover:scale-110 transition-transform',
          !interactive && 'cursor-default'
        )}
        aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
      >
        <Star
          className={cn(
            sizes[size],
            isFilled || isHalf
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-secondary-200'
          )}
        />
        {isHalf && (
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <Star
              className={cn(sizes[size], 'fill-yellow-400 text-yellow-400')}
            />
          </div>
        )}
      </button>
    );
  };

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={`Rating: ${value} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, index) => renderStar(index))}
    </div>
  );
}

