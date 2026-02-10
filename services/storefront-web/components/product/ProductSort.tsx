'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface SortOption {
  id: string;
  label: string;
}

interface ProductSortProps {
  options?: SortOption[];
  selectedId?: string;
  onSortChange?: (sortId: string) => void;
}

const defaultOptions: SortOption[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'bestselling', label: 'Best Selling' },
];

export function ProductSort({ options = defaultOptions, selectedId, onSortChange }: ProductSortProps) {
  const [selected, setSelected] = useState(selectedId || options[0]?.id);
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.id === selected);

  const handleSelect = (optionId: string) => {
    setSelected(optionId);
    setIsOpen(false);
    onSortChange?.(optionId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <span>Sort by: {selectedOption?.label}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map(option => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                selected === option.id ? 'text-blue-600 font-medium' : 'text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductSort;

