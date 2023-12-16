import type { NextPageWithLayout } from '@/types/page';

import PageLayoutWithTitle from '@/components/layout/PageLayoutWithTitle';
import ListItem from '@/components/ui/ListItem';
import AnswerForm from '@/components/answer/AnswerForm';
import useInput from '@/hooks/common/useInput';
import { useRouter } from 'next/router';
import QuestionTitle from '@/components/answer/QuestionTitle';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const [answer, onChange, errorMessage] = useInput('', (value) =>
    value.trim() ? '' : '답변을 입력해주세요'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer) {
      return;
    }
  };

  return (
    <section className="flex flex-col justify-between h-full">
      <QuestionTitle question="당신이 좋아하는 계절은 언제인가요?" />
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

export default Page;
