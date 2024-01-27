import { ACCESS_TOKEN } from '@/constants/auth';
import { ErrorResponse } from '@/types/api';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import { ERROR_CODES } from '@/constants/error';
import {
  getServersideAccessToken,
  removeServersideAccessToken,
  setAuthHeader,
  setServersideAccessToken,
} from './token';

//token,
export const createServerSideInstance = (
  context: GetServerSidePropsContext
) => {
  const cookies = parseCookies(context);
  const accessToken = cookies[ACCESS_TOKEN];

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 15000,
  });

  // header 설정
  setAuthHeader(instance, accessToken);

  const interceptorResponseFulfilled = (res: AxiosResponse) => {
    if (200 <= res.status && res.status < 300) {
      return res;
    }

    return Promise.reject(res);
  };

  const interceptorResponseRejected = async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest) {
      const errorResponse = error.response.data as ErrorResponse;

      // code : AU001 : 토큰 삭제->  로그인 페이지로 이동
      if (errorResponse.code === ERROR_CODES.INVALID_ACCESS_TOKEN) {
        removeServersideAccessToken(context);
        // window.location.href = '/';
        return Promise.reject(error.response.data as ErrorResponse);
      }

      // code : AU002 - 액세스 토큰 재발급 api -> 토큰 다시 저장, 헤더에 토큰 설정 -> 요청 재시도
      if (errorResponse.code === ERROR_CODES.EXPIRED_ACCESS_TOKEN) {
        return refreshTokenAndRetryRequest(instance, originalRequest, context);
      }

      return Promise.reject(error.response.data as ErrorResponse);
    }
    return Promise.reject(error.response?.data as ErrorResponse);
  };

  instance.interceptors.response.use(
    interceptorResponseFulfilled,
    interceptorResponseRejected
  );

  return instance;
};

async function refreshTokenAndRetryRequest(
  failedRequestInstance: AxiosInstance,
  failedRequestConfig: AxiosRequestConfig,
  context: GetServerSidePropsContext
) {
  const refreshInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 15000,
  });
  const existingAccessToken = getServersideAccessToken(context);

  if (!existingAccessToken) {
    removeServersideAccessToken(context);
    return;
  }
  setAuthHeader(refreshInstance, existingAccessToken);

  try {
    const res = await refreshInstance.post('/api/v1/members/auth/token');

    if (res.status === 201) {
      const accessToken = res.headers['authorization'].split(' ')[1];

      setServersideAccessToken(context, accessToken);
      setAuthHeader(failedRequestInstance, accessToken);

      // 기존 요청 재시도
      return failedRequestInstance(failedRequestConfig).then((res) => {
        return Promise.resolve(res);
      });
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorResponse = axiosError.response?.data as ErrorResponse;

    if (errorResponse.code === ERROR_CODES.EXPIRED_REFRESH_TOKEN) {
      try {
        const res = await refreshInstance.delete('/api/v1/members/auth/logout');
        if (res.status === 205) {
          removeServersideAccessToken(context);
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorResponse = axiosError.response?.data as ErrorResponse;
        if (errorResponse.code === ERROR_CODES.INVALID_ACCESS_TOKEN) {
          removeServersideAccessToken(context);
        }
      }
    }
  }
}

export const fetchData = async <T>(
  apiInstance: AxiosInstance,
  url: string,
  config?: InternalAxiosRequestConfig
) => {
  const { data } = await apiInstance.get<T>(url, config);
  return data;
};
