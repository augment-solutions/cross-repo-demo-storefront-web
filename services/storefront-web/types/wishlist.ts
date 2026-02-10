export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image?: string;
  stock: number;
  addedAt: string;
}

export interface Wishlist {
  id: string;
  items: WishlistItem[];
  createdAt: string;
  updatedAt: string;
}

