import { useRouter } from 'next/router';
import Button from '../ui/Button';
import useDialog from '@/hooks/common/useDialog';
import Popover from '../ui/Popover';

export default function CreateQuestionButton() {
  const router = useRouter();
  const [isOpen, toggle] = useDialog();

  return (
    <div className="flex flex-col items-end h-20 mb-5">
      <Button
        variant="ghost"
        size="xs"
        onClick={toggle}
        className="w-6 mb-2 mr-8 text-gray"
      >
        ?
      </Button>
      <Button
        onClick={() => {
          router.push('/questions/new');
        }}
        variant="primary"
        size="wide"
      >
        질문 직접 등록하기
      </Button>
      <Popover isOpen={isOpen} closePopover={toggle}>
        <div className="w-[90%] mx-auto text-sm my-6 ">
          <p className="mb-5 text-lg font-bold text-center">
            우리 커플을 위한 질문을 직접 등록해볼 수 있어요!
          </p>
          <p className="text-base text-accent">질문 예시 :</p>
          <p>우리 00일에 뭐할까?</p>
          <p>같이 제주도여행 갔을 때 가장 좋았던 장소는 어디였어?</p>
        </div>
      </Popover>
    </div>
  );
}
