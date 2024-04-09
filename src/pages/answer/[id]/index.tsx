import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import type { NextPageWithLayout } from '@/types/page';
import PageLayoutWithTitle from '@/components/layout/PageLayoutWithTitle';
import Form from '@/components/ui/Form';
import QuestionTitle from '@/components/answer/QuestionTitle';
import useInput from '@/hooks/common/useInput';
import usePostAnswer from '@/hooks/queries/usePostAnswer';
import { getQuestion } from '@/hooks/queries/useQuestion';
import { checkAuth } from '@/util/checkAuth';
import { createServerSideInstance } from '@/libs/serversideApi';
import { disallowAccess } from '@/util/disallowAccess';
import { queryKeys } from '@/constants/queryKeys';
import SEO from '@/components/SEO/SEO';

type Prop = {
  id: string;
  question: string;
};

const Page: NextPageWithLayout<Prop> = ({ id: selectQuestionId, question }) => {
  const router = useRouter();
  const { mutate: postAnswer, isPending } = usePostAnswer();

  const [answer, onChange, errorMessage] = useInput('');

  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!!errorMessage) {
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
      <section className="flex flex-col justify-between h-full pt-3">
        <QuestionTitle question={question} />
        <Form
          inputValue={answer}
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

  const data = await queryClient.fetchQuery({
    queryKey: queryKeys.question(Number(id)),
    queryFn: () => getQuestion(api, Number(id)),
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

  const redirection = await disallowAccess(context);

  if (redirection) {
    return redirection;
  }

  return {
    props: { id, question: data, initialState: dehydrate(queryClient) },
  };
}

export default Page;
