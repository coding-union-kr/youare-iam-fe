import type { NextPageWithLayout } from '@/types/page';
import BasicLayout from '@/components/layout/BasicLayout';
import { useRouter } from 'next/router';
import ServiceStep from '@/components/onboarding/ServiceStep';
import QuestionSelectStep from '@/components/onboarding/QuestionSelectStep';
import AnswerStep from '@/components/onboarding/AnswerStep';
import InviteStep from '@/components/onboarding/InviteStep';

const onboardingSteps = ['questions', 'answer', 'invite'] as const;

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { step } = router.query;
  const currentStepIndex = onboardingSteps.findIndex((s) => s === step);

  const handleNext = () => {
    if (currentStepIndex === onboardingSteps.length - 1) {
      return;
    }

    const nextStep = onboardingSteps[currentStepIndex + 1];
    router.push(`/onboarding?step=${nextStep}`);
  };

  return (
    <>
      {step === undefined && <ServiceStep onNext={handleNext} />}
      {step === 'questions' && <QuestionSelectStep onNext={handleNext} />}
      {step === 'answer' && <AnswerStep onNext={handleNext} />}
      {step === 'invite' && <InviteStep onNext={handleNext} />}
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return (
    <BasicLayout className="justify-between px-3 py-10">{page}</BasicLayout>
  );
};

export default Page;
