import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';
import * as React from 'react';

const meta: Meta<typeof Rating> = {
  title: 'Molecules/Rating',
  component: Rating,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    value: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 4,
  },
};

export const WithValue: Story = {
  args: {
    value: 4.5,
    showValue: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={4} size="sm" />
      <Rating value={4} size="md" />
      <Rating value={4} size="lg" />
    </div>
  ),
};

const InteractiveRating = () => {
  const [value, setValue] = React.useState(0);
  return (
    <div className="space-y-2">
      <Rating value={value} onChange={setValue} readOnly={false} />
      <p className="text-sm text-gray-600">Selected: {value} stars</p>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveRating />,
};

export const DifferentValues: Story = {
  render: () => (
    <div className="space-y-2">
      <Rating value={1} showValue />
      <Rating value={2} showValue />
      <Rating value={3} showValue />
      <Rating value={4} showValue />
      <Rating value={5} showValue />
    </div>
  ),
};

export const ProductReview: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Rating value={4.5} size="sm" />
      <span className="text-sm text-gray-500">(128 reviews)</span>
    </div>
  ),
};

