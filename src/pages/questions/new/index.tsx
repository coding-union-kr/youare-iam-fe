import type { NextPageWithLayout } from '@/types/page';
import SubpageLayout from '@/components/layout/SubpageLayout';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import useInput from '@/hooks/common/useInput';

const Page: NextPageWithLayout = () => {
  const [question, onChange, error] = useInput('', (value) =>
    value.trim() ? '' : '질문을 입력해주세요'
  );
  return (
    <section>
      <TextArea
        value={question}
        onChange={onChange}
        className="min-h-[15rem]"
      />
    </section>
  );
};

Page.getLayout = function getLayout(page) {
  return <SubpageLayout title="질문 등록하기">{page}</SubpageLayout>;
};

export default Page;

// 질문 예시, form, button , 등록 훅(201응답 -> /chatroom)
