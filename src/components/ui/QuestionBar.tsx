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

const QuestionBar = ({ questionItem }: QuestionItemType) => {
  if (questionItem.answerCount === 0) {
    return (
      <div className="p-1 font-neo w-[95%] h-8  rounded-md border-solid border-2 border-#4F4F4F bg-[#E7E7E7] flex items-center">
        <div>🔒 {questionItem.question}</div>
      </div>
    );
  }

  if (questionItem.answerCount === 2) {
    return (
      <>
        <div>🔑 {questionItem.question}</div>
        {questionItem.answers?.map((answer, answerIndex) => (
          <div key={answerIndex}>{answer.answer}</div>
        ))}
      </>
    );
  }
};

export default QuestionBar;
