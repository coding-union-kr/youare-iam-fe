import type { NextPageWithLayout } from '@/types/page';

import PageLayoutWithTitle from '@/components/layout/PageLayoutWithTitle';
import ListItem from '@/components/ui/ListItem';
import AnswerForm from '@/components/answer/AnswerForm';
import useInput from '@/hooks/common/useInput';

const Page: NextPageWithLayout = () => {
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
    <div className="flex flex-col items-center justify-between h-full gap-5">
      <ListItem question={question} />
      <AnswerForm
        answer={answer}
        onChange={onChange}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

const question = '상대방의 사랑스러운 점을 한가지 말해 주세요.';

Page.getLayout = function getLayout(page) {
  return (
    <>
      <PageLayoutWithTitle title="답변 등록하기">{page}</PageLayoutWithTitle>
    </>
  );
};

export default Page;
