import { ChangeEvent, ComponentProps } from 'react';

type TextInputProps = ComponentProps<'input'> & {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
  value,
  onChange,
  className,
  ...props
}: TextInputProps) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <input
        className={`input w-[90%] rounded-xl border-1 border-[black] m-2 ${className}`}
        type="text"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default TextInput;
