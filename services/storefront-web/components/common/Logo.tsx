import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
  showText?: boolean;
  className?: string;
}

export function Logo({
  size = 'md',
  variant = 'default',
  showText = true,
  className,
}: LogoProps) {
  const sizes = {
    sm: { icon: 'h-6 w-6', text: 'text-lg' },
    md: { icon: 'h-8 w-8', text: 'text-xl' },
    lg: { icon: 'h-10 w-10', text: 'text-2xl' },
  };

  const colors = {
    default: {
      icon: 'text-primary-600',
      text: 'text-secondary-900',
    },
    white: {
      icon: 'text-white',
      text: 'text-white',
    },
  };

  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      {/* Icon */}
      <svg
        className={cn(sizes[size].icon, colors[variant].icon)}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          rx="6"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M8 12L16 8L24 12V20L16 24L8 20V12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 16V24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 12L16 16L24 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Text */}
      {showText && (
        <span
          className={cn(
            'font-bold tracking-tight',
            sizes[size].text,
            colors[variant].text
          )}
        >
          StoreFront
        </span>
      )}
    </Link>
  );
}

