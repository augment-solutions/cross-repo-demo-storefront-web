import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icon';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
}

const variantClasses = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-success-50 border-success-200 text-success-800',
  warning: 'bg-warning-50 border-warning-200 text-warning-800',
  error: 'bg-error-50 border-error-200 text-error-800',
};

const iconColors = {
  info: 'text-blue-500',
  success: 'text-success-500',
  warning: 'text-warning-500',
  error: 'text-error-500',
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, onClose, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative flex gap-3 rounded-lg border p-4',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div className={cn('flex-shrink-0', iconColors[variant])}>
          {variant === 'info' && (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
          {variant === 'success' && <Icon name="check" className="h-5 w-5" />}
          {variant === 'warning' && (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {variant === 'error' && <Icon name="close" className="h-5 w-5" />}
        </div>
        <div className="flex-1">
          {title && <h5 className="font-medium mb-1">{title}</h5>}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close alert"
          >
            <Icon name="close" size="sm" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

