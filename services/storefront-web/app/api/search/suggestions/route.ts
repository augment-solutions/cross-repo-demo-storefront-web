import { NextRequest, NextResponse } from 'next/server';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';

interface SuggestionsData {
  suggestions: string[];
  products: Array<{
    id: string;
    name: string;
    [key: string]: unknown;
  }>;
}

export async function GET(request: NextRequest) {
  return withTelemetry('api.search.suggestions', async (span) => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    span.setAttribute('search.query', query);

    if (query.length < 2) {
      return NextResponse.json({ suggestions: [], products: [] });
    }

    try {
      const response = await apiClient.get<SuggestionsData>(
        `/search/suggestions?q=${encodeURIComponent(query)}`
      );

      return NextResponse.json(response.data);
    } catch (error: any) {
      span.recordException(error);
      return NextResponse.json(
        { suggestions: [], products: [] },
        { status: 200 }
      );
    }
  });
}

