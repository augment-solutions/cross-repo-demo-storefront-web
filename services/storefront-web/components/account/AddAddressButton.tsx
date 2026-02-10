'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface AddAddressButtonProps {
  onAddressAdded?: () => void;
}

export function AddAddressButton({ onAddressAdded }: AddAddressButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    // TODO: Implement address form modal
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <PlusIcon className="w-5 h-5" />
      Add New Address
    </button>
  );
}

export default AddAddressButton;

