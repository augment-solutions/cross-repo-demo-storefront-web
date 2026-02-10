import { NextRequest, NextResponse } from 'next/server';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';

interface SearchData {
  items: Array<{
    id: string;
    [key: string]: unknown;
  }>;
  total: number;
  page: number;
  totalPages: number;
  facets?: Record<string, unknown>;
}

export async function GET(request: NextRequest) {
  return withTelemetry('api.search', async (span) => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '12';
    const sort = searchParams.get('sort') || 'relevance';
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const brand = searchParams.get('brand');

    span.setAttribute('search.query', query);
    span.setAttribute('search.page', page);

    if (!query) {
      return NextResponse.json({
        items: [],
        total: 0,
        page: 1,
        totalPages: 0,
        facets: {},
      });
    }

    try {
      const queryParams = new URLSearchParams({
        q: query,
        page,
        limit,
        sort,
        ...(category && { category }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        ...(brand && { brand }),
      });

      const response = await apiClient.get<SearchData>(`/search?${queryParams}`);

      span.setAttribute('search.resultCount', response.data.total || 0);

      return NextResponse.json(response.data);
    } catch (error: any) {
      span.recordException(error);
      span.setAttribute('error', true);

      return NextResponse.json(
        { error: 'Search failed' },
        { status: 500 }
      );
    }
  });
}

