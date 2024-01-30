import { useRecoilValue } from 'recoil';
import { myIdState } from '@/store/myIdState';
import { applyDateFormatting } from '@/util/applyDateFormatting';

type ChatBubbleProps = {
  answer: {
    memberId: string;
    memberName: string;
    answer: string;
    createdAt: string;
  }[];
};

const ChatBubble = ({ answer }: ChatBubbleProps) => {
  const myId = useRecoilValue(myIdState);

  const myAnswer = answer.find((answer) => answer.memberId === myId);
  const otherAnswer = answer.find((answer) => answer.memberId !== myId);

  return (
    <>
      <div className="chat chat-start">
        <div className="chat-bubble bg-[#ffffff] text-neutral-500 flex items-center">
          {otherAnswer?.answer}
        </div>
        {otherAnswer && (
          <div className="chat-footer opacity-50">
            {applyDateFormatting(otherAnswer.createdAt)}
          </div>
        )}
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble bg-[#FEB2B2] text-neutral-500 flex items-center">
          {myAnswer?.answer}
        </div>
        {myAnswer && (
          <div className="chat-footer opacity-50">
            {applyDateFormatting(myAnswer.createdAt)}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBubble;
