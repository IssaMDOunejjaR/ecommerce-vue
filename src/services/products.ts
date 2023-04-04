import type { Category, Product } from '@/types';
import { api } from './index';

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products');

  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);

  return data;
};

export const getAllCategories = async (): Promise<Category[]> => {
  const { data } = await api.get(`/categories`);

  return data;
};

export const getProductsByCategory = async (category: number): Promise<Product[]> => {
  const { data } = await api.get(`/categories/${category}/products`);

  return data;
};
