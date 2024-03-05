import type { NextPageWithLayout } from '@/types/page';
import SubpageLayout from '@/components/layout/SubpageLayout';
import useInput from '@/hooks/common/useInput';
import Form from '@/components/ui/Form';

const Page: NextPageWithLayout = () => {
  const [question, onChange, error] = useInput(
    '',
    // todo: 질문 입력 유효성 검사 - 공백, 글자수 제한
    (value) => (value.trim() ? '' : '질문을 입력해주세요')
  );

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
      <h2 className="mb-4 text-lg font-bold  w-[90%] mx-auto">
        질문을 입력해주세요
      </h2>
      {/* 질문 예시  */}
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
