import type { Meta, StoryObj } from '@storybook/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from './Dropdown';
import { Button } from '../../atoms/Button';
import * as React from 'react';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Molecules/Dropdown',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Orders</DropdownMenuItem>
        <DropdownMenuItem>Wishlist</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Support</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Help Center</DropdownMenuItem>
        <DropdownMenuItem>Contact Us</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

const CheckboxDropdown = () => {
  const [showPrices, setShowPrices] = React.useState(true);
  const [showStock, setShowStock] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Display</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showPrices} onCheckedChange={setShowPrices}>
          Show Prices
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showStock} onCheckedChange={setShowStock}>
          Show Stock Status
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const WithCheckboxes: Story = {
  render: () => <CheckboxDropdown />,
};

