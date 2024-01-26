import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import type { NextPageWithLayout } from '@/types/page';
import type { Question } from '@/types/api';
import MainLayout from '@/components/layout/MainLayout';
import ListItem from '@/components/ui/ListItem';
import useQuestionList from '@/hooks/queries/useQuestionList';
import { checkAuth } from '@/util/checkAuth';
import usePostQuestion from '@/hooks/queries/usePostQuestion';
import { createServerSideInstance, fetchData } from '@/libs/serversideApi';
import { userStatusRouting } from '@/util/userStatusRouting';

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

  const api = createServerSideInstance(context);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['question-list'],
    queryFn: () => fetchData<Question[]>(api, '/questions'),
  });

  const redirection = await userStatusRouting(context);

  if (redirection) {
    return redirection;
  }

  return {
    props: {
      initialState: dehydrate(queryClient),
    },
  };
}

export default Page;
