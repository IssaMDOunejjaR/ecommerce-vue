export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
}

export interface Cart {
  productId: number;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  cart: Cart[];
}
