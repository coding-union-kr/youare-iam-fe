import { GetServerSidePropsContext } from 'next';
import { createServerSideInstance, fetchData } from '@/libs/serversideApi';
import type { ErrorResponse, UserData, UserStatus } from '@/types/api';

export const disallowAccess = async (context: GetServerSidePropsContext) => {
  const api = createServerSideInstance(context);

  const getUserStatus = async () => {
    const { userStatus } = await fetchData<UserData>(
      api,
      '/api/v1/members/user-status'
    );
    return userStatus;
  };

  const path = context.resolvedUrl;

  const pathPatterns = {
    onboarding: /^\/onboarding$/,
    invite: /^\/invite\/[\da-z]{8}(-[\da-z]{4}){3}-[0-9a-z]{12}$/,
    answer: /^\/answer\/\d*$/,
    questions: /^\/questions$/,
  };

  const disallowedPaths: Record<UserStatus, RegExp[]> = {
    COUPLE_USER: [pathPatterns.onboarding, pathPatterns.invite],
    COUPLE_WAITING_USER: [
      pathPatterns.onboarding,
      pathPatterns.answer,
      pathPatterns.invite,
    ],
    NON_COUPLE_USER: [pathPatterns.questions, pathPatterns.answer],
  };

  try {
    const userStatus = await getUserStatus();
    if (disallowedPaths[userStatus]?.some((pattern) => pattern.test(path))) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }
  } catch (error: unknown) {
    // fetchData가 실패했는데, 로그인이 안돼서 실패한 경우일 때 페이지 접근을 막지 않음(로그인이 안된 상태에서 /invite 접근 가능하도록)
    // /invite에는 authCheck가 없기 때문에 아래의 코드가 필요함.
    // 다른 페이지는 authCheck를 하기 때문에 로그인을 안했으면 /로 redirect되어 아래 코드가 실행되지 않음
    const errorResponse = error as ErrorResponse;
    if (errorResponse.status === 401 && errorResponse.code === 'AU001') {
      return;
    }

    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};
