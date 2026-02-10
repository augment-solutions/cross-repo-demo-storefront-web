import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';

interface WishlistData {
  items: Array<{
    id: string;
    productId: string;
    [key: string]: unknown;
  }>;
}

export async function GET(request: NextRequest) {
  return withTelemetry('api.wishlist.get', async (span) => {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token')?.value;

    if (!authToken) {
      // Return local wishlist for unauthenticated users
      return NextResponse.json({ items: [] });
    }

    try {
      const response = await apiClient.get<WishlistData>('/wishlist', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      span.setAttribute('wishlist.itemCount', response.data.items?.length || 0);

      return NextResponse.json(response.data);
    } catch (error: any) {
      span.recordException(error);
      return NextResponse.json(
        { error: 'Failed to fetch wishlist' },
        { status: 500 }
      );
    }
  });
}

export async function POST(request: NextRequest) {
  return withTelemetry('api.wishlist.add', async (span) => {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token')?.value;
    const body = await request.json();

    span.setAttribute('wishlist.productId', body.productId);

    if (!authToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      const response = await apiClient.post<WishlistData>(
        '/wishlist',
        { productId: body.productId },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      return NextResponse.json(response.data, { status: 201 });
    } catch (error: any) {
      span.recordException(error);
      return NextResponse.json(
        { error: 'Failed to add to wishlist' },
        { status: 500 }
      );
    }
  });
}

export async function DELETE(request: NextRequest) {
  return withTelemetry('api.wishlist.remove', async (span) => {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token')?.value;
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    span.setAttribute('wishlist.productId', productId || '');

    if (!authToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    try {
      await apiClient.delete<void>(`/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      return NextResponse.json({ success: true });
    } catch (error: any) {
      span.recordException(error);
      return NextResponse.json(
        { error: 'Failed to remove from wishlist' },
        { status: 500 }
      );
    }
  });
}

