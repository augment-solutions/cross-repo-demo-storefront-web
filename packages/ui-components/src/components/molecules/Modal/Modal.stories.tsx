import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from './Modal';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a modal description. It provides additional context.
          </ModalDescription>
        </ModalHeader>
        <p className="text-gray-600">
          This is the modal content. You can put any content here.
        </p>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const ConfirmDelete: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Delete Item</ModalTitle>
          <ModalDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const LargeModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open Large Modal</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Product Details</ModalTitle>
        </ModalHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            This is a larger modal for displaying more content like product details,
            forms, or any other complex information.
          </p>
          <p className="text-gray-600">
            You can scroll within the modal if content exceeds the viewport.
          </p>
        </div>
        <ModalFooter>
          <Button variant="outline">Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

