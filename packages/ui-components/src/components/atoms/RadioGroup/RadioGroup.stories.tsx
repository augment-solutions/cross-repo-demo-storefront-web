import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sizeOptions = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
];

export const Default: Story = {
  args: {
    options: sizeOptions,
    name: 'size',
  },
};

export const WithLabel: Story = {
  args: {
    options: sizeOptions,
    label: 'Select Size',
    name: 'size-label',
  },
};

export const Horizontal: Story = {
  args: {
    options: sizeOptions,
    label: 'Select Size',
    orientation: 'horizontal',
    name: 'size-horizontal',
  },
};

export const WithDescriptions: Story = {
  args: {
    options: [
      { value: 'starter', label: 'Starter', description: 'Best for personal projects' },
      { value: 'pro', label: 'Pro', description: 'Best for small teams' },
      { value: 'enterprise', label: 'Enterprise', description: 'Best for large organizations' },
    ],
    label: 'Select Plan',
    name: 'plan',
  },
};

export const WithError: Story = {
  args: {
    options: sizeOptions,
    label: 'Select Size',
    error: 'Please select a size',
    name: 'size-error',
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium', disabled: true },
      { value: 'lg', label: 'Large' },
    ],
    label: 'Select Size',
    name: 'size-disabled',
  },
};

export const Required: Story = {
  args: {
    options: sizeOptions,
    label: 'Select Size',
    isRequired: true,
    name: 'size-required',
  },
};

