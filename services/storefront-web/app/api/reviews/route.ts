import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';

interface ReviewsData {
  reviews: Array<{
    id: string;
    rating: number;
    title?: string;
    content?: string;
    [key: string]: unknown;
  }>;
  total: number;
  page: number;
  totalPages: number;
}

interface ReviewData {
  id: string;
  rating: number;
  [key: string]: unknown;
}

export async function GET(request: NextRequest) {
  return withTelemetry('api.reviews.list', async (span) => {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const sort = searchParams.get('sort') || 'newest';

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    span.setAttribute('reviews.productId', productId);

    try {
      const response = await apiClient.get<ReviewsData>(
        `/products/${productId}/reviews?page=${page}&limit=${limit}&sort=${sort}`
      );

      return NextResponse.json(response.data);
    } catch (error: any) {
      span.recordException(error);
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }
  });
}

export async function POST(request: NextRequest) {
  return withTelemetry('api.reviews.create', async (span) => {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token')?.value;
    const body = await request.json();

    if (!authToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    span.setAttribute('reviews.productId', body.productId);
    span.setAttribute('reviews.rating', body.rating);

    try {
      const response = await apiClient.post<ReviewData>(
        `/products/${body.productId}/reviews`,
        {
          rating: body.rating,
          title: body.title,
          content: body.content,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      return NextResponse.json(response.data, { status: 201 });
    } catch (error: any) {
      span.recordException(error);

      if (error.response?.status === 400) {
        return NextResponse.json(
          { error: error.response.data.message || 'Invalid review data' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to create review' },
        { status: 500 }
      );
    }
  });
}

