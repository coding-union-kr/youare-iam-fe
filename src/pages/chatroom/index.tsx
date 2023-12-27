import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import Modal from '@/components/ui/Modal';
import QuestionBar from '@/components/ui/QuestionBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';

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

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const path = '/api/v1/letters';
const apiEndpoint = `${baseURL}${path}`;

const getLetters = async ({ pageParam }: PageParam) => {
  const url = pageParam
    ? `${apiEndpoint}?next-cursor=${pageParam}`
    : apiEndpoint;
  console.log('url: ', url);
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// useReversedInfiniteScroll라는 커스텀 훅
// containerRef과 handleScroll을 뽑아내기 위해 만들었다.
function useReversedInfiniteScroll(
  fetchNextPage: () => Promise<unknown>,
  hasNextPage: boolean = false,
  dataLength: number = 0
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  // useEffect(함수, 배열)
  // 맨 처음에, prevScrollHeight가 바뀔 때, dataLength가 바뀔 때 실행된다.
  useEffect(
    // 스크롤 위치를 지정하는 함수(scrollTo로 이동)
    function scrollToPrevScrollHeight() {
      // scrollHeight: 스크롤 된 내용의 전체 높이
      // 처음 접속했을 때 스크롤을 맨 아래로 내린다.
      if (prevScrollHeight === 0) {
        containerRef.current?.scrollTo({
          top: containerRef.current.scrollHeight,
        });
        return;
      }

      // **중요**: 아래 코드를 쓰기 위해 useReversedInfiniteScroll 훅이 존재한다.
      // IntersectionObserver를 처음에 사용했었음. 근데 이 코드가 없어서 페이지 추가시에 스크롤이 맨 위로 올라가는 문제가 발생했다.
      // 처음이 아니면 화면을 이동한 만큼만 스크롤 위치를 이동한다.
      // ㄴ 아래 코드가 없으면 페이지가 바뀔 때 스크롤 위치가 유지되지 않음
      // ㄴ 그래서 페이지가 생겼을 때 스크롤이 바로 최상단으로 이동하는 문제가 발생한다.
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

    // scrollHeight은 동일
    // scrollTop은 스크롤이 올라갈수록 줄어듦
    // 즉 prevScrollHeight는 스크롤을 올릴 수록 커짐
    setPrevScrollHeight(
      (containerRef.current?.scrollHeight ?? 0) -
        (containerRef.current?.scrollTop ?? 0)
    );

    // 만약 스크롤이 450px 미만으로 줄어들었다면(맨 위까지 스크롤이 올라가기 전에) 다음 페이지 가져오기
    if ((containerRef.current?.scrollTop ?? 0) < 450) {
      fetchNextPage();
    }
  }

  // 이 훅은 containerRef과 handleScroll을 리턴한다.
  return {
    containerRef,
    handleScroll,
  };
}

const Page: NextPageWithLayout<Letters> = () => {
  // useInfiniteQuery에서 fetchNextPage와 hasNextPage를 가져온다.
  const { fetchNextPage, hasNextPage, data, error } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: getLetters,
    initialPageParam: 0,

    // getNextPageParam이 리턴하는 값이 다음 페이지의 pageParam이 됨
    // ㄴ 리턴값이 undefined라면 더 이상 가져올 페이지가 없다는 뜻
    // 백엔드에서 넘겨주는 nextCursor: 더 이상 가져올 페이지가 없을 때 -1임
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor === -1 ? undefined : lastPage.nextCursor;
    },

    // select: 데이터를 가공하기 위한 부분. queryFn에서 받아온 data를 가공한다.(데이터 원본))
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
    data?.length ?? 0 // 훅에서 dataLength가 됨
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    actionText: '',
    cancelText: '',
    bodyText: '',
    handleAction: () => {},
  });

  if (error) {
    throw error;
  }

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

  // 다음 페이지가 있는지(nextCursor가 -1인지 아닌지) 확인한다.
  // console.log('hasNextPage: ', hasNextPage);

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
        // 스크롤이 움직이면 실행되는 handleScroll이라는 이벤트핸들러가 실행된다.
        onScroll={handleScroll}
      >
        {data?.map((letter: LetterType, index: number) => {
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

export default Page;
