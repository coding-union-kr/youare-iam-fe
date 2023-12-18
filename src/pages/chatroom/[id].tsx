import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import Modal from '@/components/ui/Modal';
import QuestionBar from '@/components/ui/QuestionBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef, MouseEvent } from 'react';
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

type PageParam = {
  pageParam: number;
};

const mockServerURL = 'http://218.239.180.88:8080';
const path = '/api/v1/letters';
const apiEndpoint = `${mockServerURL}${path}`;

const getLetters = async ({ pageParam }: PageParam) => {
  const url = pageParam
    ? `${apiEndpoint}?next-cursor=${pageParam}`
    : apiEndpoint;
  const response = await axios.get(url);
  const letters = response.data; // 처음에 response.data.letters로 했었음.
  return letters;
};

function useInvertedInfiniteScroll(
  fetchNextPage: () => Promise<unknown>,
  hasNextPage: boolean = false,
  dataLength: number = 0
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  useEffect(
    function scrollToPrevScrollHeight() {
      // 만약 prevScrollHeight가 0이라면 === 첫 페이지라면
      if (prevScrollHeight === 0) {
        // 맨 아래로 스크롤을 내립니다.
        containerRef.current?.scrollTo({
          top: containerRef.current.scrollHeight,
        });
        return;
      }

      // 아닐 경우, 스크롤의 높이를 변경합니다.
      containerRef.current?.scrollTo({
        top: containerRef.current.scrollHeight - prevScrollHeight,
      });
    },
    [prevScrollHeight, dataLength]
  );

  // 스크롤 이벤트 핸들러
  function handleScroll() {
    // 만약 다음 페이지가 없다면
    if (!hasNextPage) {
      // 코드를 실행하지 않습니다.
      return;
    }

    // 이전 스크롤 높이에서 현재 scrollTop를 뺸 높이를 기억하고
    setPrevScrollHeight(
      (containerRef.current?.scrollHeight ?? 0) -
        (containerRef.current?.scrollTop ?? 0)
    );

    // 만약 스크롤이 450px 미만으로 줄어들었다면
    if ((containerRef.current?.scrollTop ?? 0) < 450) {
      // 다음 페이지를 가져옵니다.
      fetchNextPage();
    }
  }

  return {
    containerRef,
    handleScroll,
  };
}

const Page: NextPageWithLayout<Letters> = ({ letters: ssrLetters }) => {
  const {
    fetchNextPage,
    hasNextPage,
    data: letters, // 이부분 첨에 없었음
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: getLetters,
    // getNextPageParam이 리턴하는 값이 다음 페이지의 pageParam이 됨.
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor === -1 ? undefined : lastPage.nextCursor;
    },
    initialPageParam: 0,
    // 문제: 지금 새로 만들어진 페이지가 위가 아니라 아래로 붙는다.

    // 데이터 가공 - letters만 가져오기 위해

    select: (data) => (data.pages ?? []).flatMap((page) => page.letters),
    // select: (data) => ({
    //   pages: (data.pages ?? []).flatMap((page) => page.letters),
    //   pageParams: [...data.pageParams].reverse(),
    // }),
  });
  const { containerRef, handleScroll } = useInvertedInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    letters?.length ?? 0
  );
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
          router.push(`/answer/${letter.selectQuestionId}`);
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
            router.push(`/answer/${letter.selectQuestionId}`);
          },
        });
      }
      setIsModalOpen(true);
    }
  };
  console.log('letters: ', letters);

  console.log('hasNextPage: ', hasNextPage);
  return (
    <div className="pb-[5rem]">
      {isModalOpen && (
        <Modal
          modalInfo={modalInfo}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
      <div
        className="max-h-[calc(100vh-5rem-0.75rem)] overflow-y-auto"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {(letters ?? ssrLetters).map((letter: LetterType, index: number) => {
          return (
            <QuestionBar
              key={index}
              letter={letter}
              onClick={() => handleQuestionBarClick({ letter })}
            />
          );
        })}
      </div>
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
    return { props: { letters } };
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return { props: { letters: [] } };
  }
};

export default Page;
