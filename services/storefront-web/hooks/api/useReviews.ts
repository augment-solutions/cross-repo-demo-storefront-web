import useSWR from 'swr';
import { reviewsApi } from '@/services/api/reviews';
import type { ReviewsResponse, CreateReviewData } from '@/types/review';

export function useReviews(productId: string, params: { page?: number; limit?: number } = {}) {
  const queryString = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  return useSWR<ReviewsResponse>(
    `/api/products/${productId}/reviews?${queryString}`,
    () => reviewsApi.getProductReviews(productId, params),
    {
      revalidateOnFocus: false,
    }
  );
}

export function useUserReviews() {
  return useSWR(
    '/api/user/reviews',
    reviewsApi.getUserReviews,
    {
      revalidateOnFocus: false,
    }
  );
}

export function useCreateReview(productId: string) {
  const { mutate } = useSWR(`/api/products/${productId}/reviews`);

  const createReview = async (data: CreateReviewData) => {
    const result = await reviewsApi.createReview(productId, data);
    mutate();
    return result;
  };

  return { createReview };
}

