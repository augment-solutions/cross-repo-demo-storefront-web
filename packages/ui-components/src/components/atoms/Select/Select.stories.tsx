import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
];

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select size...',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const WithLabel: Story = {
  args: {
    options,
    label: 'Size',
    placeholder: 'Select size...',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const Required: Story = {
  args: {
    options,
    label: 'Size',
    isRequired: true,
    placeholder: 'Select size...',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  args: {
    options,
    label: 'Size',
    error: 'Please select a size',
    placeholder: 'Select size...',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    options,
    label: 'Size',
    isDisabled: true,
    placeholder: 'Select size...',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium', disabled: true },
      { value: 'large', label: 'Large' },
    ],
    label: 'Size',
    placeholder: 'Select size...',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

