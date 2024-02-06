import { useRecoilState } from 'recoil';
import {
  initialOnboardingState,
  onboardingState,
} from '@/store/onboardingState';
import type { OnboardingStepProps } from './Intro';
import useInput from '@/hooks/common/useInput';
import AnswerForm from '@/components/answer/AnswerForm';
import QuestionTitle from '@/components/answer/QuestionTitle';
import { useSSR } from '@/hooks/common/useSSR';
import { useEffect } from 'react';

export default function AnswerStep({ onNext }: OnboardingStepProps) {
  const [onboardingData, setOnboardingData] = useSSR(
    onboardingState,
    initialOnboardingState
  );

  const onChangeCallback = (newAnswer: string) => {
    setOnboardingData((prevState) => ({
      ...prevState,
      answer: newAnswer,
    }));
  };

  const [answer, onChange, errorMessage] = useInput(
    onboardingData.answer,
    (value) => (value.trim() ? '' : '답변을 입력해주세요'),
    onChangeCallback
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer) {
      return;
    }

    onNext();
  };
  // console.log('recoil', onboardingData.answer);

  return (
    <>
      <QuestionTitle question={onboardingData.selectedQuestion.question} />
      <p className="text-lg font-semibold">내가 먼저 답변을 작성해볼까요?</p>
      <AnswerForm
        answer={answer}
        onChange={onChange}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
