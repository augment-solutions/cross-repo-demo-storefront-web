import useSWR from 'swr';
import { categoriesApi } from '@/services/api/categories';
import type { Category } from '@/types/category';

export function useCategories() {
  return useSWR<Category[]>(
    '/api/categories',
    categoriesApi.getCategories,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );
}

export function useCategory(slug: string | undefined) {
  return useSWR<Category>(
    slug ? `/api/categories/${slug}` : null,
    () => categoriesApi.getCategory(slug!),
    {
      revalidateOnFocus: false,
    }
  );
}

export function useCategoryProducts(slug: string, params: { page?: number; sort?: string } = {}) {
  const queryString = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  return useSWR(
    slug ? `/api/categories/${slug}/products?${queryString}` : null,
    () => categoriesApi.getCategoryProducts(slug, params),
    {
      revalidateOnFocus: false,
    }
  );
}

