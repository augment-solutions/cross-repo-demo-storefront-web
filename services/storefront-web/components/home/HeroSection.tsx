import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/common/Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-secondary-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 via-secondary-900/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-secondary-200 sm:text-xl">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={ctaLink}>
              <Button size="lg" className="bg-white text-secondary-900 hover:bg-secondary-100">
                {ctaText}
              </Button>
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link href={secondaryCtaLink}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  {secondaryCtaText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

