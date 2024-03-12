import type { Letter } from '@/types/api';
import ChatBubble from './ChatBubble';
import OpenIcon from '../icons/OpenIcon';

type Props = {
  letter: Letter;
};

const UnlockedQuestionBar = ({ letter }: Props) => {
  return (
    <div className="m-2" id={letter.selectQuestionId.toString()}>
      <div className="p-2 font-neo h-full  rounded-md border-solid border-2 border-[#FF6666]  bg-[#FFE8E8] flex items-center">
        <div className="pl-1 pr-2">
          <OpenIcon />
        </div>
        <div>{letter.question}</div>
      </div>
      <ChatBubble answer={letter.answer || []} />
    </div>
  );
};

export default UnlockedQuestionBar;
