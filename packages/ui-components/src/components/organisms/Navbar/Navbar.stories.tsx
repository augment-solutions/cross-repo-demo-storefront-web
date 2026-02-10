import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const navigation = [
  { label: 'Home', href: '/' },
  {
    label: 'Women',
    href: '/women',
    children: [
      { label: 'Dresses', href: '/women/dresses' },
      { label: 'Tops', href: '/women/tops' },
      { label: 'Pants', href: '/women/pants' },
      { label: 'Accessories', href: '/women/accessories' },
    ],
  },
  {
    label: 'Men',
    href: '/men',
    children: [
      { label: 'Shirts', href: '/men/shirts' },
      { label: 'Pants', href: '/men/pants' },
      { label: 'Shoes', href: '/men/shoes' },
    ],
  },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Sale', href: '/sale' },
];

const NavbarDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>Open Mobile Menu</Button>
      </div>
      <Navbar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navigation={navigation}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <NavbarDemo />,
};

export const OpenByDefault: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close'),
    navigation,
  },
};

