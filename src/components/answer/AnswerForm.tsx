import Button from '../ui/Button';
import TextArea from '../ui/TextArea';

type AnswerFormProps = {
  answer: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage: string;
  handleSubmit: (e: React.FormEvent) => void;
};

export default function AnswerForm({
  answer,
  onChange,
  errorMessage,
  handleSubmit,
}: AnswerFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between w-full h-[70%]"
    >
      <div className="relative">
        <TextArea value={answer} onChange={onChange} />
        {errorMessage && (
          <p className="absolute text-xs bottom-[-20px] right-10 text-accent">
            {errorMessage}
          </p>
        )}
      </div>
      <Button variant="primary" size="wide">
        답변 등록하기
      </Button>
    </form>
  );
}
