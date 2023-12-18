import axios, { type AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 15000,
});

export const get = <T = any, R = AxiosResponse<T>>(url: string) => {
  return instance.get<T, R>(url);
};

export const post = <T = any, D = any, R = AxiosResponse<T>>(
  url: string,
  data?: D
) => {
  return instance.post<T, R>(url, data);
};

const mockAPIinstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOCK_SERVER_URL,
  timeout: 15000,
});

export const mockGet = <T = any, R = AxiosResponse<T>>(url: string) => {
  return mockAPIinstance.get<T, R>(url);
};

export const mockPost = <T = any, D = any, R = AxiosResponse<T>>(
  url: string,
  data?: D
) => {
  return mockAPIinstance.post<T, R>(url, data);
};
