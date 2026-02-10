'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useAuth } from '@/hooks/useAuth';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);
    try {
      await forgotPassword(data.email);
      setIsSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-50">
          <CheckCircle className="h-10 w-10 text-success-500" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-secondary-900">
          Check your email
        </h1>
        <p className="mt-4 text-secondary-600">
          We've sent a password reset link to{' '}
          <span className="font-medium text-secondary-900">
            {getValues('email')}
          </span>
        </p>
        <p className="mt-2 text-sm text-secondary-500">
          Didn't receive the email? Check your spam folder or{' '}
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-primary-600 hover:underline"
          >
            try again
          </button>
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex items-center gap-2 text-primary-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm text-secondary-600 hover:text-secondary-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>

      <h1 className="mt-6 text-2xl font-bold text-secondary-900">
        Forgot your password?
      </h1>
      <p className="mt-2 text-secondary-600">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      {error && (
        <div className="mt-4 rounded-md bg-error-50 p-4 text-sm text-error-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Mail className="h-5 w-5" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Send reset link
        </Button>
      </form>
    </div>
  );
}

