export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'material' | 'option';
  colorCode?: string;
  price?: number;
  stock: number;
  sku?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  category: ProductCategory;
  brand?: string;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  variants?: ProductVariant[];
  tags?: string[];
  attributes?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'bestselling' | 'rating';
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  exclude?: string;
  search?: string;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

