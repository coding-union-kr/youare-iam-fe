import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { post } from '@/libs/api';

type Answer = {
  selectQuestionId: number;
  answer: string;
};

export const useAnswerPost = (
  options?: UseMutationOptions<void, unknown, Answer>
) => {
  return useMutation<void, unknown, Answer>({
    mutationFn: (data: Answer) => post('/api/v1/answer', data),
    ...options,
  });
};

export default useAnswerPost;
