import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '../../../utils/cn';
import type { CheckboxBaseProps } from '../../../types/components';

export interface CheckboxProps extends CheckboxBaseProps {
  id?: string;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, checked, onCheckedChange, label, isDisabled, isRequired, id, ...props }, ref) => {
  const checkboxId = id || React.useId();

  return (
    <div className="flex items-center">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={isDisabled}
        className={cn(
          'peer h-5 w-5 shrink-0 rounded border border-gray-300 bg-white ring-offset-white',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600',
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            'ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            isDisabled && 'cursor-not-allowed opacity-70'
          )}
        >
          {label}
          {isRequired && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

