'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { useCheckout } from '@/hooks/useCheckout';

const shippingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'Valid ZIP code required'),
  country: z.string().min(1, 'Country is required'),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
  onNext: () => void;
}

export function ShippingForm({ onNext }: ShippingFormProps) {
  const { shippingAddress, setShippingAddress, isLoading } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingAddress || {},
  });

  const onSubmit = async (data: ShippingFormData) => {
    await setShippingAddress(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="First Name" {...register('firstName')} error={errors.firstName?.message} required />
        <Input label="Last Name" {...register('lastName')} error={errors.lastName?.message} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} required />
        <Input label="Phone" type="tel" {...register('phone')} error={errors.phone?.message} required />
      </div>

      <Input label="Address Line 1" {...register('address1')} error={errors.address1?.message} required />
      <Input label="Address Line 2 (Optional)" {...register('address2')} />

      <div className="grid gap-4 sm:grid-cols-3">
        <Input label="City" {...register('city')} error={errors.city?.message} required />
        <Input label="State" {...register('state')} error={errors.state?.message} required />
        <Input label="ZIP Code" {...register('zipCode')} error={errors.zipCode?.message} required />
      </div>

      <Select
        label="Country"
        {...register('country')}
        error={errors.country?.message}
        options={[
          { value: 'US', label: 'United States' },
          { value: 'CA', label: 'Canada' },
          { value: 'GB', label: 'United Kingdom' },
        ]}
        required
      />

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading} size="lg">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
}

