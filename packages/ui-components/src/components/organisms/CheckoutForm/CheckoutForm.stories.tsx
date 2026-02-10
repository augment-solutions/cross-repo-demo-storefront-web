import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutForm } from './CheckoutForm';

const meta: Meta<typeof CheckoutForm> = {
  title: 'Organisms/CheckoutForm',
  component: CheckoutForm,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log('Form submitted:', data),
  },
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
};

export const WithInitialData: Story = {
  args: {
    initialData: {
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      phone: '555-123-4567',
    },
    onSubmit: (data) => console.log('Form submitted:', data),
  },
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
};

export const Loading: Story = {
  args: {
    onSubmit: (data) => console.log('Form submitted:', data),
    isLoading: true,
  },
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
};

