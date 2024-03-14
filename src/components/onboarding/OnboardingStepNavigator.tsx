import LeftArrow from '../icons/LeftArrow';

type Props = {
  onPrev: () => void;
  currentStepIndex: number;
};

export default function OnboardingStepNavigator({
  currentStepIndex,
  onPrev,
}: Props) {
  const progressBarWidth = ['w-1/3', 'w-2/3', 'w-full'][currentStepIndex];

  return (
    <div className="flex items-center justify-center w-full">
      {currentStepIndex > 0 && <LeftArrow className="mr-5" onClick={onPrev} />}
      <div className="w-[80%] h-2 rounded-lg bg-gray-light">
        <div className={`h-full ${progressBarWidth} bg-primary rounded-lg`} />
      </div>
    </div>
  );
}
