import axios, { type AxiosResponse } from 'axios';

const MOCK_API = 'https://cc7831bd-6881-44ff-9534-f344d05bc5ad.mock.pstmn.io';

const instance = axios.create({
  baseURL: MOCK_API,
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
