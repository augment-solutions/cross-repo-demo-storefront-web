import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Icon } from '../../atoms/Icon';
import { Rating } from '../../molecules/Rating';
import { Breadcrumb, BreadcrumbItem } from '../../molecules/Breadcrumb';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../molecules/Tabs';
import { ReviewList, Review } from '../../organisms/ReviewList';
import { ProductGrid } from '../../organisms/ProductGrid';

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductPageTemplateProps {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: ProductImage[];
  rating?: number;
  reviewCount?: number;
  options?: ProductOption[];
  inStock?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  reviews?: Review[];
  relatedProducts?: any[];
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
  className?: string;
}

export const ProductPageTemplate: React.FC<ProductPageTemplateProps> = ({
  name,
  price,
  originalPrice,
  description,
  images,
  rating,
  reviewCount,
  options = [],
  inStock = true,
  breadcrumbs = [],
  reviews = [],
  relatedProducts = [],
  onAddToCart,
  onAddToWishlist,
  className,
}) => {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState<Record<string, string>>({});
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className={cn('max-w-7xl mx-auto px-4 py-8', className)}>
      {breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} className="mb-6" />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img src={images[selectedImage]?.src} alt={images[selectedImage]?.alt} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={cn('w-20 h-20 rounded-md overflow-hidden border-2', i === selectedImage ? 'border-primary-600' : 'border-transparent')}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{name}</h1>
          {rating !== undefined && (
            <div className="flex items-center gap-2 mb-4">
              <Rating value={rating} size="sm" />
              <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
            </div>
          )}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
            {originalPrice && <span className="text-lg text-gray-500 line-through">${originalPrice.toFixed(2)}</span>}
            {discount > 0 && <Badge variant="error">-{discount}%</Badge>}
          </div>
          <p className="text-gray-600 mb-6">{description}</p>

          {/* Options */}
          {options.map((option) => (
            <div key={option.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{option.name}</label>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => (
                  <button key={value} onClick={() => setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))}
                    className={cn('px-4 py-2 border rounded-md text-sm', selectedOptions[option.name] === value ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-300 hover:border-gray-400')}>
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-3 mt-6">
            <Button size="lg" className="flex-1" onClick={onAddToCart} isDisabled={!inStock} leftIcon={<Icon name="cart" size="sm" />}>
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button size="lg" variant="outline" onClick={onAddToWishlist}><Icon name="heart" /></Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviewCount || 0})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-6"><p className="text-gray-600">{description}</p></TabsContent>
        <TabsContent value="reviews" className="py-6">
          <ReviewList reviews={reviews} averageRating={rating} totalReviews={reviewCount} />
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      )}
    </div>
  );
};

ProductPageTemplate.displayName = 'ProductPageTemplate';

