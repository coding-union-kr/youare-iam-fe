import { useEffect, useRef } from 'react';

const useReversedInfiniteScroll = (
  fetchNextPage: () => Promise<unknown>,
  hasNextPage: boolean = false,
  dataLength: number = 0
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);
  const prevScrollHeight = useRef(0);

  // useEffect(함수, 배열)
  // 맨 처음에, prevScrollHeight가 바뀔 때, dataLength가 바뀔 때 실행된다.
  useEffect(
    // 스크롤 위치를 지정하는 함수(scrollTo로 이동)
    function scrollToPrevScrollHeight() {
      // scrollHeight: 스크롤 된 내용의 전체 높이
      // 처음 접속했을 때 스크롤을 맨 아래로 내린다.
      if (prevScrollHeight.current === 0) {
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
        top: containerRef.current.scrollHeight - prevScrollHeight.current,
      });
    },
    [prevScrollHeight, dataLength]
  );

  // 스크롤 이벤트 핸들러
  async function handleScroll() {
    // 만약 다음 페이지가 없다면
    if (!hasNextPage) {
      // 코드를 실행하지 않습니다.
      return;
    }

    // scrollHeight은 동일
    // scrollTop은 스크롤이 올라갈수록 줄어듦
    // 즉 prevScrollHeight는 스크롤을 올릴 수록 커짐
    prevScrollHeight.current =
      (containerRef.current?.scrollHeight ?? 0) -
      (containerRef.current?.scrollTop ?? 0);

    // 만약 스크롤이 450px 미만으로 줄어들었다면(맨 위까지 스크롤이 올라가기 전에) 다음 페이지 가져오기
    if ((containerRef.current?.scrollTop ?? 0) < 450 && !isLoadingRef.current) {
      isLoadingRef.current = true;
      await fetchNextPage();
      isLoadingRef.current = false;
    }
  }

  // 이 훅은 containerRef과 handleScroll을 리턴한다.
  return {
    containerRef,
    handleScroll,
  };
};

export default useReversedInfiniteScroll;
