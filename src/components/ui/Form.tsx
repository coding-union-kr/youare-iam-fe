import { cn } from '@/util/cn';
import Button from './Button';
import TextArea from './TextArea';

type FormProps = {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage: string;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  textAreaSize?: string;
  label?: string;
  formSize?: string;
};

export default function Form({
  inputValue,
  onChange,
  errorMessage,
  handleSubmit,
  isLoading,
  textAreaSize,
  label = '답변 등록하기',
  formSize = 'h-[70%]',
}: FormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-col justify-between', formSize)}
    >
      <div className="relative">
        <TextArea
          value={inputValue}
          onChange={onChange}
          className={textAreaSize}
        />
        {errorMessage && (
          <p className="absolute text-xs bottom-[-20px] right-10 text-accent">
            {errorMessage}
          </p>
        )}
      </div>
      <Button
        variant="primary"
        size="wide"
        disabled={!inputValue.trim() || !!errorMessage}
        isLoading={isLoading}
      >
        {label}
      </Button>
    </form>
  );
}
