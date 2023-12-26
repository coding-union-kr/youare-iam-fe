import { useRecoilState } from 'recoil';
import { onboardingState } from '@/store/onboardingState';
import type { OnboardingStepProps } from './Intro';
import useInput from '@/hooks/common/useInput';
import AnswerForm from '@/components/answer/AnswerForm';
import QuestionTitle from '@/components/answer/QuestionTitle';

export default function AnswerStep({ onNext }: OnboardingStepProps) {
  const [onboardingData, setOnboardingData] = useRecoilState(onboardingState);

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

  return (
    <>
      <QuestionTitle question={onboardingData.selectedQuestion.question} />
      <p className="text-lg">내가 먼저 답변을 작성해볼까요?</p>
      <AnswerForm
        answer={answer}
        onChange={onChange}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
