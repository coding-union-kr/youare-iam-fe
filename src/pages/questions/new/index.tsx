import type { NextPageWithLayout } from '@/types/page';
import SubpageLayout from '@/components/layout/SubpageLayout';
import useInput from '@/hooks/common/useInput';
import Form from '@/components/ui/Form';

const Page: NextPageWithLayout = () => {
  const [question, onChange, error] = useInput(
    '',
    // 질문 입력 유효성 검사 - 공백, 글자수 제한
    (value) => (value.trim() ? '' : '질문을 입력해주세요')
  );
  return (
    <section className="flex flex-col justify-between h-full">
      <h2 className="mb-4 text-lg font-bold  w-[90%] mx-auto">
        질문을 입력해주세요
      </h2>
      {/* 질문 예시  */}
      <Form
        inputValue={question}
        onChange={onChange}
        errorMessage={error}
        handleSubmit={(e) => {
          e.preventDefault();
          console.log('질문 등록하기');
        }}
        textAreaSize="min-h-[12rem]"
        label="등록하기"
      />
    </section>
  );
};

Page.getLayout = function getLayout(page) {
  return <SubpageLayout title="질문 등록하기">{page}</SubpageLayout>;
};

export default Page;

// 질문 예시, form, button , 등록 훅(201응답 -> /chatroom)
//answerform textarea 크기만 다름
