type ChatBubbleProps = {
  answer: {
    memberId: number;
    memberName: string;
    answer: string;
    createdAt: number;
  }[];
};

const ChatBubble = ({ answer }: ChatBubbleProps) => {
  return (
    <>
      <div className="chat chat-start">
        <div className="chat-bubble bg-[#ffffff]">{answer[0].answer}</div>
        <div className="chat-footer opacity-50">{answer[0].createdAt}</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble bg-[#FEB2B2]">{answer[1].answer}</div>
        <div className="chat-footer opacity-50">{answer[1].createdAt}</div>
      </div>
    </>
  );
};

export default ChatBubble;
