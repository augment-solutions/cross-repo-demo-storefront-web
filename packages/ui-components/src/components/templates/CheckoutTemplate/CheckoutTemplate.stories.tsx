import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutTemplate } from './CheckoutTemplate';

const meta: Meta<typeof CheckoutTemplate> = {
  title: 'Templates/CheckoutTemplate',
  component: CheckoutTemplate,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  { id: '1', name: 'Classic Cotton T-Shirt', price: 29.99, quantity: 2, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
  { id: '2', name: 'Minimalist Watch', price: 129.99, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
];

export const ShippingStep: Story = {
  args: {
    items: mockItems,
    subtotal: 189.97,
    shipping: 0,
    tax: 15.20,
    total: 205.17,
    step: 'shipping',
    onSubmitShipping: (data) => console.log('Shipping submitted:', data),
  },
};

export const PaymentStep: Story = {
  args: {
    ...ShippingStep.args,
    step: 'payment',
  },
};

export const ReviewStep: Story = {
  args: {
    ...ShippingStep.args,
    step: 'review',
  },
};

export const Loading: Story = {
  args: {
    ...ShippingStep.args,
    isLoading: true,
  },
};

