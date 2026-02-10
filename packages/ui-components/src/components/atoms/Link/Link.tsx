import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'muted' | 'primary';
  isExternal?: boolean;
}

const variantClasses = {
  default: 'text-gray-900 hover:text-gray-700 underline-offset-4 hover:underline',
  muted: 'text-gray-500 hover:text-gray-700 underline-offset-4 hover:underline',
  primary: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline',
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'default', isExternal, children, ...props }, ref) => {
    const externalProps = isExternal
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <a
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded',
          variantClasses[variant],
          className
        )}
        {...externalProps}
        {...props}
      >
        {children}
        {isExternal && (
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';

