import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="description" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <p className="text-gray-600 p-4">
          This is the product description content. It contains detailed information about the product.
        </p>
      </TabsContent>
      <TabsContent value="specifications">
        <div className="p-4 space-y-2">
          <p className="text-gray-600">Weight: 2.5 kg</p>
          <p className="text-gray-600">Dimensions: 30 x 20 x 15 cm</p>
          <p className="text-gray-600">Material: Premium Cotton</p>
        </div>
      </TabsContent>
      <TabsContent value="reviews">
        <p className="text-gray-600 p-4">
          Customer reviews will be displayed here.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const AccountSettings: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-[500px]">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="p-4">
        <h3 className="font-medium mb-2">Profile Settings</h3>
        <p className="text-gray-600">Manage your profile information here.</p>
      </TabsContent>
      <TabsContent value="password" className="p-4">
        <h3 className="font-medium mb-2">Change Password</h3>
        <p className="text-gray-600">Update your password here.</p>
      </TabsContent>
      <TabsContent value="notifications" className="p-4">
        <h3 className="font-medium mb-2">Notification Preferences</h3>
        <p className="text-gray-600">Manage your notification settings.</p>
      </TabsContent>
      <TabsContent value="billing" className="p-4">
        <h3 className="font-medium mb-2">Billing Information</h3>
        <p className="text-gray-600">Manage your billing details.</p>
      </TabsContent>
    </Tabs>
  ),
};

