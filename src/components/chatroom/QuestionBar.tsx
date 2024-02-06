import ChatBubble from './ChatBubble';
import OpenIcon from '../icons/OpenIcon';
import LockIcon from '../icons/LockIcon';
import { applyDateFormatting } from '@/util/applyDateFormatting';

type LetterType = {
  selectQuestionId: number;
  question: string;
  createdAt: string;
  answerCount: number;
  myAnswer?: boolean;
  answer:
    | {
        memberId: string;
        memberName: string;
        answer: string;
        createdAt: string;
      }[]
    | null;
};

type letterProps = {
  letter: LetterType;
  onClick: () => void;
};

const QuestionBar = ({ onClick, letter }: letterProps) => {
  const date = applyDateFormatting(letter.createdAt);
  if (letter.answerCount === 0) {
    return (
      <div
        id={letter.selectQuestionId.toString()}
        onClick={onClick}
        className=" m-2 p-2 font-neo  h-full rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center"
      >
        <div className="pl-1  pr-2">
          <LockIcon />
        </div>
        <div>{letter.question}</div>
      </div>
    );
  }

  if (letter.answerCount === 1) {
    return (
      <div
        onClick={onClick}
        className="m-2"
        id={letter.selectQuestionId.toString()}
      >
        <div className="p-2 font-neo  h-full rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center">
          <div className="pl-1 pr-2">
            <LockIcon />
          </div>
          <div>{letter.question}</div>
        </div>
        {letter.myAnswer ? (
          <>
            <div className="relative">
              <div className="font-neo text-sm absolute top-4 left-[15%] w-[90%] h-full z-10 text-gray-dark">
                두 사람 모두 등록해야 확인할 수 있어요.
              </div>
            </div>
            <div className="chat chat-end bg-blend-multiply">
              <div className="chat-bubble bg-[#FEB2B2] px-24"></div>
              <div className="chat-footer opacity-50">{date}</div>
            </div>
          </>
        ) : (
          <>
            <div className="relative" id={letter.selectQuestionId.toString()}>
              <div className="font-neo text-sm absolute top-4 left-[15%] w-[90%] h-full z-10 text-gray-dark">
                두 사람 모두 등록해야 확인할 수 있어요.
              </div>
              <div className="chat chat-start">
                <div className="chat-bubble bg-[#ffffff] px-24"></div>
                <div className="chat-footer opacity-50">{date}</div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  if (letter.answerCount === 2) {
    return (
      <div
        onClick={onClick}
        className="m-2"
        id={letter.selectQuestionId.toString()}
      >
        <div className="p-2 font-neo h-full  rounded-md border-solid border-2 border-[#FF6666]  bg-[#FFE8E8] flex items-center">
          <div className="pl-1  pr-2">
            <OpenIcon />
          </div>
          <div>{letter.question}</div>
        </div>
        <ChatBubble answer={letter.answer || []} />
      </div>
    );
  }
};

export default QuestionBar;
