import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { put } from '@/libs/clientSideApi';
import { Answer } from '@/types/api';

export const useEditAnswer = (
  options?: UseMutationOptions<void, unknown, Answer>
) => {
  return useMutation<void, unknown, Answer>({
    mutationFn: (data: Answer) => put('/api/v1/answer', data),
    ...options,
  });
};

export default useEditAnswer;
