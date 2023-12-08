import ChatBubble from './ChatBubble';

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
      <div className=" m-2 p-2 font-neo  h-full rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center">
        <div className="pl-1  pr-2">🔒</div>
        <div>{questionItem.question}</div>
      </div>
    );
  }

  if (questionItem.answerCount === 1) {
    return (
      <div className="m-2">
        <div className="p-2 font-neo  h-full rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center">
          <div className="pl-1 pr-2">🔒</div>
          <div>{questionItem.question}</div>
        </div>
        {questionItem.isMyAnswer ? (
          <div className="chat chat-end">
            <div className="chat-bubble bg-[#FEB2B2]">
              답변을 두 사람 모두 등록해야 확인할 수 있어요.
            </div>
            <div className="chat-footer opacity-50">
              {questionItem.createdAt}
            </div>
          </div>
        ) : (
          <div className="chat chat-start">
            <div className="chat-bubble bg-[#ffffff]">
              답변을 두 사람 모두 등록해야 확인할 수 있어요.
            </div>
            <div className="chat-footer opacity-50">
              {questionItem.createdAt}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (questionItem.answerCount === 2) {
    return (
      <div className="m-2">
        <div className="p-2 font-neo h-full  rounded-md border-solid border-2 border-[#FF6666]  bg-[#FFE8E8] flex items-center">
          <div className="pl-1  pr-2">🔑</div>
          <div>{questionItem.question}</div>
        </div>
        <ChatBubble answer={questionItem.answer} />
      </div>
    );
  }
};

export default QuestionBar;
