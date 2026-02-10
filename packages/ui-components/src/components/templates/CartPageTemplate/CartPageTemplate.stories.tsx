import type { Meta, StoryObj } from '@storybook/react';
import { CartPageTemplate } from './CartPageTemplate';

const meta: Meta<typeof CartPageTemplate> = {
  title: 'Templates/CartPageTemplate',
  component: CartPageTemplate,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  { id: '1', name: 'Classic Cotton T-Shirt', price: 29.99, quantity: 2, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', size: 'M', color: 'Black' },
  { id: '2', name: 'Minimalist Watch', price: 129.99, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { id: '3', name: 'Wireless Headphones', price: 199.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', color: 'White' },
];

export const Default: Story = {
  args: {
    items: mockItems,
    subtotal: 389.96,
    shipping: 0,
    tax: 31.20,
    total: 421.16,
    onQuantityChange: (id, qty) => console.log('Quantity changed:', id, qty),
    onRemove: (id) => console.log('Remove:', id),
    onApplyCoupon: (code) => console.log('Apply coupon:', code),
    onCheckout: () => console.log('Checkout'),
  },
};

export const WithShipping: Story = {
  args: {
    ...Default.args,
    shipping: 9.99,
    total: 431.15,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    subtotal: 0,
    total: 0,
  },
};

export const CheckoutLoading: Story = {
  args: {
    ...Default.args,
    isCheckoutLoading: true,
  },
};

