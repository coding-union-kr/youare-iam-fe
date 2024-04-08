import Period from '../icons/EnvelopeIcon';
import Answer from '../icons/CheckMarkIcon';

type CardProps = {
  icon: 'period' | 'answer';
  children: React.ReactNode;
};

const ICON_MAP = {
  period: Period,
  answer: Answer,
};
function Card({ icon, children }: CardProps) {
  const IconComponent = ICON_MAP[icon];

  return (
    <div className="flex flex-col items-center w-40 gap-3 p-6 bg-white rounded-md shadow-sm bg-opacity-90">
      <IconComponent />
      <div className="text-xs ">{children}</div>
    </div>
  );
}

type StatisticsCardProps = {
  periodOfUse: number;
  perfectAnswer: number;
};

export default function StatisticsCard({
  periodOfUse,
  perfectAnswer,
}: StatisticsCardProps) {
  return (
    <div className="flex justify-center w-full gap-10 mt-8 text-center">
      <Card icon="period">
        <p>
          우리가 편지를 <br />
          주고 받은 지
        </p>
        <p className="mt-1 text-base font-bold">{periodOfUse}일</p>
      </Card>
      <Card icon="answer">
        <p>
          둘 다 답변을
          <br /> 완료한 질문
        </p>
        <p className="mt-1 text-base">{perfectAnswer}개</p>
      </Card>
    </div>
  );
}
