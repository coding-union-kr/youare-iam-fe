import { useRouter } from 'next/router';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import type { NextPageWithLayout } from '@/types/page';
import BasicLayout from '@/components/layout/BasicLayout';
import Intro from '@/components/onboarding/Intro';
import QuestionSelectStep from '@/components/onboarding/QuestionSelectStep';
import AnswerStep from '@/components/onboarding/AnswerStep';
import InviteStep from '@/components/onboarding/InviteStep';
import useQuestionList, {
  getQuestionList,
} from '@/hooks/feature/useQuestionList';

const onboardingSteps = ['questions', 'answer', 'invite'] as const;

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { step } = router.query;
  const currentStepIndex = onboardingSteps.findIndex((s) => s === step);

  const { questionList } = useQuestionList();

  const handleNext = () => {
    if (currentStepIndex === onboardingSteps.length - 1) {
      return;
    }

    const nextStep = onboardingSteps[currentStepIndex + 1];
    router.push(`/onboarding?step=${nextStep}`);
  };

  const handlePrev = () => {
    if (currentStepIndex === 0) {
      return;
    }

    const prevStep = onboardingSteps[currentStepIndex - 1];
    router.push(`/onboarding?step=${prevStep}`);
  };

  return (
    <>
      {currentStepIndex === -1 && <Intro onNext={handleNext} />}
      {step === 'questions' && (
        <QuestionSelectStep onNext={handleNext} questionList={questionList} />
      )}
      {step === 'answer' && <AnswerStep onNext={handleNext} />}
      {step === 'invite' && <InviteStep />}
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return (
    <BasicLayout className="justify-between px-3 py-10">{page}</BasicLayout>
  );
};

export default Page;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['question-list'],
    queryFn: getQuestionList,
  });

  return {
    props: {
      initialState: dehydrate(queryClient),
    },
  };
};
