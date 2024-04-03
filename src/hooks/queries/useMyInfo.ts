import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { get } from '@/libs/clientSideApi';
import type { MyInfo } from '@/types/api';
import type { AxiosInstance } from 'axios';
import { fetchData } from '@/libs/serversideApi';

const getMyInfoClientSide = async () => {
  const res = await get<MyInfo>('/api/v1/members/current-situation');
  return res.data;
};

export const getMyInfo = async (api: AxiosInstance) => {
  const data = await fetchData<MyInfo>(
    api,
    '/api/v1/members/current-situation'
  );
  return data;
};

export default function useMyInfo() {
  const {
    data: myInfo,
    error,
    isLoading,
    isError,
  } = useQuery<MyInfo>({
    queryKey: queryKeys.myInfo,
    queryFn: getMyInfoClientSide,
  });

  return { myInfo, error, isLoading, isError };
}
