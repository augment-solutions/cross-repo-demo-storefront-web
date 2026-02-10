import type { Meta, StoryObj } from '@storybook/react';
import { ProductGrid } from './ProductGrid';

const meta: Meta<typeof ProductGrid> = {
  title: 'Organisms/ProductGrid',
  component: ProductGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockProducts = [
  { id: '1', name: 'Classic Cotton T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', rating: 4.5, reviewCount: 128 },
  { id: '2', name: 'Premium Leather Jacket', price: 199.99, originalPrice: 299.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', rating: 4.8, reviewCount: 64, badge: 'Sale' },
  { id: '3', name: 'Minimalist Watch', price: 129.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.7, reviewCount: 89 },
  { id: '4', name: 'Wireless Headphones', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', rating: 4.5, reviewCount: 312 },
  { id: '5', name: 'Sunglasses', price: 79.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', rating: 4.3, reviewCount: 67 },
  { id: '6', name: 'Running Shoes', price: 149.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', rating: 4.9, reviewCount: 256, badge: 'Best Seller' },
  { id: '7', name: 'Canvas Backpack', price: 89.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', rating: 4.4, reviewCount: 45 },
  { id: '8', name: 'Denim Jacket', price: 109.99, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400', rating: 4.6, reviewCount: 78 },
];

export const Default: Story = {
  args: {
    products: mockProducts,
    columns: 4,
    onAddToCart: (id) => console.log('Add to cart:', id),
    onAddToWishlist: (id) => console.log('Add to wishlist:', id),
    onProductClick: (id) => console.log('Product clicked:', id),
  },
};

export const ThreeColumns: Story = {
  args: { ...Default.args, columns: 3 },
};

export const TwoColumns: Story = {
  args: { ...Default.args, columns: 2, products: mockProducts.slice(0, 4) },
};

export const Loading: Story = {
  args: { products: [], isLoading: true },
};

export const Empty: Story = {
  args: { products: [], emptyMessage: 'No products match your filters' },
};

