import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconName } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
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

export const Default: Story = {
  args: {
    name: 'cart',
  },
};

export const AllIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      'cart', 'heart', 'search', 'user', 'menu', 'close',
      'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right',
      'check', 'plus', 'minus', 'star', 'star-filled', 'trash', 'edit', 'eye', 'eye-off',
    ];

    return (
      <div className="grid grid-cols-5 gap-6">
        {icons.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Icon name={name} size="lg" />
            <span className="text-xs text-gray-500">{name}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="heart" size="xs" />
      <Icon name="heart" size="sm" />
      <Icon name="heart" size="md" />
      <Icon name="heart" size="lg" />
      <Icon name="heart" size="xl" />
    </div>
  ),
};

export const Colored: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="heart" className="text-red-500" />
      <Icon name="star-filled" className="text-yellow-500" />
      <Icon name="check" className="text-green-500" />
      <Icon name="close" className="text-gray-500" />
    </div>
  ),
};

