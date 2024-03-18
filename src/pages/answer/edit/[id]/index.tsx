import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useQueryClient, QueryClient, dehydrate } from '@tanstack/react-query';
import PageLayoutWithTitle from '@/components/layout/PageLayoutWithTitle';
import type { NextPageWithLayout } from '@/types/page';
import { disallowAccess } from '@/util/disallowAccess';
import { createServerSideInstance } from '@/libs/serversideApi';
import { queryKeys } from '@/constants/queryKeys';
import useInput from '@/hooks/common/useInput';
import QuestionTitle from '@/components/answer/QuestionTitle';
import Form from '@/components/ui/Form';
import SEO from '@/components/SEO/SEO';
import useEditAnswer from '@/hooks/queries/useEditAnswer';
import { getExistingAnswer } from '@/hooks/queries/useAnswer';
import { getQuestion } from '@/hooks/queries/useQuestion';

const Page: NextPageWithLayout<{
  id: string;
  question: string;
  existingAnswer: string;
}> = ({ id, question, existingAnswer }) => {
  const router = useRouter();
  const [answer, onChange, errorMessage] = useInput(existingAnswer);

  const { mutate: editAnswer, isPending } = useEditAnswer();
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!!errorMessage) {
      return;
    }

    editAnswer(
      { selectQuestionId: Number(id), answer },
      {
        onSuccess: () => {
          router.push({
            pathname: '/chatroom',
            hash: id,
          });
          queryClient.invalidateQueries({ queryKey: queryKeys.letters });
        },
      }
    );
  };

  return (
    <>
      <SEO title="답변 수정하기" />
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
      <PageLayoutWithTitle title="답변 수정하기">{page}</PageLayoutWithTitle>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const redirection = await disallowAccess(context);

  if (redirection) {
    return redirection;
  }

  const { id } = context.query;
  const queryClient = new QueryClient();
  const api = createServerSideInstance(context);

  const [question, answer] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: queryKeys.question(Number(id)),
      queryFn: () => getQuestion(api, Number(id)),
    }),
    queryClient.fetchQuery({
      queryKey: queryKeys.answer(Number(id)),
      queryFn: () => getExistingAnswer(api, Number(id)),
    }),
  ]);

  return {
    props: {
      id,
      question,
      existingAnswer: answer,
      initialState: dehydrate(queryClient),
    },
  };
}

export default Page;
