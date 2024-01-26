import { useMutation } from '@tanstack/react-query';
import { post } from '@/libs/clientSideApi';

type Question = {
  questionId: number;
};

export const usePostQuestion = () => {
  return useMutation({
    mutationFn: (data: Question) => post('/api/v1/questions', data),
  });
};

export default usePostQuestion;
