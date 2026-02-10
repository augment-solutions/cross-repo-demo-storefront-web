import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'email',
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const Required: Story = {
  args: {
    name: 'fullName',
    label: 'Full Name',
    placeholder: 'John Doe',
    isRequired: true,
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const WithError: Story = {
  args: {
    name: 'email',
    label: 'Email Address',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const WithHint: Story = {
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
    hint: 'Must be at least 8 characters',
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const FormExample: Story = {
  render: () => (
    <form className="w-80 space-y-4">
      <FormField
        name="firstName"
        label="First Name"
        placeholder="John"
        isRequired
      />
      <FormField
        name="lastName"
        label="Last Name"
        placeholder="Doe"
        isRequired
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="john@example.com"
        isRequired
      />
      <FormField
        name="phone"
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
        hint="Optional"
      />
    </form>
  ),
};

