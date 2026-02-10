import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'outlined', 'elevated'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">This is the card content area where you can place any content.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-80">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>With shadow effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Elevated cards have a shadow for depth.</p>
      </CardContent>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card padding="none" className="w-64 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
        alt="Product"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <CardTitle>Minimalist Watch</CardTitle>
        <p className="text-lg font-bold text-primary-600 mt-2">$129.00</p>
        <Button className="w-full mt-4">Add to Cart</Button>
      </div>
    </Card>
  ),
};

