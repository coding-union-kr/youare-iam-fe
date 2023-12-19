import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { post } from '@/libs/api';

type OnboardingData = {
  questionId: number;
  answer: string;
};

type OnboardingResponse = {
  linkKey: string;
  question: string;
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
