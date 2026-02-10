'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import type { User, UpdateProfileData } from '@/types/user';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: User;
  onSubmit: (data: UpdateProfileData) => Promise<void>;
  isLoading?: boolean;
}

export function ProfileForm({ user, onSubmit, isLoading }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
    },
  });

  const handleFormSubmit = async (data: ProfileFormData) => {
    await onSubmit({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        disabled
        hint="Email cannot be changed"
      />

      <Input
        label="Phone Number"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading} disabled={!isDirty}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}

