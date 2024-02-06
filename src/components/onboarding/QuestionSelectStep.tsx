import { useRecoilState } from 'recoil';
import type { OnboardingStepProps } from './Intro';
import {
  initialOnboardingState,
  onboardingState,
} from '@/store/onboardingState';
import { Question } from '@/types/api';
import Button from '@/components/ui/Button';
import { useRecoilStateSSR } from '@/hooks/common/useRecoilStateSSR';

type QuestionSelectStepProps = OnboardingStepProps & {
  questionList: Question[];
};

export default function QuestionSelectStep({
  onNext,
  questionList,
}: QuestionSelectStepProps) {
  const [onboardingData, setOnboardingData] = useRecoilStateSSR(
    onboardingState,
    initialOnboardingState
  );

  const handleSelectQuestion = (question: Question) => {
    setOnboardingData({
      ...onboardingData,
      selectedQuestion: question,
    });
  };

  const handleQuestionSubmit = () => {
    if (onboardingData.selectedQuestion.questionId === 0) {
      return;
    }
    onNext();
  };

  const getListItemClasses = (questionId: number) => {
    const baseClasses =
      'flex flex-col justify-center h-20 px-2 m-1 rounded-lg border-1';
    const selectedClasses =
      onboardingData.selectedQuestion.questionId === questionId
        ? ' bg-primary bg-primary'
        : ' border-gray-light bg-secondary';
    return `${baseClasses} ${selectedClasses}`;
  };
  console.log('recoil', onboardingData.selectedQuestion.questionId);

  return (
    <>
      <h1 className="text-lg font-semibold">
        함께 이야기해보고 싶은 질문을 선택해볼까요?
      </h1>

      <ul className="w-[90%] overflow-y-scroll h-80rem my-7">
        {questionList.map((question) => (
          <li
            key={question.questionId}
            className={getListItemClasses(question.questionId)}
            onClick={() => handleSelectQuestion(question)}
          >
            <span>{question.question}</span>
          </li>
        ))}
      </ul>
      <Button
        variant="primary"
        size="wide"
        onClick={handleQuestionSubmit}
        disabled={onboardingData.selectedQuestion.questionId === 0}
      >
        이 질문으로 시작하기
      </Button>
    </>
  );
}
