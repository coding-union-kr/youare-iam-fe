import Button from '../ui/Button';
import type { OnboardingStepPros } from './Intro';

export default function QuestionSelectStep({ onNext }: OnboardingStepPros) {
  return (
    <>
      <p>함께 이야기해보고 싶은 실문을 선택해볼까요?</p>
      <Button variant="primary" size="wide" onClick={onNext}>
        이 질문으로 시작하기
      </Button>
    </>
  );
}
