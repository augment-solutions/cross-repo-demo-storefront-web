import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';

interface CartData {
  id?: string;
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  itemCount: number;
}

export async function GET(request: NextRequest) {
  return withTelemetry('api.cart.get', async (span) => {
    const cookieStore = cookies();
    const cartId = cookieStore.get('cart_id')?.value;

    if (!cartId) {
      return NextResponse.json({ items: [], total: 0, itemCount: 0 });
    }

    span.setAttribute('cart.id', cartId);

    try {
      const response = await apiClient.get<CartData>(`/carts/${cartId}`);
      return NextResponse.json(response.data);
    } catch (error: any) {
      span.recordException(error);
      if (error.response?.status === 404) {
        return NextResponse.json({ items: [], total: 0, itemCount: 0 });
      }
      return NextResponse.json(
        { error: 'Failed to fetch cart' },
        { status: 500 }
      );
    }
  });
}

export async function POST(request: NextRequest) {
  return withTelemetry('api.cart.addItem', async (span) => {
    const cookieStore = cookies();
    let cartId = cookieStore.get('cart_id')?.value;
    const body = await request.json();

    span.setAttribute('cart.productId', body.productId);
    span.setAttribute('cart.quantity', body.quantity);

    try {
      // Create cart if it doesn't exist
      if (!cartId) {
        const createResponse = await apiClient.post<{ id: string }>('/carts');
        cartId = createResponse.data.id;

        const response = NextResponse.json({ success: true });
        response.cookies.set('cart_id', cartId!, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
      }

      span.setAttribute('cart.id', cartId!);

      const response = await apiClient.post<CartData>(`/carts/${cartId}/items`, {
        productId: body.productId,
        quantity: body.quantity,
        variantId: body.variantId,
      });

      const nextResponse = NextResponse.json(response.data);
      if (!cookieStore.get('cart_id')) {
        nextResponse.cookies.set('cart_id', cartId!, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30,
        });
      }

      return nextResponse;
    } catch (error: any) {
      span.recordException(error);
      return NextResponse.json(
        { error: 'Failed to add item to cart' },
        { status: 500 }
      );
    }
  });
}

export async function PUT(request: NextRequest) {
  return withTelemetry('api.cart.updateItem', async (span) => {
    const cookieStore = cookies();
    const cartId = cookieStore.get('cart_id')?.value;
    const body = await request.json();

    if (!cartId) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    span.setAttribute('cart.id', cartId);
    span.setAttribute('cart.itemId', body.itemId);

    try {
      const response = await apiClient.put<CartData>(
        `/carts/${cartId}/items/${body.itemId}`,
        { quantity: body.quantity }
      );
      return NextResponse.json(response.data);
    } catch (error: any) {
      span.recordException(error);
      return NextResponse.json(
        { error: 'Failed to update cart item' },
        { status: 500 }
      );
    }
  });
}

export async function DELETE(request: NextRequest) {
  return withTelemetry('api.cart.removeItem', async (span) => {
    const cookieStore = cookies();
    const cartId = cookieStore.get('cart_id')?.value;
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');

    if (!cartId) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    span.setAttribute('cart.id', cartId);
    span.setAttribute('cart.itemId', itemId || '');

    try {
      await apiClient.delete<void>(`/carts/${cartId}/items/${itemId}`);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      span.recordException(error);
      return NextResponse.json(
        { error: 'Failed to remove item from cart' },
        { status: 500 }
      );
    }
  });
}

