import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

export function Spinner({ size = 'md', className, label = 'Loading...' }: SpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
    xl: 'h-12 w-12 border-4',
  };

  return (
    <div className={cn('flex items-center justify-center', className)} role="status">
      <div
        className={cn(
          'animate-spin rounded-full border-primary-200 border-t-primary-600',
          sizes[size]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function PageSpinner() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-4 text-secondary-600">Loading...</p>
      </div>
    </div>
  );
}

export function OverlaySpinner({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-4 text-secondary-600">Processing...</p>
      </div>
    </div>
  );
}

