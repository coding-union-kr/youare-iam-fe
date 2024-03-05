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
      <div className="w-[90%] mx-auto mb-8 text-sm">
        <p className="text-accent ">질문 예시 :</p>
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
