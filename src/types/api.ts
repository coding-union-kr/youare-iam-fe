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
