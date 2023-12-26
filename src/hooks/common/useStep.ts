import { useCallback, useState } from 'react';

type Props = {
  initStep?: number;
  maxStep?: number;
};

const useStep = ({ initStep = 0, maxStep }: Props) => {
  const [currentStep, setCurrentStep] = useState(initStep);

  const nextStep = useCallback(() => {
    if (maxStep && currentStep >= maxStep) return;
    setCurrentStep((prev) => prev + 1);
  }, [currentStep, maxStep]);

  const prevStep = useCallback(() => {
    if (currentStep <= initStep) return;
    setCurrentStep((prev) => prev - 1);
  }, [currentStep, initStep]);

  return { currentStep, nextStep, prevStep };
};

export default useStep;
