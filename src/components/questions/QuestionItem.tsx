import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import ListItem from '../ui/ListItem';
import usePostQuestion from '@/hooks/queries/usePostQuestion';
import type { Question } from '@/types/api';
import { queryKeys } from '@/constants/queryKeys';
import Modal from '../ui/Modal';
import useDialog from '@/hooks/common/useDialog';

type Props = {
  question: Question;
};

export default function QuestionItem({ question }: Props) {
  const router = useRouter();
  const [isOpen, toggle] = useDialog();
  const queryClient = useQueryClient();
  const { mutate: postQuestion, isError } = usePostQuestion();
  const handleItemClick = (questionId: Question['questionId']) => {
    if (isError) {
      return;
    }

    postQuestion(
      { questionId: questionId },
      {
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: queryKeys.questions });
          queryClient.invalidateQueries({ queryKey: queryKeys.letters });
        },
        onSuccess: () => {
          router.push('/chatroom');
        },
      }
    );
  };

  const modalInfo = {
    actionText: '선택하기',
    cancelText: '취소',
    bodyText:
      '질문은 하루에 하나씩 선택할 수 있어요. <br/> 이 질문을 선택하시겠어요?',
    handleAction: () => handleItemClick(question.questionId),
  };

  return (
    <>
      <div
        onClick={toggle}
        className="flex flex-col items-center justify-center"
      >
        <ListItem question={question.question} />
      </div>
      <Modal modalInfo={modalInfo} closeModal={toggle} isModalOpen={isOpen} />
    </>
  );
}
