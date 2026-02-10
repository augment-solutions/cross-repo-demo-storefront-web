import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../../../utils/cn';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
  isDisabled?: boolean;
  isRequired?: boolean;
  className?: string;
  name?: string;
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ options, value, onValueChange, label, error, orientation = 'vertical', isDisabled, isRequired, className, name }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <span className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {isRequired && <span className="text-error-500 ml-1">*</span>}
        </span>
      )}
      <RadioGroupPrimitive.Root
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        disabled={isDisabled}
        orientation={orientation}
        name={name}
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-4',
          className
        )}
        aria-invalid={!!error}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-start">
            <RadioGroupPrimitive.Item
              id={`${name}-${option.value}`}
              value={option.value}
              disabled={option.disabled}
              className={cn(
                'h-5 w-5 rounded-full border border-gray-300 bg-white mt-0.5',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'data-[state=checked]:border-primary-600'
              )}
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <label
              htmlFor={`${name}-${option.value}`}
              className={cn(
                'ml-2 text-sm',
                option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              )}
            >
              <span className="font-medium text-gray-900">{option.label}</span>
              {option.description && (
                <span className="block text-gray-500">{option.description}</span>
              )}
            </label>
          </div>
        ))}
      </RadioGroupPrimitive.Root>
      {error && (
        <p className="mt-1 text-sm text-error-600" role="alert">{error}</p>
      )}
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';

