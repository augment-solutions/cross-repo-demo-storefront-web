export const APP_NAME = 'StoreFront';
export const APP_DESCRIPTION = 'Your one-stop shop for everything';

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 48;

export const CURRENCY = 'USD';
export const LOCALE = 'en-US';

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT: (id: string) => `/products/${id}`,
  CATEGORIES: '/categories',
  CATEGORY: (slug: string) => `/categories/${slug}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success',
  SEARCH: '/search',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ACCOUNT: '/account',
  PROFILE: '/account/profile',
  ORDERS: '/account/orders',
  ORDER: (id: string) => `/account/orders/${id}`,
  ADDRESSES: '/account/addresses',
  WISHLIST: '/account/wishlist',
  REVIEWS: '/account/reviews',
} as const;

export const API_ROUTES = {
  PRODUCTS: '/api/products',
  PRODUCT: (id: string) => `/api/products/${id}`,
  CATEGORIES: '/api/categories',
  CATEGORY: (slug: string) => `/api/categories/${slug}`,
  CART: '/api/cart',
  CHECKOUT: '/api/checkout',
  ORDERS: '/api/orders',
  ORDER: (id: string) => `/api/orders/${id}`,
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  USER: '/api/user',
  WISHLIST: '/api/wishlist',
  SEARCH: '/api/search',
} as const;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'bestselling', label: 'Best Selling' },
  { value: 'rating', label: 'Top Rated' },
] as const;

export const ORDER_STATUSES = {
  pending: { label: 'Pending', color: 'warning' },
  confirmed: { label: 'Confirmed', color: 'info' },
  processing: { label: 'Processing', color: 'info' },
  shipped: { label: 'Shipped', color: 'primary' },
  delivered: { label: 'Delivered', color: 'success' },
  cancelled: { label: 'Cancelled', color: 'error' },
  refunded: { label: 'Refunded', color: 'secondary' },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const Z_INDEX = {
  dropdown: 10,
  sticky: 20,
  modal: 30,
  popover: 40,
  toast: 50,
} as const;

