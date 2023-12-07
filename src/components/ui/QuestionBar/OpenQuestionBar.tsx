type QuestionItemType = {
  selectQuestionId: number;
  question: string;
  createdAt: number;
  answerCount: number;
  isMyAnswer?: boolean;
  isRegisterQuestion: boolean;
  answers?: {
    memberId: number;
    memberName: string;
    answer: string;
    createdAt: number;
  }[];
};

type OpenQuestionBarProps = {
  questionItem: QuestionItemType;
};

const OpenQuestionBar = ({ questionItem }: OpenQuestionBarProps) => {
  return (
    <>
      <div>🔑 {questionItem.question}</div>
      {questionItem.answers?.map((answer, answerIndex) => (
        <div key={answerIndex}>{answer.answer}</div>
      ))}
    </>
  );
};

export default OpenQuestionBar;
