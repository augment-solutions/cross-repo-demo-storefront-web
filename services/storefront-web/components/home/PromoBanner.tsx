import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';

interface PromoBannerProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export function PromoBanner({
  title,
  subtitle,
  ctaText,
  ctaLink,
  variant = 'primary',
  className,
}: PromoBannerProps) {
  const variants = {
    primary: 'bg-primary-600 text-white',
    secondary: 'bg-secondary-900 text-white',
    accent: 'bg-accent-500 text-white',
  };

  return (
    <section className={cn('py-12', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'rounded-2xl px-6 py-12 text-center sm:px-12 sm:py-16',
            variants[variant]
          )}
        >
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
              {subtitle}
            </p>
          )}
          <Link href={ctaLink} className="mt-8 inline-block">
            <Button
              size="lg"
              className={cn(
                variant === 'primary' && 'bg-white text-primary-600 hover:bg-secondary-100',
                variant === 'secondary' && 'bg-white text-secondary-900 hover:bg-secondary-100',
                variant === 'accent' && 'bg-white text-accent-600 hover:bg-secondary-100'
              )}
            >
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

