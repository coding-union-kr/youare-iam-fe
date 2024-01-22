export interface ErrorResponse {
  code: string;
  status: number;
  message: string;
}

export type Question = {
  questionId: number;
  question: string;
};
