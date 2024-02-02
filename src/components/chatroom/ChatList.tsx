import QuestionBar from '@/components/chatroom/QuestionBar';
import { kakaoShare } from '@/util/kakaoShare';
import useReversedInfiniteScroll from '@/hooks/queries/useReversedInfiniteScroll';
import { useRouter } from 'next/router';
import { get } from '@/libs/clientSideApi';
import { myIdState } from '@/store/myIdState';
import { useSetRecoilState } from 'recoil';
import { useInfiniteQuery } from '@tanstack/react-query';

type Letter = {
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

type ChatList = {
  setModalInfo: (modalInfo: {
    actionText: string;
    cancelText: string;
    bodyText: string;
    handleAction: () => void;
  }) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

const ChatList = ({ setModalInfo, setIsModalOpen }: ChatList) => {
  const router = useRouter();
  const setMyId = useSetRecoilState(myIdState);

  const getLetters = async ({ pageParam }: { pageParam: number }) => {
    console.log('getLetters');
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

  const { fetchNextPage, hasNextPage, data } = useInfiniteQuery({
    queryKey: ['letters'],
    queryFn: getLetters,
    initialPageParam: 0,

    // getNextPageParam이 리턴하는 값이 다음 페이지의 pageParam이 됨
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

  // useInfiniteQuery에서 가져온 fetchNextPage와 hasNextPage를 커스텀 훅에 넘겨준다.
  const { containerRef, handleScroll } = useReversedInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    data?.length ?? 0 // 훅에서 dataLength가 됨
  );

  const handleQuestionBarClick = ({ letter }: { letter: Letter }) => {
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
          actionText: '답변 요청하기',
          cancelText: '되돌아가기',
          bodyText:
            '상대가 답변을 등록하지 않았어요.<br>답변을 작성할 수 있도록<br/> 메시지를 보내볼까요?',
          handleAction: () => {
            kakaoShare(letter.question, letter.selectQuestionId);
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
    <div
      // 5rem은 BottomNavigation 높이, 0.5rem은 QuestionBar의 패딩 높이, 0.5rem은 여백
      className="max-h-[calc(100vh-5rem-0.5rem-0.5rem)] overflow-y-auto overflow-x-hidden"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {data?.map((letter: Letter, index: number) => {
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

export default ChatList;
