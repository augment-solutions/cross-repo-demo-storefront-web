import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational message.',
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Order Placed!',
    children: 'Your order has been successfully placed.',
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Low Stock',
    children: 'Only 2 items left in stock.',
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Payment Failed',
    children: 'Please check your payment details and try again.',
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    children: 'This alert can be dismissed.',
    onClose: () => alert('Alert closed'),
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Alert variant="info">Informational message</Alert>
      <Alert variant="success">Success message</Alert>
      <Alert variant="warning">Warning message</Alert>
      <Alert variant="error">Error message</Alert>
    </div>
  ),
};

