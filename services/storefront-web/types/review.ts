export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  helpfulCount: number;
  isVerifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  items: Review[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface CreateReviewData {
  rating: number;
  title: string;
  content: string;
  images?: string[];
}

