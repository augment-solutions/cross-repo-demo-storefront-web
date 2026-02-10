import { apiClient } from './client';
import type { Category } from '@/types/category';
import type { ProductsResponse } from '@/types/product';

// Backend response types (same as in API route)
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

export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    // Check at runtime if running on server or client
    // This must be checked inside the function, not at module load time,
    // because Next.js standalone mode may evaluate module-level code at build time
    const isServer = typeof window === 'undefined';

    if (isServer) {
      // Server-side: call backend directly to avoid self-referencing
      const response = await apiClient.get<BackendCategoriesResponse>('/api/v1/categories');
      return (response.data.data || []).map(transformCategory);
    }
    // Client-side: call Next.js API route
    const response = await apiClient.get<Category[]>('/api/categories');
    return response.data;
  },

  getCategory: async (slug: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`/api/categories/${slug}`);
    return response.data;
  },

  getCategoryProducts: async (
    slug: string,
    params: { page?: number; sort?: string; limit?: number } = {}
  ): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>(`/api/categories/${slug}/products`, {
      params,
    });
    return response.data;
  },
};

// Standalone exports for direct imports
export const getCategories = categoriesApi.getCategories;
export const getCategoryBySlug = categoriesApi.getCategory;

