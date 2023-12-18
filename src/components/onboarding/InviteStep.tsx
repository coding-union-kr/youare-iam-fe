import { useRecoilState } from 'recoil';
import Button from '../ui/Button';
import {
  initialOnboardingState,
  onboardingState,
} from '@/store/onboardingState';

export default function InviteStep() {
  const [onboardingData, setOnboardingData] = useRecoilState(onboardingState);

  const handleInvite = () => {
    console.log({
      questionId: onboardingData.selectedQuestion.questionId,
      answer: onboardingData.answer,
    });
    setOnboardingData(initialOnboardingState);
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
