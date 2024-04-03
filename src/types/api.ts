export interface ErrorResponse {
  code: string;
  status: number;
  message: string;
}

export type Question = {
  questionId: number;
  question: string;
};

export type UserStatus =
  | 'COUPLE_USER'
  | 'COUPLE_WAITING_USER'
  | 'NON_COUPLE_USER';

export type UserData = {
  userStatus: UserStatus;
  linkKey: string;
};

export type Answer = {
  selectQuestionId: number;
  answer: string;
};

export type Letter = {
  selectQuestionId: number;
  question: string;
  createdAt: string;
  answerCount: number;
  myAnswer: boolean;
  answer:
    | {
        memberId: string;
        memberName: string;
        answer: string;
        createdAt: string;
      }[]
    | null;
};

export type WaitingQuestion = {
  selectedQuestionId: number;
  question: string;
  createdAt: string;
};

export type MyInfo = {
  memberId: number;
  waitingAnswerList: WaitingQuestion[];
  periodOfUse: number;
  perfectAnswer: number;
};
