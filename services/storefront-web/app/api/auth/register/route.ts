import { NextRequest, NextResponse } from 'next/server';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';

interface RegisterData {
  user?: {
    id: string;
  };
}

export async function POST(request: NextRequest) {
  return withTelemetry('api.auth.register', async (span) => {
    const body = await request.json();

    try {
      const response = await apiClient.post<RegisterData>('/auth/register', {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
      });

      span.setAttribute('auth.userId', response.data.user?.id || '');

      return NextResponse.json({
        success: true,
        message: 'Registration successful',
      });
    } catch (error: any) {
      span.recordException(error);
      span.setAttribute('error', true);

      if (error.response?.status === 409) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }

      if (error.response?.status === 400) {
        return NextResponse.json(
          { error: error.response.data.message || 'Invalid registration data' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 500 }
      );
    }
  });
}

