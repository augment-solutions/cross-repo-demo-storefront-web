import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Account' },
    ],
  },
};

export const ProductPage: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Men', href: '/men' },
      { label: 'Clothing', href: '/men/clothing' },
      { label: 'T-Shirts', href: '/men/clothing/t-shirts' },
      { label: 'Classic Cotton T-Shirt' },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Current Page' },
    ],
    separator: <span className="text-gray-400">/</span>,
  },
};

