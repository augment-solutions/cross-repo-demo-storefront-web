import type { Meta, StoryObj } from '@storybook/react';
import { CartItem } from './CartItem';

const meta: Meta<typeof CartItem> = {
  title: 'Organisms/CartItem',
  component: CartItem,
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
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    size: 'M',
    color: 'Black',
    onQuantityChange: (id, qty) => console.log('Quantity changed:', id, qty),
    onRemove: (id) => console.log('Remove:', id),
  },
  decorators: [(Story) => <div className="w-[600px]"><Story /></div>],
};

export const WithoutVariants: Story = {
  args: {
    id: '2',
    name: 'Minimalist Watch',
    price: 129.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  },
  decorators: [(Story) => <div className="w-[600px]"><Story /></div>],
};

export const CartList: Story = {
  render: () => (
    <div className="w-[600px]">
      <CartItem
        id="1"
        name="Classic Cotton T-Shirt"
        price={29.99}
        quantity={2}
        image="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
        size="M"
        color="Black"
      />
      <CartItem
        id="2"
        name="Minimalist Watch"
        price={129.99}
        quantity={1}
        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
      />
      <CartItem
        id="3"
        name="Wireless Headphones"
        price={199.99}
        quantity={1}
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
        color="White"
      />
    </div>
  ),
};

