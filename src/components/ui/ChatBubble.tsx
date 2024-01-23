import { useRecoilValue } from 'recoil';
import { myIdState } from '@/store/myIdState';

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
        <div className="chat-bubble bg-[#ffffff] text-neutral-500">
          {otherAnswer?.answer}
        </div>
        <div className="chat-footer opacity-50 ">{otherAnswer?.createdAt}</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble bg-[#FEB2B2] text-neutral-500">
          {myAnswer?.answer}
        </div>
        <div className="chat-footer opacity-50">{myAnswer?.createdAt}</div>
      </div>
    </>
  );
};

export default ChatBubble;
