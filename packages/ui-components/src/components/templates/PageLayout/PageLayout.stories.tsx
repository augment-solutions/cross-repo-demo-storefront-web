import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';

const meta: Meta<typeof PageLayout> = {
  title: 'Templates/PageLayout',
  component: PageLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Women', href: '/women', children: [{ label: 'Dresses', href: '/women/dresses' }, { label: 'Tops', href: '/women/tops' }] },
  { label: 'Men', href: '/men' },
  { label: 'Sale', href: '/sale' },
];

const footerSections = [
  { title: 'Shop', links: [{ label: 'New Arrivals', href: '/new' }, { label: 'Women', href: '/women' }, { label: 'Men', href: '/men' }] },
  { title: 'Support', links: [{ label: 'Help', href: '/help' }, { label: 'Contact', href: '/contact' }] },
];

export const Default: Story = {
  args: {
    headerProps: {
      navigation: navigation.map((n) => ({ label: n.label, href: n.href })),
      cartItemCount: 3,
      wishlistCount: 2,
    },
    footerProps: { sections: footerSections },
    navigation,
    children: (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Page Content</h1>
        <p className="text-gray-600">This is the main content area of the page layout.</p>
      </div>
    ),
  },
};

export const NoFooter: Story = {
  args: {
    ...Default.args,
    showFooter: false,
  },
};

