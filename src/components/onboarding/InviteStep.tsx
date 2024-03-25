import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@/components/ui/Button';
import {
  initialOnboardingState,
  onboardingState,
} from '@/store/onboardingState';
import { useRecoilStateSSR } from '@/hooks/common/useRecoilStateSSR';
import { useCreateInviteKey } from '@/hooks/queries/useCreateInviteKey';
import { showToastSuccessMessage } from '@/util/toast';
import NotificationCard from './NotificationCard';
import { queryKeys } from '@/constants/queryKeys';
import { COUPLE_WAITING_USER } from '@/constants/userStatus';
import { revalidateUserStatusCookie } from '@/util/revalidateUserStautCookie';

export default function InviteStep() {
  const router = useRouter();
  const [onboardingData, setOnboardingData] = useRecoilStateSSR(
    onboardingState,
    initialOnboardingState
  );
  const { mutate: createInviteKey, isPending, isError } = useCreateInviteKey();
  const queryClient = useQueryClient();

  const handleInvite = () => {
    createInviteKey(
      {
        questionId: onboardingData.selectedQuestion.questionId,
        answer: onboardingData.answer,
      },
      {
        onSuccess: ({ data }) => {
          showToastSuccessMessage('초대링크가 생성되었습니다!');
          revalidateUserStatusCookie(COUPLE_WAITING_USER);
          router.push('/chatroom');
          queryClient.invalidateQueries({ queryKey: queryKeys.userStatus });
          setOnboardingData(initialOnboardingState);
        },
      }
    );
  };

  return (
    <>
      <section className="w-full h-full pt-3">
        <h1 className="mt-6 mb-24 text-xl font-bold text-center">
          초대링크를 만들어서 대화를 시작해보세요!
        </h1>
        <NotificationCard>
          <div className="mt-5 text-gray-400">
            <p className="mb-3 font-semibold text-center">
              이제 거의 다 왔어요!
            </p>
            <p>
              선택한 질문과 답변으로 시작할 준비가 되었습니다. 아래의 버튼을
              클릭하면, 초대링크가 생성됩니다.
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
