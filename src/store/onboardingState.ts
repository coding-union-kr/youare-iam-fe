import { atom } from 'recoil';

export const initialOnboardingState = {
  quetionId: 0,
  answer: '',
};

export const onboardingState = atom({
  key: 'onboardingState',
  default: initialOnboardingState,
});
