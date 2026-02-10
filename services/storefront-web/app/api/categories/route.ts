import { NextRequest, NextResponse } from 'next/server';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';
import type { Category } from '@/types/category';

// Backend response types
interface BackendCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  icon_url?: string;
  parent_id?: string | null;
  level?: number;
  is_active?: boolean;
  is_featured?: boolean;
  product_count?: number;
  created_at?: string;
  updated_at?: string;
}

interface BackendCategoriesResponse {
  data: BackendCategory[];
  page: number;
  page_size: number;
  total: number;
}

// Transform backend category to frontend format
function transformCategory(backendCategory: BackendCategory): Category {
  return {
    id: backendCategory.id,
    name: backendCategory.name,
    slug: backendCategory.slug,
    description: backendCategory.description,
    image: backendCategory.image_url,
    parentId: backendCategory.parent_id || undefined,
    productCount: backendCategory.product_count || 0,
    createdAt: backendCategory.created_at || new Date().toISOString(),
    updatedAt: backendCategory.updated_at || new Date().toISOString(),
  };
}

export async function GET(request: NextRequest) {
  return withTelemetry('api.categories.list', async (span) => {
    try {
      const response = await apiClient.get<BackendCategoriesResponse>('/api/v1/categories');

      // Transform backend categories to frontend format
      const transformedCategories = (response.data.data || []).map(transformCategory);

      span.setAttribute('categories.count', transformedCategories.length);

      return NextResponse.json(transformedCategories);
    } catch (error: any) {
      span.recordException(error);
      span.setAttribute('error', true);

      console.error('Failed to fetch categories:', error.message);

      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: error.response?.status || 500 }
      );
    }
  });
}

