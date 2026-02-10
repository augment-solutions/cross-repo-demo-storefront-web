import { NextRequest, NextResponse } from 'next/server';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';
import type { Product, ProductImage, ProductCategory } from '@/types/product';

// Backend response types
interface BackendMedia {
  id: string;
  url: string;
  alt_text?: string;
  width?: number;
  height?: number;
}

interface BackendVariant {
  id: string;
  name: string;
  price: number;
  compare_at_price?: number;
  sku?: string;
  is_default?: boolean;
}

interface BackendCategory {
  id: string;
  name: string;
  slug: string;
}

interface BackendProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  sku: string;
  status: string;
  is_featured?: boolean;
  is_new?: boolean;
  category_id?: string;
  category?: BackendCategory;
  variants?: BackendVariant[];
  media?: BackendMedia[];
  tags?: string[];
  created_at: string;
  updated_at: string;
}

interface BackendProductsResponse {
  items: BackendProduct[];
  total: number;
  page: number;
  page_size: number;
  totalPages: number;
}

// Transform backend product to frontend format
function transformProduct(backendProduct: BackendProduct): Product {
  // Get price from default variant or first variant
  const defaultVariant = backendProduct.variants?.find(v => v.is_default) || backendProduct.variants?.[0];
  const price = defaultVariant?.price || 0;
  const compareAtPrice = defaultVariant?.compare_at_price;

  // Transform media to images
  const images: ProductImage[] = (backendProduct.media || []).map(m => ({
    id: m.id,
    url: m.url,
    alt: m.alt_text,
    width: m.width,
    height: m.height,
  }));

  // Default category if not provided
  const category: ProductCategory = backendProduct.category || {
    id: backendProduct.category_id || 'default',
    name: 'Gifts & Accessories',
    slug: 'gifts',
  };

  return {
    id: backendProduct.id,
    name: backendProduct.name,
    slug: backendProduct.slug,
    description: backendProduct.description || '',
    price,
    compareAtPrice,
    images,
    category,
    sku: backendProduct.sku,
    stock: 100, // Default stock value
    rating: 4.5, // Default rating
    reviewCount: 0, // Default review count
    isNew: backendProduct.is_new,
    isFeatured: backendProduct.is_featured,
    variants: backendProduct.variants?.map(v => ({
      id: v.id,
      name: v.name,
      type: 'option' as const,
      price: v.price,
      stock: 100,
      sku: v.sku,
    })),
    tags: backendProduct.tags,
    createdAt: backendProduct.created_at,
    updatedAt: backendProduct.updated_at,
  };
}

export async function GET(request: NextRequest) {
  return withTelemetry('api.products.list', async (span) => {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '12';
    const sort = searchParams.get('sort') || 'newest';
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const brand = searchParams.get('brand');
    const featured = searchParams.get('featured');

    span.setAttribute('products.page', page);
    span.setAttribute('products.limit', limit);
    span.setAttribute('products.sort', sort);

    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        sort,
        ...(category && { category }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        ...(brand && { brand }),
        ...(featured && { featured }),
      });

      const response = await apiClient.get<BackendProductsResponse>(`/api/v1/products?${queryParams}`);

      // Transform backend products to frontend format
      const transformedItems = (response.data.items || []).map(transformProduct);

      span.setAttribute('products.count', transformedItems.length);

      return NextResponse.json({
        items: transformedItems,
        total: response.data.total,
        page: response.data.page,
        limit: parseInt(limit),
        totalPages: response.data.totalPages,
      });
    } catch (error: any) {
      span.recordException(error);
      span.setAttribute('error', true);

      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: error.response?.status || 500 }
      );
    }
  });
}

