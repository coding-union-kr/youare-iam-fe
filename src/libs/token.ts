import type { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '@/constants/cookie';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

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

export const getServersideAccessToken = (
  context: GetServerSidePropsContext
) => {
  const cookies = parseCookies(context);
  const accessToken = cookies[ACCESS_TOKEN];
  return accessToken;
};

export const setServersideAccessToken = (
  context: GetServerSidePropsContext,
  token: string
) => {
  const expires = 14 * 24 * 60 * 60; // 2주

  context.res.setHeader(
    'Set-Cookie',
    `${ACCESS_TOKEN}=${token}; Path=/; Secure; Max-Age=${expires}`
  );
};

export const removeServersideAccessToken = (
  context: GetServerSidePropsContext
) => {
  context.res.setHeader('Set-Cookie', `${ACCESS_TOKEN}=; Path=/; Max-Age=0`);
};

export const setAuthHeader = (api: AxiosInstance, token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeAuthHeader = (api: AxiosInstance) => {
  delete api.defaults.headers.Authorization;
};
