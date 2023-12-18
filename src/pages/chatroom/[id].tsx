import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import Modal from '@/components/ui/Modal';
import QuestionBar from '@/components/ui/QuestionBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
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
  // response.data.letters로 하면 nextCursor를 못받아와서 안됨
  const letters = response.data;
  return letters;
};

// useReversedInfiniteScroll라는 커스텀 훅
function useReversedInfiniteScroll(
  fetchNextPage: () => Promise<unknown>,
  hasNextPage: boolean = false,
  dataLength: number = 0
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  // 맨 처음에, prevScrollHeight가 바뀔 때, dataLength가 바뀔 때 실행된다.
  useEffect(
    // (3) scrollToPrevScrollHeight를 호출하는 곳이 없는데 어떻게 실행되는지??
    function scrollToPrevScrollHeight() {
      // prevScrollHeight === 0: 첫 페이지라면
      if (prevScrollHeight === 0) {
        // 맨 처음에는 스크롤 맨 아래로 내리기
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

  // containerRef과 handleScroll을 뽑아내기 위한 훅임
  return {
    containerRef,
    handleScroll,
  };
}

const Page: NextPageWithLayout<Letters> = () => {
  // (1) getStaticProps에서 가져온 letters를 가져오려면 아래처럼 파라미터를 넘겨줘야 하지 않는지??
  // 왜 넘기면 오류가 나는지? 응답으로 가져온 이 letters를 써야하지 않나??
  // const Page: NextPageWithLayout<Letters> = ({ letters }) => {

  // useInfiniteQuery에서 fetchNextPage와 hasNextPage를 가져온다.
  const {
    fetchNextPage,
    hasNextPage,
    // 'data: letters'가 없으면 안됨
    // (2) 아래의 letters는 어디에서 가져온 것인지??
    data: letters,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: getLetters,
    initialPageParam: 0,

    // getNextPageParam이 리턴하는 값이 다음 페이지의 pageParam이 됨
    // ㄴ 리턴값이 undefined라면 더 이상 가져올 페이지가 없다는 뜻
    // 백엔드에서 넘겨주는 nextCursor: 더 이상 가져올 페이지가 없을 때 -1임
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor === -1 ? undefined : lastPage.nextCursor;
    },

    // select: 데이터를 가공하기 위한 부분
    // [[5, 6], [3, 4], [1, 2]] -> [[1, 2], [3, 4], [5, 6]] -> [1, 2, 3, 4, 5, 6]
    // data.pages.reverse()를 하면 앞뒤로 새 페이지가 붙는 버그가 생긴다.
    // ㄴ reverse()는 배열 자체를 바꿔버리기 때문. 대신 [...data.pages].reverse()를 해줘야 한다.
    select: (data) =>
      ([...data.pages] ?? []).reverse().flatMap((page) => page.letters),
  });

  // useReversedInfiniteScroll라는 커스텀 훅에서 containerRef와 handleScroll을 가져온다.
  // useInfiniteQuery에서 가져온 fetchNextPage와 hasNextPage를 커스텀 훅에 넘겨준다.
  const { containerRef, handleScroll } = useReversedInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    letters?.length ?? 0 // 훅에서 dataLength가 됨
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

  console.log('letters: ', letters);
  console.log('hasNextPage: ', hasNextPage);

  return (
    <div className="pb-[5rem]">
      {/* 모달이 열리면 보일 부분 */}
      {isModalOpen && (
        <Modal
          modalInfo={modalInfo}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
      <div
        // max-h-[calc(100vh-5rem-0.75rem)]: 스크롤이 있을 높이를 지정한다.
        // ㄴ 5rem은 BottomNavigation 높이, 0.5rem은 QuestionBar의 패딩 높이, 0.5rem은 여백
        // overflow-y-auto: y축이 더 길 때(세로) 스크롤이 생기도록 설정, 내용이 넘칠 때만 스크롤바 표시
        className="max-h-[calc(100vh-5rem-0.5rem-0.5rem)] overflow-y-auto"
        // letters를 감싸고 있는 container. ref를 지정했다.
        ref={containerRef}
        // 스크롤이 되면 실행되는 이벤트 핸들러
        onScroll={handleScroll}
      >
        {letters?.map((letter: LetterType, index: number) => {
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

// letters: 빌드시에 가져온 데이터. prop으로 넘겨줘서 사용 가능하게 한다.
export const getStaticProps = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    // response.data에는 letters와 nextCursor가 있음. 그 중 letters만 가져온다.
    const letters = response.data.letters;
    return { props: { letters } };
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return { props: { letters: [] } };
  }
};

export default Page;
