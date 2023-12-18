import { useRecoilState } from 'recoil';
import type { OnboardingStepPros } from './Intro';
import { onboardingState } from '@/store/onboardingState';
import { Question } from '@/types/api';
import Button from '@/components/ui/Button';

type QuestionSelectStepProps = OnboardingStepPros & {
  questionList: Question[];
};

export default function QuestionSelectStep({
  onNext,
  questionList,
}: QuestionSelectStepProps) {
  const [onboardingData, setOnboardingData] = useRecoilState(onboardingState);

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
      'flex flex-col justify-center h-20 px-2 m-1 rounded-lg bg-secondary';
    const selectedClasses =
      onboardingData.selectedQuestion.questionId === questionId
        ? 'border-2 border-black'
        : 'border-1 border-gray-light';
    return `${baseClasses} ${selectedClasses}`;
  };

  return (
    <>
      <p>함께 이야기해보고 싶은 질문을 선택해볼까요?</p>

      <ul className="overflow-y-scroll h-80rem my-7 ">
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
      <Button variant="primary" size="wide" onClick={handleQuestionSubmit}>
        이 질문으로 시작하기
      </Button>
    </>
  );
}
