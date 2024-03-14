import { onboardingSteps } from '@/pages/onboarding';
import LeftArrow from '../icons/LeftArrow';

type Props = {
  onPrev: () => void;
  currentStepIndex: number;
};

export default function OnboardingStepNavigator({
  currentStepIndex,
  onPrev,
}: Props) {
  const progress = Math.floor(((currentStepIndex + 1) / 3) * 100);

  return (
    <div className="flex items-center justify-center w-full">
      {!!currentStepIndex && <LeftArrow className="mr-5" onClick={onPrev} />}
      <div className="w-[80%] h-2 rounded-lg bg-gray-light">
        <div className={`h-full w-[${progress}%] bg-primary rounded-lg`} />
      </div>
    </div>
  );
}
