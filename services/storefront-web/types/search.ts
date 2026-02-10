import type { Product } from './product';

export interface SearchFilter {
  id: string;
  name: string;
  options: SearchFilterOption[];
}

export interface SearchFilterOption {
  value: string;
  label: string;
  count: number;
}

export interface SearchResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: SearchFilter[];
  query: string;
}

export interface SearchSuggestion {
  text: string;
  type: 'query' | 'product' | 'category';
  productId?: string;
  image?: string;
  price?: number;
}

export interface SearchSuggestionsResponse {
  suggestions: string[];
  products: {
    id: string;
    name: string;
    image?: string;
    price: number;
  }[];
}

