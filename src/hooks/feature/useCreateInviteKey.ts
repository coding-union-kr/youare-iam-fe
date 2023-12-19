import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { post } from '@/libs/api';

type OnboardingData = {
  questionId: number;
  answer: string;
};

// Todo: mutationFn response 타입을 이렇게 적용하는게 맞는지 확인 필요!
type OnboardingResponse = {
  data: {
    linkKey: string;
    question: string;
  };
};

export const useCreateInviteKey = (
  options?: UseMutationOptions<OnboardingResponse, unknown, OnboardingData>
) => {
  return useMutation<OnboardingResponse, unknown, OnboardingData>({
    mutationFn: (data: OnboardingData) =>
      post('/api/v1/members/invite/link', data),
    ...options,
  });
};
