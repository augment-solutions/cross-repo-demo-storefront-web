import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'primary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Click me',
  },
};

export const Primary: Story = {
  args: {
    href: '#',
    children: 'Primary link',
    variant: 'primary',
  },
};

export const Muted: Story = {
  args: {
    href: '#',
    children: 'Muted link',
    variant: 'muted',
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    children: 'External link',
    isExternal: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link href="#" variant="default">Default link</Link>
      <Link href="#" variant="primary">Primary link</Link>
      <Link href="#" variant="muted">Muted link</Link>
      <Link href="https://example.com" isExternal>External link</Link>
    </div>
  ),
};

export const InlineText: Story = {
  render: () => (
    <p className="text-gray-600">
      By signing up, you agree to our{' '}
      <Link href="#" variant="primary">Terms of Service</Link>
      {' '}and{' '}
      <Link href="#" variant="primary">Privacy Policy</Link>.
    </p>
  ),
};

