import type { Meta, StoryObj } from '@storybook/react';
import { ReviewList } from './ReviewList';

const meta: Meta<typeof ReviewList> = {
  title: 'Organisms/ReviewList',
  component: ReviewList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockReviews = [
  {
    id: '1',
    author: 'John Doe',
    rating: 5,
    title: 'Excellent product!',
    content: 'This is exactly what I was looking for. The quality is outstanding and it arrived quickly. Highly recommend!',
    date: 'Jan 15, 2024',
    verified: true,
    helpful: 12,
  },
  {
    id: '2',
    author: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 4,
    title: 'Great value',
    content: 'Good quality for the price. The sizing was a bit off but overall I am happy with my purchase.',
    date: 'Jan 10, 2024',
    verified: true,
    helpful: 5,
  },
  {
    id: '3',
    author: 'Mike Johnson',
    rating: 5,
    content: 'Perfect fit and great material. Will definitely buy again.',
    date: 'Jan 5, 2024',
    verified: false,
    helpful: 3,
  },
];

export const Default: Story = {
  args: {
    reviews: mockReviews,
    averageRating: 4.7,
    totalReviews: 128,
    onHelpful: (id) => console.log('Helpful:', id),
  },
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
};

export const WithLoadMore: Story = {
  args: {
    ...Default.args,
    hasMore: true,
    onLoadMore: () => console.log('Load more'),
  },
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
};

export const NoSummary: Story = {
  args: {
    reviews: mockReviews,
    showSummary: false,
  },
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
};

export const Empty: Story = {
  args: {
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
  },
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
};

