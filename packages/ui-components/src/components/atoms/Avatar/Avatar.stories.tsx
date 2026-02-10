import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    alt: 'User avatar',
    name: 'John Doe',
  },
};

export const WithInitials: Story = {
  args: {
    name: 'John Doe',
  },
};

export const NoImageOrName: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" name="John Doe" />
      <Avatar size="sm" name="John Doe" />
      <Avatar size="md" name="John Doe" />
      <Avatar size="lg" name="John Doe" />
      <Avatar size="xl" name="John Doe" />
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-3">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
        className="ring-2 ring-white"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
        className="ring-2 ring-white"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
        className="ring-2 ring-white"
      />
      <Avatar name="+5" className="ring-2 ring-white" fallback="+5" />
    </div>
  ),
};

