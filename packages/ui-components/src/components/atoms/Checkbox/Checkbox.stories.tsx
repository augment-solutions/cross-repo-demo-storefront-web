import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Remember me',
    checked: true,
  },
};

export const Required: Story = {
  args: {
    label: 'I agree to the terms',
    isRequired: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    isDisabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    isDisabled: true,
    checked: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const CheckboxList: Story = {
  render: () => (
    <div className="space-y-3">
      <Checkbox label="Option 1" />
      <Checkbox label="Option 2" checked />
      <Checkbox label="Option 3" />
      <Checkbox label="Option 4" isDisabled />
    </div>
  ),
};

