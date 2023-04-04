import type { Cart, User } from '@/types';
import { localApi } from '.';

export const getUser = async (id: number) => {
  const { data } = await localApi.get(`/users/${id}`);

  return data;
};

export const authUser = async (username: string, password: string) => {
  const { data } = await localApi.get(`/users?username=${username}&password=${password}`);

  return data;
};

export const createUser = async (body: Omit<User, 'id'>) => {
  const { data } = await localApi.post(`/users`, body);

  return data;
};

export const updateUser = async (id: number, body: Omit<User, 'id'>) => {
  const { data } = await localApi.put(`/users/${id}`, body);

  return data;
};
