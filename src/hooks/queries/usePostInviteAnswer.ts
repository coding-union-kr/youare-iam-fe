import { useMutation } from '@tanstack/react-query';
import { post } from '@/libs/clientSideApi';

type InviteAnswer = {
  linkKey: string;
  answer: string;
};

export const usePostAnswer = () => {
  return useMutation({
    mutationFn: (data: InviteAnswer) =>
      post('/api/v1/members/invite/accept', data),
  });
};

export default usePostAnswer;
