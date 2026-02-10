import { NextRequest, NextResponse } from 'next/server';
import { withTelemetry } from '@/lib/telemetry/server';
import { apiClient } from '@/services/api/client';
import type { Product, ProductImage, ProductCategory } from '@/types/product';

interface RouteParams {
  params: { id: string };
}

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

// Transform backend product to frontend format
function transformProduct(backendProduct: BackendProduct): Product {
  const defaultVariant = backendProduct.variants?.find(v => v.is_default) || backendProduct.variants?.[0];
  const price = defaultVariant?.price || 0;
  const compareAtPrice = defaultVariant?.compare_at_price;

  const images: ProductImage[] = (backendProduct.media || []).map(m => ({
    id: m.id,
    url: m.url,
    alt: m.alt_text,
    width: m.width,
    height: m.height,
  }));

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
    stock: 100,
    rating: 4.5,
    reviewCount: 0,
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

export async function GET(request: NextRequest, { params }: RouteParams) {
  return withTelemetry('api.products.get', async (span) => {
    const { id } = params;
    span.setAttribute('product.id', id);

    try {
      const response = await apiClient.get<BackendProduct>(`/api/v1/products/${id}`);
      const transformedProduct = transformProduct(response.data);
      return NextResponse.json(transformedProduct);
    } catch (error: any) {
      span.recordException(error);
      span.setAttribute('error', true);

      if (error.response?.status === 404) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to fetch product' },
        { status: error.response?.status || 500 }
      );
    }
  });
}

