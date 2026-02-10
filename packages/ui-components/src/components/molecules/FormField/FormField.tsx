import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Label } from '../../atoms/Label';
import { Input, InputProps } from '../../atoms/Input';

export interface FormFieldProps extends InputProps {
  name: string;
  register?: (name: string) => object;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ name, label, error, hint, isRequired, className, register, ...props }, ref) => {
    const registerProps = register ? register(name) : {};

    return (
      <div className={cn('w-full', className)}>
        {label && (
          <Label htmlFor={name} required={isRequired} className="mb-1">
            {label}
          </Label>
        )}
        <Input
          id={name}
          name={name}
          ref={ref}
          error={error}
          hint={hint}
          {...registerProps}
          {...props}
        />
      </div>
    );
  }
);

FormField.displayName = 'FormField';

