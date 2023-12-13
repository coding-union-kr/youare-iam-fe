import Button from '../ui/Button';
import type { OnboardingStepPros } from './Intro';

export default function AnswerStep({ onNext }: OnboardingStepPros) {
  return (
    <>
      <p>내가 먼저 답변을 작성해볼까요?</p>
      <Button variant="primary" size="wide" onClick={onNext}>
        답변 등록하기
      </Button>
    </>
  );
}
