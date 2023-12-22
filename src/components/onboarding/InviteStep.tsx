import { useRecoilState } from 'recoil';
import Button from '@/components/ui/Button';
import {
  initialOnboardingState,
  onboardingState,
} from '@/store/onboardingState';
import { useCreateInviteKey } from '@/hooks/feature/useCreateInviteKey';
import LockIcon from '../icons/LockIcon';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://youare-iam.vercel.app/';

export default function InviteStep() {
  const [onboardingData, setOnboardingData] = useRecoilState(onboardingState);
  const { mutate: createInviteKey } = useCreateInviteKey();

  const handleInvite = () => {
    createInviteKey(
      {
        questionId: onboardingData.selectedQuestion.questionId,
        answer: onboardingData.answer,
      },
      {
        onSuccess: ({ data }) => {
          //Todo : 초대링크 전송 + toast 알림(초대링크가 전송되었습니다.)
          console.log(`${baseURL}/invite/${data.linkKey}`);

          // Todo : onboardingState 초기화
          //setOnboardingData(initialOnboardingState);
        },
        onError: (error) => {
          throw error;
        },
      }
    );
  };

  return (
    <>
      <div className="p-2 font-neo w-full rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center">
        <div className="pl-1 pr-2">
          <LockIcon />
        </div>
        <div>{onboardingData.selectedQuestion.question}</div>
      </div>
      <Button variant="primary" size="wide" onClick={handleInvite}>
        초대링크 전송하기
      </Button>
    </>
  );
}

// 지금까지 선택된 답변까지도 보여주는게 좋을까?(질문은 보여줘야함 )
// 초대링크 전송하기 버튼을 누르면, 초대링크를 생성하고, 그 링크를 복사할 수 있게 해준다.
// 초대링크를 복사할 수 있게 해주는건 어떻게 해야할까?
