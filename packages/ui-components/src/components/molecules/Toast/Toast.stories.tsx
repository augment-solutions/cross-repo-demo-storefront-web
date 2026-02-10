import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose, ToastAction } from './Toast';
import { Button } from '../../atoms/Button';
import * as React from 'react';

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning', 'error'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ToastDemo = ({ variant = 'default' as const }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <ToastProvider swipeDirection="right">
      <Button onClick={() => setOpen(true)}>Show Toast</Button>
      <Toast variant={variant} open={open} onOpenChange={setOpen}>
        <div className="grid gap-1">
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>This is a toast notification.</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

export const Default: Story = {
  render: () => <ToastDemo variant="default" />,
};

export const Success: Story = {
  render: () => <ToastDemo variant="success" />,
};

export const Warning: Story = {
  render: () => <ToastDemo variant="warning" />,
};

export const Error: Story = {
  render: () => <ToastDemo variant="error" />,
};

const ToastWithAction = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <ToastProvider swipeDirection="right">
      <Button onClick={() => setOpen(true)}>Show Toast with Action</Button>
      <Toast open={open} onOpenChange={setOpen}>
        <div className="grid gap-1">
          <ToastTitle>Item added to cart</ToastTitle>
          <ToastDescription>1 item has been added to your cart.</ToastDescription>
        </div>
        <ToastAction altText="View cart">View Cart</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

export const WithAction: Story = {
  render: () => <ToastWithAction />,
};

