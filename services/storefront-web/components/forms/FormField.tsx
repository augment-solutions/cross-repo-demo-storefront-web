'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  name: string;
  label?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactElement | ((props: { field: any; error: any }) => React.ReactElement);
}

export function FormField({
  name,
  label,
  hint,
  required,
  className,
  children,
}: FormFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          typeof children === 'function'
            ? children({ field, error })
            : children
        }
      />

      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error.message as string}
        </p>
      )}
    </div>
  );
}

