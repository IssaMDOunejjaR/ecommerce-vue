import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1'
});

export const localApi = axios.create({
  baseURL: 'http://localhost:3000'
});
