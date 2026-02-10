import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icon';

export interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  showValue?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  readOnly = true,
  showValue = false,
  onChange,
  className,
}) => {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const displayValue = hoverValue ?? value;
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  const handleClick = (rating: number) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {stars.map((star) => {
          const isFilled = star <= displayValue;
          const isHalf = star > displayValue && star - 1 < displayValue;

          return (
            <button
              key={star}
              type="button"
              disabled={readOnly}
              onClick={() => handleClick(star)}
              onMouseEnter={() => !readOnly && setHoverValue(star)}
              onMouseLeave={() => !readOnly && setHoverValue(null)}
              className={cn(
                'transition-colors',
                readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110',
                isFilled || isHalf ? 'text-yellow-400' : 'text-gray-300'
              )}
              aria-label={`Rate ${star} out of ${max}`}
            >
              <Icon
                name={isFilled ? 'star-filled' : 'star'}
                className={sizeClasses[size]}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="ml-2 text-sm text-gray-600">
          {value.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
};

Rating.displayName = 'Rating';

