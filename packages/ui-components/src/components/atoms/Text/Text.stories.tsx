import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'select', options: ['p', 'span', 'div', 'label'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    weight: { control: 'select', options: ['normal', 'medium', 'semibold', 'bold'] },
    color: { control: 'select', options: ['default', 'muted', 'primary', 'success', 'warning', 'error'] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is default text',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="xs">Extra small text</Text>
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text</Text>
      <Text size="lg">Large text</Text>
      <Text size="xl">Extra large text</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="default">Default color</Text>
      <Text color="muted">Muted color</Text>
      <Text color="primary">Primary color</Text>
      <Text color="success">Success color</Text>
      <Text color="warning">Warning color</Text>
      <Text color="error">Error color</Text>
    </div>
  ),
};

export const Truncated: Story = {
  args: {
    children: 'This is a very long text that will be truncated when it overflows the container width',
    truncate: true,
  },
  decorators: [(Story) => <div className="w-48"><Story /></div>],
};

