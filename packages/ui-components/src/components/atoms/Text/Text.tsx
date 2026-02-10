import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'label';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorClasses = {
  default: 'text-gray-900',
  muted: 'text-gray-500',
  primary: 'text-primary-600',
  success: 'text-success-600',
  warning: 'text-warning-600',
  error: 'text-error-600',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = 'p',
      size = 'md',
      weight = 'normal',
      color = 'default',
      align = 'left',
      truncate,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return React.createElement(
      Component,
      {
        ref,
        className: cn(
          sizeClasses[size],
          weightClasses[weight],
          colorClasses[color],
          alignClasses[align],
          truncate && 'truncate',
          className
        ),
        ...props,
      },
      children
    );
  }
);

Text.displayName = 'Text';

