import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import Button from '@/components/ui/Button';
import {
  initialOnboardingState,
  onboardingState,
} from '@/store/onboardingState';
import { useCreateInviteKey } from '@/hooks/queries/useCreateInviteKey';
import { showToastSuccessMessage } from '@/util/toast';
import NotificationCard from './NotificationCard';

export default function InviteStep() {
  const router = useRouter();
  const [onboardingData, setOnboardingData] = useRecoilState(onboardingState);
  const { mutate: createInviteKey, isPending, isError } = useCreateInviteKey();

  const handleInvite = () => {
    createInviteKey(
      {
        questionId: onboardingData.selectedQuestion.questionId,
        answer: onboardingData.answer,
      },
      {
        onSuccess: ({ data }) => {
          showToastSuccessMessage('초대링크가 생성되었습니다!');
          router.push('/chatroom');
          // setOnboardingData(initialOnboardingState);
        },
      }
    );
  };

  return (
    <>
      <section className="w-full pt-10">
        <h1 className="mb-16 text-xl font-bold text-center">
          초대링크를 만들어서 대화를 시작해보세요!
        </h1>
        <NotificationCard>
          <div className="mt-5 text-gray-400">
            <p>초대링크를 전송하면 상대방이 당신의 질문에 답변할 수 있어요.</p>
            <p>
              두 사람의 답변이 완료되면 질문에 대한 서로의 답변을 확인할 수
              있어요.
            </p>
          </div>
        </NotificationCard>
      </section>
      <Button
        variant="primary"
        size="wide"
        onClick={handleInvite}
        isLoading={isPending}
        disabled={isError}
      >
        초대링크 생성하기
      </Button>
    </>
  );
}
