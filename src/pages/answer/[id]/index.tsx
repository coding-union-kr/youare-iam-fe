import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import type { NextPageWithLayout } from '@/types/page';
import PageLayoutWithTitle from '@/components/layout/PageLayoutWithTitle';
import AnswerForm from '@/components/answer/AnswerForm';
import QuestionTitle from '@/components/answer/QuestionTitle';
import useInput from '@/hooks/common/useInput';
import usePostAnswer from '@/hooks/queries/usePostAnswer';
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import useQuestion from '@/hooks/queries/useQuestion';
import { checkAuth } from '@/util/checkAuth';
import { createServerSideInstance, fetchData } from '@/libs/serversideApi';
import { Question } from '@/types/api';
import { disallowAccess } from '@/util/disallowAccess';
import { queryKeys } from '@/constants/queryKeys';
import SEO from '@/components/SEO/SEO';

type Prop = {
  id: string;
  question: string;
};

const Page: NextPageWithLayout<Prop> = ({ id: selectQuestionId }) => {
  const router = useRouter();
  const { mutate: postAnswer, isPending } = usePostAnswer();

  const [answer, onChange, errorMessage] = useInput('', (value) =>
    value.trim() ? '' : '답변을 입력해주세요'
  );

  const { question } = useQuestion(Number(selectQuestionId));
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer) {
      return;
    }

    postAnswer(
      { selectQuestionId: Number(selectQuestionId), answer },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKeys.letters });
          router.push({
            pathname: '/chatroom',
            hash: selectQuestionId,
          });
        },
      }
    );
  };

  return (
    <>
      <SEO title="답변 등록하기" />
      <section className="flex flex-col justify-between h-full pt-10">
        <QuestionTitle question={question} />
        <AnswerForm
          answer={answer}
          onChange={onChange}
          errorMessage={errorMessage}
          handleSubmit={handleSubmit}
          isLoading={isPending}
        />
      </section>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return (
    <>
      <PageLayoutWithTitle title="답변 등록하기">{page}</PageLayoutWithTitle>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const authCheck = await checkAuth(context);
  if (authCheck) {
    return authCheck;
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

  // Todo: api 응답이 404일 경우에 notfound 페이지를 보여주도록 수정
  const isValidId = (id: any) => {
    return !isNaN(Number(id));
  };

  if (!isValidId(id)) {
    return {
      notFound: true,
    };
  }

  // const redirection = await disallowAccess(context);

  // if (redirection) {
  //   return redirection;
  // }

  return {
    props: { id, initialState: dehydrate(queryClient) },
  };
}

export default Page;
