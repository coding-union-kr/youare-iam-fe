import Button from '../ui/Button';

export type OnboardingStepPros = {
  onNext: () => void;
};

export default function Intro({ onNext }: OnboardingStepPros) {
  return (
    <>
      {/* Todo: framer motion  */}
      <p>사랑하는 사람과 함께 이야기해보고 싶은 질문을 선택하러 가볼까요?</p>
      <Button variant="primary" size="wide" onClick={onNext}>
        질문 선택하러 가기
      </Button>
    </>
  );
}
