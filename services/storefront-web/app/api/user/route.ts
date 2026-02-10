import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';

interface UserData {
  id: string;
  email: string;
  name?: string;
  [key: string]: unknown;
}

export async function GET(request: NextRequest) {
  return withTelemetry('api.user.get', async (span) => {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token')?.value;

    if (!authToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    try {
      const response = await apiClient.get<UserData>('/users/me', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      span.setAttribute('user.id', response.data.id);

      return NextResponse.json(response.data);
    } catch (error: any) {
      span.recordException(error);

      if (error.response?.status === 401) {
        const nextResponse = NextResponse.json(
          { error: 'Session expired' },
          { status: 401 }
        );
        nextResponse.cookies.delete('auth_token');
        return nextResponse;
      }

      return NextResponse.json(
        { error: 'Failed to fetch user' },
        { status: 500 }
      );
    }
  });
}

export async function PUT(request: NextRequest) {
  return withTelemetry('api.user.update', async (span) => {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token')?.value;
    const body = await request.json();

    if (!authToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    try {
      const response = await apiClient.put<UserData>('/users/me', body, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      span.setAttribute('user.id', response.data.id);

      return NextResponse.json(response.data);
    } catch (error: any) {
      span.recordException(error);
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      );
    }
  });
}

