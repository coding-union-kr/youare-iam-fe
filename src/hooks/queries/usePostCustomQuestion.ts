import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { post } from '@/libs/clientSideApi';

type Question = {
  question: string;
};

export const usePostCustomQuestion = (
  options?: UseMutationOptions<void, unknown, Question>
) => {
  return useMutation<void, unknown, Question>({
    mutationFn: (data: Question) => post('/api/v1/questions', data),
    ...options,
  });
};
