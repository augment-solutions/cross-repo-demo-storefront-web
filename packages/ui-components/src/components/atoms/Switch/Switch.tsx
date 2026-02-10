import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../../utils/cn';
import type { SwitchBaseProps } from '../../../types/components';

export interface SwitchProps extends SwitchBaseProps {
  id?: string;
}

const sizeClasses = {
  sm: { root: 'h-5 w-9', thumb: 'h-4 w-4 data-[state=checked]:translate-x-4' },
  md: { root: 'h-6 w-11', thumb: 'h-5 w-5 data-[state=checked]:translate-x-5' },
  lg: { root: 'h-7 w-14', thumb: 'h-6 w-6 data-[state=checked]:translate-x-7' },
};

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, checked, onCheckedChange, label, isDisabled, size = 'md', id, ...props }, ref) => {
  const switchId = id || React.useId();
  const sizeClass = sizeClasses[size];

  return (
    <div className="flex items-center">
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={isDisabled}
        className={cn(
          'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-primary-600 data-[state=unchecked]:bg-gray-200',
          sizeClass.root,
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
            'data-[state=unchecked]:translate-x-0',
            sizeClass.thumb
          )}
        />
      </SwitchPrimitive.Root>
      {label && (
        <label
          htmlFor={switchId}
          className={cn(
            'ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            isDisabled && 'cursor-not-allowed opacity-70'
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';

