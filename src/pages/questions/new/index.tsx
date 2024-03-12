import type { NextPageWithLayout } from '@/types/page';
import SubpageLayout from '@/components/layout/SubpageLayout';
import useInput, { Validator } from '@/hooks/common/useInput';
import Form from '@/components/ui/Form';

export const validateQuestion: Validator = (answer: string) => {
  if (!answer.trim()) {
    return '질문을 입력해주세요';
  } else if (answer.length > 200) {
    return '커스텀 질문은 최대 200자까지 입력 가능합니다';
  }

  return '';
};

const Page: NextPageWithLayout = () => {
  const [question, onChange, error] = useInput('', validateQuestion);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!!error) {
      return;
    }

    //todo: api 연결
    console.log(question);
  };

  return (
    <section className="flex flex-col justify-center h-full">
      <div className="w-[90%] mx-auto mb-8 text-sm">
        <p className="text-base text-accent">질문 예시 :</p>
        <p>우리 00일에 뭐할까?</p>
        <p>같이 제주도여행 갔을 때 가장 좋았던 장소는 어디였어?</p>
      </div>
      <Form
        inputValue={question}
        onChange={onChange}
        errorMessage={error}
        handleSubmit={handleSubmit}
        textAreaSize="min-h-[12rem]"
        label="등록하기"
        formSize="h-[50%]"
      />
    </section>
  );
};

Page.getLayout = function getLayout(page) {
  return <SubpageLayout title="질문 등록하기">{page}</SubpageLayout>;
};

export default Page;
