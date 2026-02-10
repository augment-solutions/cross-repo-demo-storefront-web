import { apiClient } from './client';
import type { Product, ProductsResponse, ProductsQueryParams } from '@/types/product';

export const productsApi = {
  getProducts: async (params: ProductsQueryParams = {}): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>('/api/products', {
      params: {
        page: params.page,
        limit: params.limit,
        sort: params.sort,
        category: params.category,
        featured: params.featured,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        brand: params.brand,
        exclude: params.exclude,
      },
    });
    return response.data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/api/products/${id}`);
    return response.data;
  },

  getFeaturedProducts: async (limit: number = 4): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>('/api/products', {
      params: {
        featured: true,
        limit,
        sort: 'bestselling',
      },
    });
    return response.data;
  },

  getRelatedProducts: async (
    productId: string,
    categoryId: string,
    limit: number = 4
  ): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>('/api/products', {
      params: {
        category: categoryId,
        exclude: productId,
        limit,
      },
    });
    return response.data;
  },
};

// Standalone export for direct imports
export const getProduct = productsApi.getProduct;

