import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import * as React from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const PaginationDemo = ({ totalPages = 10, initialPage = 1 }) => {
  const [page, setPage] = React.useState(initialPage);
  return <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />;
};

export const Default: Story = {
  render: () => <PaginationDemo />,
};

export const FewPages: Story = {
  render: () => <PaginationDemo totalPages={5} />,
};

export const ManyPages: Story = {
  render: () => <PaginationDemo totalPages={50} initialPage={25} />,
};

export const FirstPage: Story = {
  render: () => <PaginationDemo totalPages={20} initialPage={1} />,
};

export const LastPage: Story = {
  render: () => <PaginationDemo totalPages={20} initialPage={20} />,
};

