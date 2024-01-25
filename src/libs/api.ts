import axios, {
  InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
  AxiosInstance,
} from 'axios';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  setAuthHeader,
} from './token';
import { ErrorResponse } from '@/types/api';
import { showToastErrorMessage } from '@/util/showToastErrorMessage';
import toast from 'react-hot-toast';

const ERROR_CODES = {
  INVALID_ACCESS_TOKEN: 'AU001',
  EXPIRED_ACCESS_TOKEN: 'AU002',
  EXPIRED_REFRESH_TOKEN: 'AU003',
};

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

const interceptorResponseRejected = async (error: AxiosError) => {
  const originalRequest = error.config;
  if (error.response?.status === 401 && originalRequest) {
    const errorResponse = error.response.data as ErrorResponse;

    // code : AU001 : 토큰 삭제->  로그인 페이지로 이동
    if (errorResponse.code === ERROR_CODES.INVALID_ACCESS_TOKEN) {
      showToastErrorMessage(errorResponse);
      removeAccessToken();
      window.location.href = '/';
      return Promise.reject(error.response.data as ErrorResponse);
    }

    // code : AU002 - 액세스 토큰 재발급 api -> 토큰 다시 저장, 헤더에 토큰 설정 -> 요청 재시도
    if (errorResponse.code === ERROR_CODES.EXPIRED_ACCESS_TOKEN) {
      refreshTokenAndRetryRequest(instance, originalRequest);
    }

    return Promise.reject(error.response.data as ErrorResponse);
  }
  return Promise.reject(error.response?.data as ErrorResponse);
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

async function refreshTokenAndRetryRequest(
  failedRequestInstance: AxiosInstance,
  failedRequestConfig: AxiosRequestConfig
) {
  const refreshInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 15000,
  });
  const existingAccessToken = getAccessToken();

  if (!existingAccessToken) {
    removeAccessToken();
    window.location.href = '/';
    return;
  }
  setAuthHeader(refreshInstance, existingAccessToken);

  try {
    const res = await refreshInstance.post('/api/v1/members/auth/token');

    if (res.status === 201) {
      const accessToken = res.headers['authorization'].split(' ')[1];

      setAccessToken(accessToken);
      setAuthHeader(failedRequestInstance, accessToken);

      // 기존 요청 재시도
      return failedRequestInstance(failedRequestConfig);
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorResponse = axiosError.response?.data as ErrorResponse;

    if (errorResponse.code === ERROR_CODES.EXPIRED_REFRESH_TOKEN) {
      showToastErrorMessage(errorResponse);

      try {
        const res = await refreshInstance.delete('/api/v1/members/auth/logout');
        if (res.status === 205) {
          toast.success('로그아웃 되었습니다.');
          removeAccessToken();
          window.location.href = '/';
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorResponse = axiosError.response?.data as ErrorResponse;
        if (errorResponse.code === ERROR_CODES.INVALID_ACCESS_TOKEN) {
          showToastErrorMessage(errorResponse);
          removeAccessToken();
          window.location.href = '/';
        }
      }
    }
  }
}
