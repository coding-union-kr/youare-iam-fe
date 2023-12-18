type QuestinTitleProps = {
  question: string;
};

export default function QuestionTitle({ question }: QuestinTitleProps) {
  return (
    <div className="flex justify-between mx-auto mt-10 w-[90%] border-b-4 border-primary">
      <span className="text-4xl text-primary">&quot;</span>
      <p className="p-5 text-lg text-center font-neo">{question}</p>
      <span className="text-4xl text-primary">&quot;</span>
    </div>
  );
}
