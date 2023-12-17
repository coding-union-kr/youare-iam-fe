import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import Modal from '@/components/ui/Modal';
import QuestionBar from '@/components/ui/QuestionBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

type Letters = {
  letters: LetterType[];
  nextCursor: number;
};

type LetterType = {
  selectQuestionId: number;
  question: string;
  createdAt: number;
  answerCount: number;
  myAnswer?: boolean;
  answer:
    | {
        memberId: number;
        memberName: string;
        answer: string;
        createdAt: number;
      }[]
    | null;
};

type ModalInfo = {
  actionText: string;
  cancelText: string;
  bodyText: string;
  handleAction: () => void;
};

const mockServerURL =
  'https://cc7831bd-6881-44ff-9534-f344d05bc5ad.mock.pstmn.io';
const path = '/api/v1/letters';
const apiEndpoint = `${mockServerURL}${path}`;

const Page: NextPageWithLayout<Letters> = ({ letters }) => {
  console.log('letters', letters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    actionText: '',
    cancelText: '',
    bodyText: '',
    handleAction: () => {},
  });

  const router = useRouter();

  const handleQuestionBarClick = ({ letter }: { letter: LetterType }) => {
    if (letter.answerCount === 0) {
      setModalInfo({
        actionText: '답변 작성하러 가기',
        cancelText: '되돌아가기',
        bodyText: '둘의 답변을 기다리고 있어요.<br>먼저 답변을 작성해볼까요?',
        handleAction: () => {
          router.push('/answer');
        },
      });
      setIsModalOpen(true);
    } else if (letter.answerCount === 2) {
      setIsModalOpen(false);
    } else if (letter.answerCount === 1) {
      if (letter.myAnswer === true) {
        setModalInfo({
          actionText: '수정하기',
          cancelText: '되돌아가기',
          bodyText:
            '상대가 답변을 등록하지 않았어요.<br>기존 답변을 수정하시겠어요?',
          handleAction: () => {
            console.log('수정하기 action');
          },
        });
      } else {
        setModalInfo({
          actionText: '답변 작성하러 가기',
          cancelText: '되돌아가기',
          bodyText:
            '내가 아직 답변을 등록하지 않았어요.<br>답변을 등록하러 가볼까요?',
          handleAction: () => {
            router.push('/answer');
          },
        });
      }
      setIsModalOpen(true);
    }
  };

  console.log('letters', letters);

  return (
    <div className="pb-[5rem]">
      {isModalOpen && (
        <Modal
          modalInfo={modalInfo}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
      {/* 추후에 아래의 dummyQuestions를 letters로 바꿔야 함(api 연동 후) */}
      {letters.map((letter: LetterType, index: number) => {
        return (
          <QuestionBar
            key={index}
            letter={letter}
            onClick={() => handleQuestionBarClick({ letter })}
          />
        );
      })}
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    const letters = response.data.letters;
    console.log('letters: ', letters);
    return { props: { letters } };
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return { props: { letters: [] } };
  }
};

export default Page;
