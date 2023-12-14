import { useState } from 'react';
import type { OnboardingStepPros } from './Intro';
import ListItem from '../ui/ListItem';
import TextArea from '../ui/TextArea';
import useInput from '@/hooks/common/useInput';
import Button from '../ui/Button';

export default function AnswerStep({ onNext }: OnboardingStepPros) {
  const [answer, onChange, errorMessage] = useInput('', (value) =>
    value.trim() ? '' : '답변을 입력해주세요'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer) {
      return;
    }

    //Todo: 답변 등록하기 기능 구현
    console.log(answer);

    onNext();
  };

  return (
    <>
      <ListItem question="선택된 질문" />
      <p>내가 먼저 답변을 작성해볼까요?</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between w-full h-[70%]"
      >
        <div className="relative">
          <TextArea value={answer} onChange={onChange} />
          {errorMessage && (
            <p className="absolute text-xs bottom-[-20px] right-10 text-accent">
              {errorMessage}
            </p>
          )}
        </div>
        <Button variant="primary" size="wide">
          답변 등록하기
        </Button>
      </form>
    </>
  );
}
