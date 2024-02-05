import { useQuery } from '@tanstack/react-query';
import type { UserData } from '@/types/api';
import { get } from '@/libs/clientSideApi';

export const getUserStatus = async () => {
  const res = await get<UserData>('/api/v1/members/user-status');
  return res.data;
};

export default function useUserStatus(isAuthenticated: boolean) {
  const {
    data: userData,
    error,
    isLoading,
    isError,
  } = useQuery<UserData>({
    queryKey: ['user-status'],
    queryFn: getUserStatus,
    enabled: isAuthenticated,
  });

  return { userData, error, isLoading, isError };
}
