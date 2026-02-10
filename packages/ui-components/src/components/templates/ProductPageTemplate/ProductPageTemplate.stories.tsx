import type { Meta, StoryObj } from '@storybook/react';
import { ProductPageTemplate } from './ProductPageTemplate';

const meta: Meta<typeof ProductPageTemplate> = {
  title: 'Templates/ProductPageTemplate',
  component: ProductPageTemplate,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Premium Cotton T-Shirt',
    price: 49.99,
    originalPrice: 79.99,
    description: 'A premium quality cotton t-shirt made from 100% organic cotton. Features a relaxed fit and classic crew neck design. Perfect for everyday wear.',
    images: [
      { src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', alt: 'Front view' },
      { src: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600', alt: 'Back view' },
      { src: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600', alt: 'Detail view' },
    ],
    rating: 4.7,
    reviewCount: 128,
    options: [
      { name: 'Size', values: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Color', values: ['White', 'Black', 'Navy', 'Gray'] },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Men', href: '/men' },
      { label: 'T-Shirts', href: '/men/t-shirts' },
    ],
    reviews: [
      { id: '1', author: 'John D.', rating: 5, title: 'Great quality!', content: 'Love this shirt. Perfect fit and very comfortable.', date: 'Jan 15, 2024', verified: true, helpful: 8 },
      { id: '2', author: 'Sarah M.', rating: 4, content: 'Nice shirt, runs slightly large.', date: 'Jan 10, 2024', verified: true },
    ],
    onAddToCart: () => console.log('Add to cart'),
    onAddToWishlist: () => console.log('Add to wishlist'),
  },
};

export const OutOfStock: Story = {
  args: {
    ...Default.args,
    inStock: false,
  },
};

