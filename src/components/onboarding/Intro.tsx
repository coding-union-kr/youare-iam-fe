import { AnimatePresence, m } from 'framer-motion';
import Button from '../ui/Button';
import { useEffect } from 'react';
import useStep from '@/hooks/common/useStep';

export type OnboardingStepProps = {
  onNext: () => void;
};

export default function Intro({ onNext }: OnboardingStepProps) {
  const { currentStep, nextStep } = useStep({
    initStep: 0,
    maxStep: 2,
  });

  useEffect(() => {
    const timer = setInterval(nextStep, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [nextStep]);

  return (
    <>
      <section className="h-[2/3] my-auto text-lg text-center leading-loose">
        <AnimatePresence>
          {currentStep === 0 && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>평소에 이야기 나누기 어려웠지만,</p>
              <p>너무 궁금했던 질문들 있으시죠?</p>
            </m.div>
          )}
          {currentStep === 1 && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>질문을 통해서 서로를 </p>
              <p>더 잘 알아갈 수 있을거에요.</p>
            </m.div>
          )}
          {currentStep === 2 && (
            <article>
              <m.p
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.5 }}
              >
                사랑하는 사람과
              </m.p>
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 2.0 }}
              >
                함께 이야기해보고 싶은 질문을
              </m.p>
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 2.5 }}
              >
                선택하러 가볼까요?
              </m.p>
            </article>
          )}
        </AnimatePresence>
      </section>
      {currentStep === 2 && (
        <Button variant="primary" size="wide" onClick={onNext}>
          시작하기
        </Button>
      )}
    </>
  );
}
