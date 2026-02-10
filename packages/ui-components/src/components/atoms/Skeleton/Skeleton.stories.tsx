import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: 200,
    height: 16,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 48,
    height: 48,
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 200,
    height: 120,
  },
};

export const ProductCard: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="text" width="80%" height={16} />
      <Skeleton variant="text" width="60%" height={16} />
      <Skeleton variant="text" width="40%" height={20} />
    </div>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={64} height={64} />
      <div className="space-y-2">
        <Skeleton variant="text" width={150} height={20} />
        <Skeleton variant="text" width={100} height={14} />
      </div>
    </div>
  ),
};

