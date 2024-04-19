import { useQuery } from '@tanstack/react-query';
import type { UserData } from '@/types/api';
import { get } from '@/libs/clientSideApi';
import { queryKeys } from '@/constants/queryKeys';
import { fetchData } from '@/libs/serversideApi';
import { AxiosInstance } from 'axios';

const getUserStatusClientSide = async () => {
  const res = await get<UserData>('/api/v1/members/user-status');
  return res.data;
};

export const getUserStatus = async (api: AxiosInstance) => {
  const data = await fetchData<UserData>(api, `/api/v1/members/user-status`);
  return data;
};

export default function useUserStatus(isAuthenticated: boolean) {
  const {
    data: userData,
    error,
    isLoading,
    isError,
  } = useQuery<UserData>({
    queryKey: queryKeys.userStatus,
    queryFn: getUserStatusClientSide,
    enabled: isAuthenticated,
  });

  return { userData, error, isLoading, isError };
}
