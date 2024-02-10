import { queryKeys } from '@/constants/queryKeys';
import { get } from '@/libs/clientSideApi';
import { Question } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

export const getQuestionList = async () => {
  const res = await get<Question[]>('/api/v1/questions');
  return res.data;
};

export default function useQuestionList() {
  const fallbackQuestionList: Question[] = [];

  const {
    data: questionList = fallbackQuestionList,
    error,
    isLoading,
    isError,
  } = useQuery<Question[]>({
    queryKey: queryKeys.questions,
    queryFn: getQuestionList,
  });

  return { questionList, error, isLoading, isError };
}
