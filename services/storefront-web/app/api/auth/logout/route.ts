import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { withTelemetry } from '@/lib/telemetry/server';

export async function POST(request: NextRequest) {
  return withTelemetry('api.auth.logout', async (span) => {
    const nextResponse = NextResponse.json({ success: true });

    // Clear authentication cookies
    nextResponse.cookies.delete('auth_token');
    nextResponse.cookies.delete('refresh_token');

    return nextResponse;
  });
}

