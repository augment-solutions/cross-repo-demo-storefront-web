'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  name: string;
  href: string;
}

interface CheckoutProgressProps {
  steps: Step[];
  currentStep: string;
}

export function CheckoutProgress({ steps, currentStep }: CheckoutProgressProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <nav aria-label="Checkout progress">
      <ol className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex items-center">
                <span
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium',
                    isCompleted && 'border-primary-600 bg-primary-600 text-white',
                    isCurrent && 'border-primary-600 text-primary-600',
                    !isCompleted && !isCurrent && 'border-secondary-300 text-secondary-400'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={cn(
                    'ml-3 text-sm font-medium',
                    isCurrent && 'text-primary-600',
                    isCompleted && 'text-secondary-900',
                    !isCompleted && !isCurrent && 'text-secondary-400'
                  )}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-4 h-0.5 w-16 sm:w-24',
                    index < currentIndex ? 'bg-primary-600' : 'bg-secondary-200'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

