import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';

interface OrderData {
  orderId: string;
  [key: string]: unknown;
}

interface CartData {
  items: Array<{
    id: string;
    price: number;
    quantity: number;
  }>;
  [key: string]: unknown;
}

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
}

export async function POST(request: NextRequest) {
  return withTelemetry('api.checkout.create', async (span) => {
    const cookieStore = cookies();
    const cartId = cookieStore.get('cart_id')?.value;
    const authToken = cookieStore.get('auth_token')?.value;
    const body = await request.json();

    if (!cartId) {
      return NextResponse.json(
        { error: 'No cart found' },
        { status: 400 }
      );
    }

    span.setAttribute('checkout.cartId', cartId);

    try {
      const orderData = {
        cartId,
        shippingAddress: body.shippingAddress,
        billingAddress: body.billingAddress || body.shippingAddress,
        shippingMethod: body.shippingMethod,
        paymentMethod: body.paymentMethod,
        paymentToken: body.paymentToken,
      };

      const headers: Record<string, string> = {};
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await apiClient.post<OrderData>('/orders', orderData, { headers });

      span.setAttribute('checkout.orderId', response.data.orderId);

      // Clear the cart cookie after successful order
      const nextResponse = NextResponse.json(response.data);
      nextResponse.cookies.delete('cart_id');

      return nextResponse;
    } catch (error: any) {
      span.recordException(error);
      span.setAttribute('error', true);

      const errorMessage = error.response?.data?.message || 'Checkout failed';
      return NextResponse.json(
        { error: errorMessage },
        { status: error.response?.status || 500 }
      );
    }
  });
}

export async function GET(request: NextRequest) {
  return withTelemetry('api.checkout.getSummary', async (span) => {
    const cookieStore = cookies();
    const cartId = cookieStore.get('cart_id')?.value;

    if (!cartId) {
      return NextResponse.json(
        { error: 'No cart found' },
        { status: 400 }
      );
    }

    span.setAttribute('checkout.cartId', cartId);

    try {
      const [cartResponse, shippingResponse] = await Promise.all([
        apiClient.get<CartData>(`/carts/${cartId}`),
        apiClient.get<ShippingMethod[]>('/shipping/methods'),
      ]);

      const cart = cartResponse.data;
      const shippingMethods = shippingResponse.data;

      // Calculate totals
      const subtotal = cart.items.reduce(
        (sum: number, item) => sum + item.price * item.quantity,
        0
      );
      const tax = subtotal * 0.08; // 8% tax rate
      const shipping = shippingMethods[0]?.price || 0;

      return NextResponse.json({
        cart,
        shippingMethods,
        summary: {
          subtotal,
          tax,
          shipping,
          total: subtotal + tax + shipping,
        },
      });
    } catch (error: any) {
      span.recordException(error);
      return NextResponse.json(
        { error: 'Failed to get checkout summary' },
        { status: 500 }
      );
    }
  });
}

