import type { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '@/constants/auth';

const ACCESS_TOKEN_EXPIRES = 1 / 48; // 백엔드 액세스 토큰의 만료시간 30분
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
