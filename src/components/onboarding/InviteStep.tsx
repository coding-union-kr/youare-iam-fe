import Button from '../ui/Button';

export default function InviteStep() {
  return (
    <>
      <p>초대하기</p>
      <Button
        variant="primary"
        size="wide"
        onClick={() => {
          // Todo: 초대하기 기능 구현
        }}
      >
        초대링크 전송하기
      </Button>
    </>
  );
}
