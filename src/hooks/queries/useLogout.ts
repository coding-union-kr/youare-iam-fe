import { useMutation } from '@tanstack/react-query';
import { del } from '@/libs/clientSideApi';
import { showToastSuccessMessage } from '@/util/toast';
import { removeAccessToken } from '@/libs/token';

export const useLogout = () => {
  return useMutation<void, unknown, void>({
    mutationFn: () => del('/api/v1/members/auth/logout'),
    onSuccess: () => {
      showToastSuccessMessage('로그아웃 되었습니다.');
      removeAccessToken();
      window.location.href = '/';
    },
  });
};
