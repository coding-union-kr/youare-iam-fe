import type { WaitingQuestion } from '@/types/api';
import { useRouter } from 'next/router';
import Button from '../ui/Button';
import { applyDateFormatting } from '@/util/applyDateFormatting';

type Props = {
  questions: WaitingQuestion[];
};

export default function UnansweredQuestionsList({ questions }: Props) {
  const router = useRouter();
  const handleAddQuestion = () => {
    router.push('/questions');
  };

  const handleQuestionClick = (selectQuestionId: number) => {
    router.push(`/answer/${selectQuestionId}`);
  };

  if (questions.length === 0) {
    return (
      <div className="p-6 text-sm text-center bg-white rounded-md shadow-sm text-gray-dark">
        <p>현재 답변을 기다리는 질문이 없어요.</p>
        <p>서로에 대해 더 알고 싶은 것이 있다면,</p>
        <p>지금 질문해보세요.</p>
        <Button
          onClick={handleAddQuestion}
          variant="primary"
          size="normal"
          className="mx-auto mt-3"
        >
          새로운 질문하기
        </Button>
      </div>
    );
  }

  return (
    <ul className="flex flex-col w-full gap-3">
      {questions.map(({ selectQuestionId, question, createdAt }) => (
        <li
          key={selectQuestionId}
          className="flex items-center justify-between w-full gap-2 p-3 pl-5 bg-white rounded-md shadow-sm"
        >
          <div className="w-full">
            <p>{question}</p>
            <p className="w-full pr-3 text-xs text-gray-dark text-end">
              {applyDateFormatting(createdAt)}
            </p>
          </div>

          <Button
            onClick={() => handleQuestionClick(selectQuestionId)}
            variant="primary"
            size="sm"
          >
            답변 등록
          </Button>
        </li>
      ))}
    </ul>
  );
}
