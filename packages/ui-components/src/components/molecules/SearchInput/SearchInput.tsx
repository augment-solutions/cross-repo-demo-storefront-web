import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icon';
import { Spinner } from '../../atoms/Spinner';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  onClear?: () => void;
}

const sizeClasses = {
  sm: 'h-9 text-sm pl-8 pr-8',
  md: 'h-10 text-sm pl-10 pr-10',
  lg: 'h-12 text-base pl-12 pr-12',
};

const iconSizeClasses = {
  sm: 'left-2',
  md: 'left-3',
  lg: 'left-4',
};

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, size = 'md', isLoading, onClear, value, onChange, ...props }, ref) => {
    const hasValue = !!value && String(value).length > 0;

    return (
      <div className="relative w-full">
        <div className={cn('absolute inset-y-0 flex items-center pointer-events-none text-gray-400', iconSizeClasses[size])}>
          {isLoading ? <Spinner size="sm" /> : <Icon name="search" size="sm" />}
        </div>
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          className={cn(
            'w-full rounded-md border border-gray-300 bg-white',
            'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            sizeClasses[size],
            className
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              'absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600'
            )}
            aria-label="Clear search"
          >
            <Icon name="close" size="sm" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

