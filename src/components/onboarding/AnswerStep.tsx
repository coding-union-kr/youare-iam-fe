import { type ChangeEventHandler, useState } from 'react';
import {
  initialOnboardingState,
  onboardingState,
} from '@/store/onboardingState';
import type { OnboardingStepProps } from './Intro';

import AnswerForm from '@/components/answer/AnswerForm';
import QuestionTitle from '@/components/answer/QuestionTitle';
import { useRecoilStateSSR } from '@/hooks/common/useRecoilStateSSR';
import { validateAnswer } from '@/hooks/common/useInput';

export default function AnswerStep({ onNext }: OnboardingStepProps) {
  const [onboardingData, setOnboardingData] = useRecoilStateSSR(
    onboardingState,
    initialOnboardingState
  );
  const [errorMessage, setErrorErrorMessage] = useState('');

  const onChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { value } = target;

    setOnboardingData((prevState) => ({
      ...prevState,
      answer: value,
    }));

    const errorMessage = validateAnswer(value);

    setErrorErrorMessage(errorMessage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!!errorMessage) {
      return;
    }

    onNext();
  };

  return (
    <>
      <QuestionTitle question={onboardingData.selectedQuestion.question} />
      <p className="text-lg font-semibold">내가 먼저 답변을 작성해볼까요?</p>
      <AnswerForm
        answer={onboardingData.answer}
        onChange={onChange}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

// 답변 유효성 추가하기 - 글자 수 제한

//초대링크 생성,초대수락, 답변등록, 답변 수정
