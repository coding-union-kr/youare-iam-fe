import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import ListItem from '@/components/ui/ListItem';
import { useRouter } from 'next/router';
import { post } from '@/libs/clientSideApi';
import useQuestionList, {
  getQuestionList,
} from '@/hooks/queries/useQuestionList';
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import { checkAuth } from '@/util/checkAuth';
import { GetServerSidePropsContext } from 'next';
import type { ErrorResponse } from '@/types/api';
import type { Question } from '@/types/api';
import usePostQuestion from '@/hooks/queries/usePostQuestion';

type Questions = {
  questions: Question[];
};

const Page: NextPageWithLayout<Questions> = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { questionList } = useQuestionList();
  const { mutate: postQuestion } = usePostQuestion();
  const handleItemClick = async (questionId: Question['questionId']) => {
    postQuestion(
      { questionId: questionId },
      {
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['question-list'] });
          queryClient.invalidateQueries({ queryKey: ['letters'] });
        },
        onSuccess: () => {
          router.push('/chatroom');
        },
      }
    );
  };

  return (
    <div className="py-20">
      {questionList.map((question) => (
        <div
          key={question.questionId}
          className="flex flex-col items-center justify-center"
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const authCheck = await checkAuth(context);
  if (authCheck) {
    return authCheck;
  }

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
}

export default Page;
