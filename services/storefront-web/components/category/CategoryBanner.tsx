'use client';

import Image from 'next/image';

interface CategoryBannerProps {
  name: string;
  description?: string;
  image?: string;
  productCount?: number;
}

export function CategoryBanner({ name, description, image, productCount }: CategoryBannerProps) {
  return (
    <div className="relative h-64 bg-gray-900 rounded-xl overflow-hidden mb-8">
      {image && (
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover opacity-50"
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
        {description && (
          <p className="text-lg text-gray-200 max-w-2xl">{description}</p>
        )}
        {productCount !== undefined && (
          <p className="text-sm text-gray-300 mt-4">{productCount} products</p>
        )}
      </div>
    </div>
  );
}

export default CategoryBanner;

