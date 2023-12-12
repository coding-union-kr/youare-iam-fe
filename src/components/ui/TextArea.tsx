import type { ComponentProps } from 'react';

type TextAreaProps = ComponentProps<'textarea'> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

export default function TextArea({
  value,
  onChange,
  className,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      className={`block w-[90%] mx-auto min-h-[20rem] textarea rounded-xl border-1 border-gray-dark text-base ${className}`}
      value={value}
      onChange={onChange}
      {...props}
    ></textarea>
  );
}
