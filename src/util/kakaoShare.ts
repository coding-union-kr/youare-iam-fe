import { BASE_URL } from '@/constants/baseUrl';

const TEMPLATE_ID = 103829;

export const kakaoShare = (question: string, questionId: number) => {
  window.Kakao.Share.sendCustom({
    templateId: TEMPLATE_ID,
    templateArgs: {
      question,
      questionId,
      domain: BASE_URL,
    },
  });
};
