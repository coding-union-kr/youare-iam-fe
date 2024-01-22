import type { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '@/constants/auth';

const ACCESS_TOKEN_EXPIRES = 14; // 2주 (리프레시 토큰 만료 기간)
const isProduction = process.env.NODE_ENV === 'production';

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN);
};

export const setAccessToken = (token: string) => {
  Cookies.set(ACCESS_TOKEN, token, {
    expires: ACCESS_TOKEN_EXPIRES,
    secure: isProduction,
  });
};

export const removeAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN);
};

export const setAuthHeader = (api: AxiosInstance, token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeAuthHeader = (api: AxiosInstance) => {
  delete api.defaults.headers.Authorization;
};
