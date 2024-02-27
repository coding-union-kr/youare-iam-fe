import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { queryKeys } from '@/constants/queryKeys';
import { get } from '@/libs/clientSideApi';
import { fetchData } from '@/libs/serversideApi';

type Question = {
  question: string;
};

export const getQuestionClientSide = async (id: number) => {
  const res = await get<Question>(
    `/api/v1/answer/question?selected-question-id=${id}`
  );
  return res.data.question;
};

export const getQuestion = async (api: AxiosInstance, id: number) => {
  const data = await fetchData<Question>(
    api,
    `/api/v1/answer/question?selected-question-id=${id}`
  );
  return data.question;
};

export function useQuestion(id: number) {
  const fallbackQuestion = '';

  const {
    data: question = fallbackQuestion,
    error,
    isLoading,
    isError,
  } = useQuery<string>({
    queryKey: queryKeys.question(id),
    queryFn: () => getQuestionClientSide(id),
  });

  return { question, error, isLoading, isError };
}
