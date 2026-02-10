export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  image?: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  promoCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  variantId?: string;
}

export interface UpdateCartItemPayload {
  quantity: number;
}

