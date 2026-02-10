import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const navigation = [
  { label: 'New Arrivals', href: '/new' },
  { label: 'Women', href: '/women' },
  { label: 'Men', href: '/men' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Sale', href: '/sale' },
];

export const Default: Story = {
  args: {
    navigation,
    cartItemCount: 3,
    wishlistCount: 5,
    onSearch: (query) => console.log('Search:', query),
    onCartClick: () => console.log('Cart clicked'),
    onWishlistClick: () => console.log('Wishlist clicked'),
    onAccountClick: () => console.log('Account clicked'),
    onMenuClick: () => console.log('Menu clicked'),
  },
};

export const WithLogo: Story = {
  args: {
    ...Default.args,
    logo: (
      <img
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        alt="Store"
        className="h-8 w-auto"
      />
    ),
  },
};

export const LoggedIn: Story = {
  args: {
    ...Default.args,
    isLoggedIn: true,
    userName: 'John Doe',
  },
};

export const EmptyCart: Story = {
  args: {
    ...Default.args,
    cartItemCount: 0,
    wishlistCount: 0,
  },
};

export const MinimalNav: Story = {
  args: {
    navigation: [
      { label: 'Shop', href: '/shop' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    cartItemCount: 1,
  },
};

