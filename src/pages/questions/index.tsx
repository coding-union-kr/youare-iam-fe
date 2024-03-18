import { GetServerSidePropsContext } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { NextPageWithLayout } from '@/types/page';
import type { Question } from '@/types/api';
import MainLayout from '@/components/layout/MainLayout';
import useQuestionList from '@/hooks/queries/useQuestionList';
import { createServerSideInstance, fetchData } from '@/libs/serversideApi';
import { disallowAccess } from '@/util/disallowAccess';
import { queryKeys } from '@/constants/queryKeys';
import SEO from '@/components/SEO/SEO';
import CreateQuestionButton from '@/components/questions/CreateQuestionButton';
import QuestionItem from '@/components/questions/QuestionItem';

type Questions = {
  questions: Question[];
};

const Page: NextPageWithLayout<Questions> = () => {
  const { questionList } = useQuestionList();

  return (
    <>
      <SEO
        title="질문 선택"
        description="서로에 대해 더 알아가고 싶은 질문들을 탐색하세요. 질문을 통해 깊은 대화를 시작해 보세요."
      />
      <div className="pt-3">
        <CreateQuestionButton />
        {questionList.map((question) => (
          <QuestionItem key={question.questionId} question={question} />
        ))}
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const api = createServerSideInstance(context);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.questions,
    queryFn: () => fetchData<Question[]>(api, '/api/v1/questions'),
  });

  const redirection = await disallowAccess(context);

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
