'use client';

import { useState } from 'react';
import { TagIcon } from '@heroicons/react/24/outline';

interface PromoCodeInputProps {
  onApply?: (code: string) => Promise<boolean>;
}

export function PromoCodeInput({ onApply }: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await onApply?.(code);
      if (result) {
        setSuccess(true);
      } else {
        setError('Invalid promo code');
      }
    } catch {
      setError('Failed to apply promo code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter promo code"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={success}
          />
        </div>
        <button
          onClick={handleApply}
          disabled={isLoading || success || !code.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Applying...' : success ? 'Applied' : 'Apply'}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">Promo code applied successfully!</p>}
    </div>
  );
}

export default PromoCodeInput;

