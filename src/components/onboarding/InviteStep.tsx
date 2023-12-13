import Button from '../ui/Button';
import type { OnboardingStepPros } from './Intro';

export default function InviteStep({ onNext }: OnboardingStepPros) {
  return (
    <>
      <p>초대하기</p>
      <Button variant="primary" size="wide" onClick={onNext}>
        초대링크 전송하기
      </Button>
    </>
  );
}
/**
 * 이 페이지를 구성할 필요하기 있을까??!
 * 상세페이지에 초대하기 버튼을 두는것이 원래 기획이긴 함
 */
