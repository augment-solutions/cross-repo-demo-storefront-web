import useSWR from 'swr';
import { productsApi } from '@/services/api/products';
import type { ProductsQueryParams, ProductsResponse, Product } from '@/types/product';

export function useProducts(params: ProductsQueryParams & { enabled?: boolean } = {}) {
  const { enabled = true, ...queryParams } = params;
  
  const queryString = new URLSearchParams(
    Object.entries(queryParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  return useSWR<ProductsResponse>(
    enabled ? `/api/products?${queryString}` : null,
    () => productsApi.getProducts(queryParams),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
}

export function useProduct(id: string | undefined) {
  return useSWR<Product>(
    id ? `/api/products/${id}` : null,
    () => productsApi.getProduct(id!),
    {
      revalidateOnFocus: false,
    }
  );
}

export function useFeaturedProducts(limit: number = 4) {
  return useProducts({
    featured: true,
    limit,
    sort: 'bestselling',
  });
}

export function useRelatedProducts(productId: string, categoryId?: string, limit: number = 4) {
  return useProducts({
    category: categoryId,
    exclude: productId,
    limit,
    enabled: !!categoryId,
  });
}

