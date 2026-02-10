import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../../utils/cn';
import type { ProgressBaseProps } from '../../../types/components';

export interface ProgressProps extends ProgressBaseProps {}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const colorClasses = {
  primary: 'bg-primary-600',
  secondary: 'bg-secondary-600',
  success: 'bg-success-600',
  warning: 'bg-warning-600',
  error: 'bg-error-600',
  gray: 'bg-gray-600',
};

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, max = 100, size = 'md', color = 'primary', showValue, ...props }, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-gray-200',
          sizeClasses[size]
        )}
        value={value}
        max={max}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            'h-full transition-all duration-300 ease-in-out rounded-full',
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </ProgressPrimitive.Root>
      {showValue && (
        <span className="text-sm text-gray-600 mt-1">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
});

Progress.displayName = 'Progress';

