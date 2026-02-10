import * as React from 'react';
import { cn } from '../../../utils/cn';
import type { SkeletonBaseProps } from '../../../types/components';

export interface SkeletonProps extends SkeletonBaseProps {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = 'rectangular',
      width,
      height,
      animation = 'pulse',
      ...props
    },
    ref
  ) => {
    const animationClasses = {
      pulse: 'animate-pulse',
      wave: 'animate-pulse',
      none: '',
    };

    const variantClasses = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-md',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-gray-200',
          animationClasses[animation],
          variantClasses[variant],
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

