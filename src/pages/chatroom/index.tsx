import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import Modal from '@/components/ui/Modal';
import QuestionBar from '@/components/ui/QuestionBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef, use } from 'react';
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

// const fetchProjects = async ({ pageParam = 0 }) => {
//   const res = await fetch('/api/projects?cursor=' + pageParam)
//   return res.json()
// }

type PageParam = {
  pageParam: number;
};

const getLetters = async ({ pageParam }: PageParam) => {
  // const getLetters = async ({ pageParam = 0 }) => {
  console.log('pageParam: ', pageParam);
  const url = pageParam
    ? `${apiEndpoint}?next-cursor=${pageParam}`
    : apiEndpoint;
  const response = await axios.get(url);
  const letters = response.data; // 처음에 response.data.letters로 했었음.
  return letters;
};

const Page: NextPageWithLayout<Letters> = ({ letters: ssrLetters }) => {
  const bottom = useRef(null);
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data: letters, // 이부분 첨에 없었음
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: getLetters,
    // getNextPageParam이 리턴하는 값이 다음 페이지의 pageParam이 됨.
    getNextPageParam: (lastPage) => {
      console.log('last page', lastPage);
      return lastPage.nextCursor === -1 ? undefined : lastPage.nextCursor;
    },
    initialPageParam: 0,

    // 데이터 가공 - letters만 가져오기 위해
    select: (data) => (data.pages ?? []).flatMap((page) => page.letters), // 이부분 첨에 없었음
  });

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

  console.log('letters', letters);

  const useObserver = ({
    target,
    root = null,
    rootMargin = '0px',
    threshold = 1.0,
    onIntersect,
  }) => {
    useEffect(() => {
      let observer;

      if (target && target.current) {
        observer = new IntersectionObserver(onIntersect, {
          root,
          rootMargin,
          threshold,
        });

        observer.observe(target.current);
      }
      return () => observer && observer.disconnect();
    }, [target, rootMargin, threshold]);
  };

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <div className="pb-[5rem]">
      {isModalOpen && (
        <Modal
          modalInfo={modalInfo}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
      {(letters ?? ssrLetters).map((letter: LetterType, index: number) => {
        return (
          <QuestionBar
            key={index}
            letter={letter}
            onClick={() => handleQuestionBarClick({ letter })}
          />
        );
      })}
      {/* <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
      </button> */}
      <div ref={bottom} />
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
