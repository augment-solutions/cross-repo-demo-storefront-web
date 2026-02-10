import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Organisms/ProductCard',
  component: ProductCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    rating: 4.5,
    reviewCount: 128,
    onAddToCart: (id) => console.log('Add to cart:', id),
    onAddToWishlist: (id) => console.log('Add to wishlist:', id),
    onClick: (id) => console.log('Clicked:', id),
  },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};

export const WithDiscount: Story = {
  args: {
    id: '2',
    name: 'Premium Leather Jacket',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    rating: 4.8,
    reviewCount: 64,
  },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};

export const WithBadge: Story = {
  args: {
    id: '3',
    name: 'Limited Edition Sneakers',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 5,
    reviewCount: 256,
    badge: 'New Arrival',
  },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};

export const OutOfStock: Story = {
  args: {
    id: '4',
    name: 'Vintage Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400',
    rating: 4.2,
    reviewCount: 45,
    inStock: false,
  },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};

export const ProductGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <ProductCard
        id="1"
        name="Minimalist Watch"
        price={129.99}
        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
        rating={4.7}
        reviewCount={89}
      />
      <ProductCard
        id="2"
        name="Wireless Headphones"
        price={199.99}
        originalPrice={249.99}
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
        rating={4.5}
        reviewCount={312}
        badge="Sale"
      />
      <ProductCard
        id="3"
        name="Sunglasses"
        price={79.99}
        image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"
        rating={4.3}
        reviewCount={67}
      />
    </div>
  ),
};

