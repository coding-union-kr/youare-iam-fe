import { GetServerSidePropsContext } from 'next';
import { createServerSideInstance, fetchData } from '@/libs/serversideApi';
import type { UserData, UserStatus } from '@/types/api';

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
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};
