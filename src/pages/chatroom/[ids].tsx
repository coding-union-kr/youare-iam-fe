import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import Modal from '@/components/ui/Modal';
import QuestionBar from '@/components/ui/QuestionBar';
import { useState, useEffect } from 'react';

const dummyQuestions = [
  {
    isRegisterQuestion: false,
    selectQuestionId: 1,
    question: '상대방을 사랑하는 마음을 수치로 표현하면?',
    createdAt: 231223,
    answerCount: 1,
    isMyAnswer: false,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 2,
    question: '같이 해보고 싶은 버킷리스트가 있나요? ',
    createdAt: 231225,
    answerCount: 1,
    isMyAnswer: true,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 3,
    question: '다툼이 생겼을 때 절대 안 했으면 하는 것이 있다면 무엇인가요? ',
    createdAt: 231226,
    answerCount: 2,
    answer: [
      {
        memberId: 1,
        memberName: '이몽룡',
        answer: '소리지르기',
        createdAt: 231226,
      },
      {
        memberId: 2,
        memberName: '성춘향',
        answer: '잠수타기',
        createdAt: 231226,
      },
    ],
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
];

type QuestionItemType = {
  selectQuestionId: number;
  question: string;
  createdAt: number;
  answerCount: number;
  isMyAnswer?: boolean;
  isRegisterQuestion: boolean;
  answers?: {
    memberId: number;
    memberName: string;
    answer: string;
    createdAt: number;
  }[];
};

type ModalInfo = {
  actionText: string;
  cancelText: string;
  bodyText: string;
  handleAction: () => void;
};

const Page: NextPageWithLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    actionText: '',
    cancelText: '',
    bodyText: '',
    handleAction: () => {},
  });

  const handleQuestionBarClick = ({
    questionItem,
  }: {
    questionItem: QuestionItemType;
  }) => {
    if (questionItem.answerCount === 0) {
      setModalInfo({
        actionText: '답변 작성하러 가기',
        cancelText: '되돌아가기',
        bodyText: '둘의 답변을 기다리고 있어요. 먼저 답변을 작성해볼까요?',
        handleAction: () => {
          console.log('답변 작성하러 가기 action');
        },
      });
      setIsModalOpen(true);
    } else if (questionItem.answerCount === 2) {
      setIsModalOpen(false);
    } else if (questionItem.answerCount === 1) {
      if (questionItem.isMyAnswer) {
        setModalInfo({
          actionText: '답변 작성하러 가기',
          cancelText: '되돌아가기',
          bodyText: '아직 답변을 등록하지 않았어요. 답변을 등록하러 가볼까요?',
          handleAction: () => {
            console.log('답변 작성하러 가기 action');
          },
        });
      } else {
        setModalInfo({
          actionText: '되돌아가기',
          cancelText: '수정하기',
          bodyText:
            '상대가 답변을 등록하지 않았어요. 기존 답변을 수정하시겠어요?',
          handleAction: () => {
            console.log('수정하기 action');
          },
        });
      }
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    console.log('isModalOpen', isModalOpen);
  }, [isModalOpen]);
  return (
    <>
      {isModalOpen && (
        <Modal
          modalInfo={modalInfo}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
      {dummyQuestions.map((questionItem: QuestionItemType, index: number) => {
        return (
          <QuestionBar
            key={index}
            questionItem={questionItem}
            onClick={() => handleQuestionBarClick({ questionItem })}
          />
        );
      })}
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
