import * as React from 'react';
import { cn } from '../../../utils/cn';
import { badgeVariants } from '../../../utils/variants';
import type { BadgeBaseProps } from '../../../types/components';

export interface BadgeProps extends BadgeBaseProps {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

