import { atom } from 'recoil';

export const initialOnboardingState = {
  selectedQuestion: {
    questionId: 0,
    question: '',
  },
  answer: '',
};

export const onboardingState = atom({
  key: 'onboardingState',
  default: initialOnboardingState,
});
