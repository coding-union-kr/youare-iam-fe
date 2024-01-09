import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';
import axios, { InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 15000,
});

const interceptorRequestFulfilled = (config: InternalAxiosRequestConfig) => {
  if (typeof window === 'undefined') return config;

  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  if (!config.headers) return config;
  if (!accessToken) return config;

  config.headers.Authorization = accessToken;

  return config;
};

instance.interceptors.request.use(interceptorRequestFulfilled);

export const get = <T = any, R = AxiosResponse<T>>(url: string) => {
  return instance.get<T, R>(url);
};

export const post = <T = any, D = any, R = AxiosResponse<T>>(
  url: string,
  data?: D
) => {
  return instance.post<T, R>(url, data);
};
