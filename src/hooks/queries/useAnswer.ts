import { queryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import type { Answer } from '@/types/api';
import { get } from '@/libs/clientSideApi';
import type { AxiosInstance } from 'axios';
import { fetchData } from '@/libs/serversideApi';

const getExistingAnswerClientSide = async (id: number) => {
  const res = await get<Answer>(`/api/v1/answer?selected-question-id=${id}`);
  return res.data.answer;
};

export const getExistingAnswer = async (api: AxiosInstance, id: number) => {
  const data = await fetchData<Answer>(
    api,
    `/api/v1/answer?selected-question-id=${id}`
  );
  return data.answer;
};

export default function useAnswer(id: number) {
  const fallbackAnswer = '';

  const {
    data: existingAnswer = fallbackAnswer,
    error,
    isLoading,
    isError,
  } = useQuery<string>({
    queryKey: queryKeys.answer(id),
    queryFn: () => getExistingAnswerClientSide(id),
  });

  return { existingAnswer, error, isLoading, isError };
}
