import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const initialOnboardingState = {
  selectedQuestion: {
    questionId: 0,
    question: '',
  },
  answer: '',
};

export const onboardingState = atom<typeof initialOnboardingState>({
  key: 'onboardingState',
  default: initialOnboardingState,
  effects_UNSTABLE: [persistAtom],
});
