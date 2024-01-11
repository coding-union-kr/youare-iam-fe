import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import ListItem from '@/components/ui/ListItem';
import { useRouter } from 'next/router';
import { post } from '@/libs/api';
import useQuestionList, {
  getQuestionList,
} from '@/hooks/queries/useQuestionList';
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';

type Questions = {
  questions: Question[];
};

type Question = {
  questionId: number;
  question: string;
};

const Page: NextPageWithLayout<Questions> = ({ questions }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { questionList } = useQuestionList();

  const handleItemClick = async (questionId: Question['questionId']) => {
    try {
      await post('/api/v1/questions', {
        questionId: questionId,
      });
      queryClient.invalidateQueries({ queryKey: ['question-list'] });
      queryClient.invalidateQueries({ queryKey: ['letters'] });
      router.push('/chatroom');
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="py-20">
      {questionList.map((question) => (
        <div
          key={question.questionId}
          className="flex flex-col justify-center items-center"
        >
          <ListItem
            question={question.question}
            onClick={() => handleItemClick(question.questionId)}
          />
        </div>
      ))}
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['question-list'],
    queryFn: getQuestionList,
  });
  return {
    props: {
      initialState: dehydrate(queryClient),
    },
  };
};

export default Page;
