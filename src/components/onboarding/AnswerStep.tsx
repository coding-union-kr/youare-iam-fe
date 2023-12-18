import { useRecoilState } from 'recoil';
import type { OnboardingStepPros } from './Intro';
import useInput from '@/hooks/common/useInput';
import { onboardingState } from '@/store/onboardingState';
import AnswerForm from '../answer/AnswerForm';
import QuestionTitle from '../answer/QuestionTitle';

export default function AnswerStep({ onNext }: OnboardingStepPros) {
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
      {/* Todo: question 업데이트하기 */}
      <QuestionTitle question="당신이 좋아하는 계절은 언제인가요?" />
      <p>내가 먼저 답변을 작성해볼까요?</p>
      <AnswerForm
        answer={answer}
        onChange={onChange}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
