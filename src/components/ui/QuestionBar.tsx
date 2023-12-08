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
      <div className="p-1 font-neo w-[95%] h-full rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center">
        <div>🔒 {questionItem.question}</div>
      </div>
    );
  }

  if (questionItem.answerCount === 1) {
    return (
      <>
        <div className="p-1 font-neo w-[95%] h-full rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center">
          <div>🔒 {questionItem.question}</div>
        </div>
        {questionItem.isMyAnswer ? (
          <>내 버블(답변을 두 사람 모두 등록해야 확인할 수 있어요)</>
        ) : (
          <>상대 버블(답변을 두 사람 모두 등록해야 확인할 수 있어요)</>
        )}
      </>
    );
  }

  if (questionItem.answerCount === 2) {
    return (
      <>
        <div className="p-1 font-neo w-[95%] h-full  rounded-md border-solid border-2 border-[#FF6666]  bg-[#FFE8E8] flex items-center">
          🔑 {questionItem.question}
        </div>
        {questionItem.answers?.map((answer, answerIndex) => (
          <div key={answerIndex}>{answer.answer}</div>
        ))}
      </>
    );
  }
};

export default QuestionBar;
