import { type ChangeEventHandler, useState } from 'react';
import {
  initialOnboardingState,
  onboardingState,
} from '@/store/onboardingState';
import type { OnboardingStepProps } from './Intro';

import Form from '@/components/ui/Form';
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
      <p className="text-lg font-bold">내가 먼저 답변을 작성해볼까요?</p>
      <QuestionTitle question={onboardingData.selectedQuestion.question} />
      <Form
        inputValue={onboardingData.answer}
        onChange={onChange}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
