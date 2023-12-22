import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from '@/types/page';
import PageLayoutWithTitle from '@/components/layout/PageLayoutWithTitle';
import AnswerForm from '@/components/answer/AnswerForm';
import QuestionTitle from '@/components/answer/QuestionTitle';
import useInput from '@/hooks/common/useInput';
import usePostAnswer from '@/hooks/feature/usePostAnswer';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type Prop = {
  id: string;
  question: string;
};

const Page: NextPageWithLayout<Prop> = ({ id: selectQuestionId, question }) => {
  const router = useRouter();
  const { mutate: postAnswer } = usePostAnswer();

  const [answer, onChange, errorMessage] = useInput('', (value) =>
    value.trim() ? '' : '답변을 입력해주세요'
  );

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
          queryClient.invalidateQueries({ queryKey: ['projects'] });
          router.push({
            pathname: '/chatroom',
            hash: selectQuestionId,
          });
        },
        onError: (error) => {
          //Todo: 에러 처리
          console.log(error);
        },
      }
    );
  };
  return (
    <section className="flex flex-col justify-between h-full">
      <QuestionTitle question={question} />
      <AnswerForm
        answer={answer}
        onChange={onChange}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </section>
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
  const { id } = context.query;

  const baseURL = process.env.NEXT_PUBLIC_BACKEND_GAMTI_URL;
  const path = '/api/v1/answer';
  const apiEndpoint = `${baseURL}${path}?selected-question-id=${id}`;

  const res = await axios.get(apiEndpoint);
  const question = res.data.question;

  const isValidId = (id: any) => {
    return !isNaN(Number(id));
  };

  if (!isValidId(id)) {
    return {
      notFound: true,
    };
  }

  return {
    props: { id, question },
  };
}

export default Page;
