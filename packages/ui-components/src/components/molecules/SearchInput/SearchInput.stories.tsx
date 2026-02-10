import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';
import * as React from 'react';

const meta: Meta<typeof SearchInput> = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search products...',
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <SearchInput size="sm" placeholder="Small search" />
      <SearchInput size="md" placeholder="Medium search" />
      <SearchInput size="lg" placeholder="Large search" />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    placeholder: 'Searching...',
    isLoading: true,
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

const ControlledSearchInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <SearchInput
      placeholder="Search products..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
};

export const WithClearButton: Story = {
  render: () => (
    <div className="w-80">
      <ControlledSearchInput />
    </div>
  ),
};

