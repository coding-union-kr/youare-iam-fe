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
    const { code } = error.response.data as ErrorResponse;

    // code : AU001 : 토큰 삭제->  로그인 페이지로 이동
    if (code === 'AU001') {
      removeAccessToken();
      window.location.href = '/login';
      return Promise.reject(error.response.data as ErrorResponse);
    }

    // code : AU002 - 액세스 토큰 재발급 api -> 토큰 다시 저장, 헤더에 토큰 설정 -> 요청 재시도
    if (code === 'AU002') {
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

    if (errorResponse.code === 'AU003') {
      // 로그아웃 처리 후 로그인 페이지로 이동
      // removeAccessToken();
      // window.location.href = '/';
      console.log(errorResponse);
      try {
        const res = await refreshInstance.delete('/api/v1/members/auth/logout');

        if (res.status === 205) {
          // removeAccessToken();
          console.log('로그아웃 성공');
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorResponse = axiosError.response?.data as ErrorResponse;
        console.log(errorResponse);
      }

      return;
    }

    console.log('error');
  }
}
