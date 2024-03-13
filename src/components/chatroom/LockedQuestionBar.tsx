import { useState } from 'react';
import { useRouter } from 'next/router';
import LockIcon from '../icons/LockIcon';
import { applyDateFormatting } from '@/util/applyDateFormatting';
import type { Letter } from '@/types/api';
import useDialog from '@/hooks/common/useDialog';
import Modal, { type ModalInfo } from '../ui/Modal';

type Props = {
  letter: Letter;
};

const LockedQuestionBar = ({ letter }: Props) => {
  const router = useRouter();

  const {
    isOpen,
    openDialog: openModal,
    closeDialog: closeModal,
  } = useDialog();
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    actionText: '',
    cancelText: '',
    bodyText: '',
    handleAction: () => {},
  });

  const changeModalInfo = ({ letter }: { letter: Letter }) => {
    if (letter.answerCount === 0) {
      setModalInfo({
        actionText: '답변 작성하러 가기',
        cancelText: '되돌아가기',
        bodyText: '둘의 답변을 기다리고 있어요.<br>먼저 답변을 작성해볼까요?',
        handleAction: () => {
          router.push(`/answer/${letter.selectQuestionId}`);
        },
      });
    } else if (letter.answerCount === 1) {
      if (letter.myAnswer === true) {
        setModalInfo({
          actionText: '답변 수정하기',
          cancelText: '되돌아가기',
          bodyText:
            '상대가 답변을 등록하지 않았어요.<br>기존 답변을 수정하시겠어요?',
          handleAction: () => {
            router.push(`/answer/edit/${letter.selectQuestionId}`);
          },
        });
      } else {
        setModalInfo({
          actionText: '답변 작성하러 가기',
          cancelText: '되돌아가기',
          bodyText:
            '내가 아직 답변을 등록하지 않았어요.<br>답변을 등록하러 가볼까요?',
          handleAction: () => {
            router.push(`/answer/${letter.selectQuestionId}`);
          },
        });
      }
    }
  };

  const handleQuestionBarClick = () => {
    changeModalInfo({ letter });
    openModal();
  };

  return (
    <>
      <div
        onClick={handleQuestionBarClick}
        className="m-2"
        id={letter.selectQuestionId.toString()}
      >
        <div className="p-2 font-neo  h-full rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center">
          <div className="pl-1 pr-2">
            <LockIcon />
          </div>
          <div>{letter.question}</div>
        </div>
        {letter.answerCount === 1 && <LockedAnswer letter={letter} />}
      </div>
      <Modal
        modalInfo={modalInfo}
        closeModal={closeModal}
        isModalOpen={isOpen}
      />
    </>
  );
};

const LockedAnswer = ({ letter }: Props) => {
  const date = applyDateFormatting(letter.createdAt);

  return (
    <>
      {letter.myAnswer ? (
        <>
          <div className="relative">
            <div className="font-neo text-sm absolute top-4 left-[15%] w-[90%] h-full z-10 text-gray-dark">
              두 사람 모두 등록해야 확인할 수 있어요.
            </div>
          </div>
          <div className="chat chat-end bg-blend-multiply">
            <div className="chat-bubble bg-[#FEB2B2] px-24"></div>
            <div className="opacity-50 chat-footer">{date}</div>
          </div>
        </>
      ) : (
        <>
          <div className="relative" id={letter.selectQuestionId.toString()}>
            <div className="font-neo text-sm absolute top-4 left-[15%] w-[90%] h-full z-10 text-gray-dark">
              두 사람 모두 등록해야 확인할 수 있어요.
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble bg-[#ffffff] px-24"></div>
              <div className="opacity-50 chat-footer">{date}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LockedQuestionBar;
