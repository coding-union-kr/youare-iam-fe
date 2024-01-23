import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import Modal from '@/components/ui/Modal';
import QuestionBar from '@/components/ui/QuestionBar';
import { get } from '@/libs/api';
import { myIdState } from '@/store/myIdState';
import { checkAuth } from '@/util/checkAuth';
import useReversedInfiniteScroll from '@/hooks/queries/useReversedInfiniteScroll';

type Letters = {
  letters: LetterType[];
  nextCursor: number;
  myId: string;
};

type LetterType = {
  selectQuestionId: number;
  question: string;
  createdAt: string;
  answerCount: number;
  myAnswer?: boolean;
  answer:
    | {
        memberId: string;
        memberName: string;
        answer: string;
        createdAt: string;
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

const Page: NextPageWithLayout<Letters> = () => {
  const setMyId = useSetRecoilState(myIdState);
  const getLetters = async ({ pageParam }: PageParam) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const path = '/api/v1/letters';
    const apiEndpoint = `${baseURL}${path}`;

    const url = pageParam
      ? `${apiEndpoint}?next-cursor=${pageParam}`
      : apiEndpoint;

    try {
      const response = await get(url);
      setMyId(response.data.myId);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    actionText: '',
    cancelText: '',
    bodyText: '',
    handleAction: () => {},
  });
  const router = useRouter();

  // useInfiniteQuery에서 fetchNextPage와 hasNextPage를 가져온다.
  const { fetchNextPage, hasNextPage, data } = useInfiniteQuery({
    queryKey: ['letters'],
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
    select: (data) => {
      return ([...data.pages] ?? []).reverse().flatMap((page) => page.letters);
    },
  });

  // useReversedInfiniteScroll라는 커스텀 훅에서 containerRef와 handleScroll을 가져온다.
  // useInfiniteQuery에서 가져온 fetchNextPage와 hasNextPage를 커스텀 훅에 넘겨준다.
  const { containerRef, handleScroll } = useReversedInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    data?.length ?? 0 // 훅에서 dataLength가 됨
  );
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
        className="max-h-[calc(100vh-5rem-0.5rem-0.5rem)] overflow-y-auto overflow-x-hidden"
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const authCheck = await checkAuth(context);
  if (authCheck) {
    return authCheck;
  }

  return { props: {} };
}
export default Page;
