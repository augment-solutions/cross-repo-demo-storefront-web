import { NextRequest, NextResponse } from 'next/server';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';

interface LoginData {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export async function POST(request: NextRequest) {
  return withTelemetry('api.auth.login', async (span) => {
    const body = await request.json();

    try {
      const response = await apiClient.post<LoginData>('/auth/login', {
        email: body.email,
        password: body.password,
      });

      const { token, refreshToken, user } = response.data;

      span.setAttribute('auth.userId', user.id);

      const nextResponse = NextResponse.json({ user });

      // Set HTTP-only cookies for tokens
      nextResponse.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: body.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days or 1 day
        path: '/',
      });

      if (refreshToken) {
        nextResponse.cookies.set('refresh_token', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        });
      }

      return nextResponse;
    } catch (error: any) {
      span.recordException(error);
      span.setAttribute('error', true);

      if (error.response?.status === 401) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      );
    }
  });
}

