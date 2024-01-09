import axios, {
  InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';
import { getAccessToken, removeAccessToken } from './token';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 15000,
});

const interceptorRequestFulfilled = (config: InternalAxiosRequestConfig) => {
  if (typeof window === 'undefined') return config;

  const accessToken = getAccessToken();
  if (!config.headers) return config;
  if (!accessToken) return config;

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

instance.interceptors.request.use(interceptorRequestFulfilled);

const interceptorResponseFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) {
    return res;
  }

  return Promise.reject(res);
};

const interceptorResponseRejected = (error: AxiosError) => {
  if (error.response?.status === 401) {
    removeAccessToken();
    window.location.href = '/';
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.response?.data);
};

instance.interceptors.response.use(
  interceptorResponseFulfilled,
  interceptorResponseRejected
);

export const get = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
) => {
  return instance.get<T, R>(url, config);
};

export const post = <T = any, D = any, R = AxiosResponse<T>>(
  url: string,
  data?: D
) => {
  return instance.post<T, R>(url, data);
};
