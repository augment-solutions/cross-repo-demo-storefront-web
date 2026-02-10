'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { SearchSuggestions } from './SearchSuggestions';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchStore } from '@/store/searchStore';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onClose?: () => void;
}

export function SearchBar({
  className,
  placeholder = 'Search products...',
  autoFocus = false,
  onClose,
}: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const { addRecentSearch } = useSearchStore();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query.trim());
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
      onClose?.();
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    addRecentSearch(suggestion);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    setIsFocused(false);
    onClose?.();
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-400" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-secondary-300 bg-white py-2.5 pl-10 pr-10 text-secondary-900 placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            aria-label="Search products"
            autoComplete="off"
          />
          {query && (
            <button type="button" onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600" aria-label="Clear search">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>

      {isFocused && (
        <SearchSuggestions query={debouncedQuery} onSelect={handleSuggestionClick} />
      )}
    </div>
  );
}

