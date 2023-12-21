import { AnimatePresence, motion } from 'framer-motion';
import Button from '../ui/Button';
import { useEffect, useState } from 'react';
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
      <section className="h-[2/3]">
        <AnimatePresence>
          {currentStep === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              평소에 이야기 나누기 어려웠지만, 너무 궁금했던 질문들 있으시죠?
            </motion.p>
          )}
          {currentStep === 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              질문을 통해서 서로를 더 잘 알아갈 수 있을거에요.
            </motion.p>
          )}
          {currentStep === 2 && (
            <p>
              사랑하는 사람과 함께 이야기해보고 싶은 질문을 선택하러 가볼까요?
            </p>
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
