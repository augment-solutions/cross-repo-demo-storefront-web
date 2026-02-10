import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icon';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, className, ...props }, ref) => {
    const defaultSeparator = <Icon name="chevron-right" size="xs" className="text-gray-400" />;

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn('', className)} {...props}>
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center">
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={cn(
                      'text-sm',
                      isLast ? 'text-gray-900 font-medium' : 'text-gray-500'
                    )}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className="ml-2" aria-hidden="true">
                    {separator || defaultSeparator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

