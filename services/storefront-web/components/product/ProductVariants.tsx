'use client';

import { cn } from '@/lib/utils';
import type { ProductVariant } from '@/types/product';

interface ProductVariantsProps {
  variants: ProductVariant[];
  selected: string | null;
  onSelect: (variantId: string) => void;
}

export function ProductVariants({ variants, selected, onSelect }: ProductVariantsProps) {
  // Group variants by option type (e.g., color, size)
  const groupedVariants = variants.reduce((acc, variant) => {
    const type = variant.type || 'option';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(variant);
    return acc;
  }, {} as Record<string, ProductVariant[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedVariants).map(([type, options]) => (
        <div key={type}>
          <label className="text-sm font-medium text-secondary-900 capitalize">
            {type}
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {options.map((variant) => {
              const isSelected = selected === variant.id;
              const isAvailable = variant.stock > 0;

              // Color swatch
              if (type === 'color' && variant.colorCode) {
                return (
                  <button
                    key={variant.id}
                    onClick={() => isAvailable && onSelect(variant.id)}
                    disabled={!isAvailable}
                    className={cn(
                      'relative h-10 w-10 rounded-full border-2 transition-all',
                      isSelected
                        ? 'border-primary-600 ring-2 ring-primary-600 ring-offset-2'
                        : 'border-secondary-200 hover:border-secondary-400',
                      !isAvailable && 'cursor-not-allowed opacity-50'
                    )}
                    style={{ backgroundColor: variant.colorCode }}
                    title={variant.name}
                    aria-label={`Select ${variant.name}`}
                    aria-pressed={isSelected}
                  >
                    {!isAvailable && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="h-px w-full rotate-45 bg-secondary-400" />
                      </span>
                    )}
                  </button>
                );
              }

              // Size or other options
              return (
                <button
                  key={variant.id}
                  onClick={() => isAvailable && onSelect(variant.id)}
                  disabled={!isAvailable}
                  className={cn(
                    'min-w-[3rem] rounded-md border px-4 py-2 text-sm font-medium transition-colors',
                    isSelected
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-secondary-200 text-secondary-700 hover:border-secondary-400',
                    !isAvailable && 'cursor-not-allowed opacity-50 line-through'
                  )}
                  aria-pressed={isSelected}
                >
                  {variant.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

