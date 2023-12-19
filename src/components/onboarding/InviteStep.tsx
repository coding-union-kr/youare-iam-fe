import { useRecoilState } from 'recoil';
import Button from '@/components/ui/Button';
import {
  initialOnboardingState,
  onboardingState,
} from '@/store/onboardingState';
import { useCreateInviteKey } from '@/hooks/feature/useCreateInviteKey';

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
        onSuccess: (data) => {
          //Todo : 초대링크 전송 + toast 알림(초대링크가 전송되었습니다.)
          console.log(data.linkKey);
          setOnboardingData(initialOnboardingState);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <>
      <p>초대하기</p>
      <Button variant="primary" size="wide" onClick={handleInvite}>
        초대링크 전송하기
      </Button>
    </>
  );
}

// 지금까지 선택된 답변까지도 보여주는게 좋을까?(질문은 보여줘야함 )
// 초대링크 전송하기 버튼을 누르면, 초대링크를 생성하고, 그 링크를 복사할 수 있게 해준다.
// 초대링크를 복사할 수 있게 해주는건 어떻게 해야할까?
