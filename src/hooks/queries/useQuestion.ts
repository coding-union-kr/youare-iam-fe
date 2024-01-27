import { get } from '@/libs/clientSideApi';
import { useQuery } from '@tanstack/react-query';

type Question = {
  question: string;
};

export const getQuestion = async (id: number) => {
  const res = await get<Question>(`/api/v1/answer?selected-question-id=${id}`);
  return res.data.question;
};

export default function useQuestion(id: number) {
  const fallbackQuestion = '';

  const {
    data: question = fallbackQuestion,
    error,
    isLoading,
    isError,
  } = useQuery<string>({
    queryKey: ['question', id],
    queryFn: () => getQuestion(id),
  });

  return { question, error, isLoading, isError };
}
