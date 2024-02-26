import { GetServerSidePropsContext } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import PageLayoutWithTitle from '@/components/layout/PageLayoutWithTitle';
import type { NextPageWithLayout } from '@/types/page';
import type { Question } from '@/types/api';
import { checkAuth } from '@/util/checkAuth';
import { disallowAccess } from '@/util/disallowAccess';
import { createServerSideInstance, fetchData } from '@/libs/serversideApi';
import { queryKeys } from '@/constants/queryKeys';
import useInput from '@/hooks/common/useInput';
import useQuestion from '@/hooks/queries/useQuestion';
import QuestionTitle from '@/components/answer/QuestionTitle';
import AnswerForm from '@/components/answer/AnswerForm';
import SEO from '@/components/SEO/SEO';

const Page: NextPageWithLayout<{ id: string }> = ({ id }) => {
  const [answer, onChange, errorMessage] = useInput('', (value) =>
    value.trim() ? '' : '답변을 입력해주세요'
  );
  const { question } = useQuestion(Number(id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer) {
      return;
    }

    //Todo: 답변 수정하기 api 연결
  };

  return (
    <>
      <SEO title="답변 수정하기" />
      <section className="flex flex-col justify-between h-full pt-3">
        <QuestionTitle question={question} />
        <AnswerForm
          answer={answer}
          onChange={onChange}
          errorMessage={errorMessage}
          handleSubmit={handleSubmit}
        />
      </section>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return (
    <>
      <PageLayoutWithTitle title="답변 수정하기">{page}</PageLayoutWithTitle>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const authCheck = await checkAuth(context);
  if (authCheck) {
    return authCheck;
  }

  const redirection = await disallowAccess(context);

  if (redirection) {
    return redirection;
  }

  const { id } = context.query;
  const queryClient = new QueryClient();
  const api = createServerSideInstance(context);

  const getQuestion = async (id: number) => {
    const data = await fetchData<Question>(
      api,
      `/api/v1/answer?selected-question-id=${id}`
    );
    return data.question;
  };

  await queryClient.prefetchQuery({
    queryKey: queryKeys.question(Number(id)),
    queryFn: () => getQuestion(Number(id)),
  });

  return {
    props: { id, initialState: dehydrate(queryClient) },
  };
}

export default Page;
