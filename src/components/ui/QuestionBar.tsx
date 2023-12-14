import ChatBubble from './ChatBubble';
import OpenIcon from '../icons/OpenIcon';
import LockIcon from '../icons/LockIcon';

type QuestionItemType = {
  selectQuestionId: number;
  question: string;
  createdAt: number;
  answerCount: number;
  isMyAnswer?: boolean;
  isRegisterQuestion: boolean;
  answer?: {
    memberId: number;
    memberName: string;
    answer: string;
    createdAt: number;
  }[];
};

type QuestionItemProps = {
  questionItem: QuestionItemType;
  onClick: () => void;
};

const QuestionBar = ({ onClick, questionItem }: QuestionItemProps) => {
  if (questionItem.answerCount === 0) {
    return (
      <div
        id={questionItem.selectQuestionId.toString()}
        onClick={onClick}
        className=" m-2 p-2 font-neo  h-full rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center"
      >
        <div className="pl-1  pr-2">
          <LockIcon />
        </div>
        <div>{questionItem.question}</div>
      </div>
    );
  }

  if (questionItem.answerCount === 1) {
    return (
      <div
        onClick={onClick}
        className="m-2"
        id={questionItem.selectQuestionId.toString()}
      >
        <div className="p-2 font-neo  h-full rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center">
          <div className="pl-1 pr-2">
            <LockIcon />
          </div>
          <div>{questionItem.question}</div>
        </div>
        {questionItem.isMyAnswer ? (
          <>
            <div className="relative">
              <div className="absolute top-4 left-[25%] w-full h-full z-10 text-gray-dark">
                답변을 두 사람 모두 등록해야 확인할 수 있어요
              </div>
            </div>
            <div className="chat chat-end bg-blend-multiply">
              <div className="chat-bubble bg-[#FEB2B2] px-24"></div>
              <div className="chat-footer opacity-50">
                {questionItem.createdAt}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="relative"
              id={questionItem.selectQuestionId.toString()}
            >
              <div className="absolute top-4 left-[25%] w-full h-full z-10 text-gray-dark">
                답변을 두 사람 모두 등록해야 확인할 수 있어요
              </div>
              <div className="chat chat-start">
                <div className="chat-bubble bg-[#ffffff] px-24"></div>
                <div className="chat-footer opacity-50">
                  {questionItem.createdAt}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  if (questionItem.answerCount === 2) {
    return (
      <div
        onClick={onClick}
        className="m-2"
        id={questionItem.selectQuestionId.toString()}
      >
        <div className="p-2 font-neo h-full  rounded-md border-solid border-2 border-[#FF6666]  bg-[#FFE8E8] flex items-center">
          <div className="pl-1  pr-2">
            <OpenIcon />
          </div>
          <div>{questionItem.question}</div>
        </div>
        <ChatBubble answer={questionItem.answer || []} />
      </div>
    );
  }
};

export default QuestionBar;
