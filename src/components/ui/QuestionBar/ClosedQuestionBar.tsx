type QuestionType = {
  question: string;
};

const ClosedQuestionBar = ({ question }: QuestionType) => {
  return (
    <div className="p-1 font-neo w-[95%] h-8  rounded-md border-solid border-2 border-#4F4F4F bg-[#E7E7E7] flex items-center">
      <div>🔒 {question}</div>
    </div>
  );
};

export default ClosedQuestionBar;
