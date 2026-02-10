import { apiClient } from './client';
import type { Review, ReviewsResponse, CreateReviewData } from '@/types/review';

export const reviewsApi = {
  getProductReviews: async (
    productId: string,
    params: { page?: number; limit?: number; sort?: string } = {}
  ): Promise<ReviewsResponse> => {
    const response = await apiClient.get<ReviewsResponse>(`/api/products/${productId}/reviews`, { params });
    return response.data;
  },

  getUserReviews: async (): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>('/api/user/reviews');
    return response.data;
  },

  createReview: async (productId: string, data: CreateReviewData): Promise<Review> => {
    const response = await apiClient.post<Review>(`/api/products/${productId}/reviews`, data);
    return response.data;
  },

  updateReview: async (reviewId: string, data: Partial<CreateReviewData>): Promise<Review> => {
    const response = await apiClient.patch<Review>(`/api/reviews/${reviewId}`, data);
    return response.data;
  },

  deleteReview: async (reviewId: string): Promise<void> => {
    await apiClient.delete(`/api/reviews/${reviewId}`);
  },

  markHelpful: async (reviewId: string): Promise<void> => {
    await apiClient.post(`/api/reviews/${reviewId}/helpful`);
  },
};

