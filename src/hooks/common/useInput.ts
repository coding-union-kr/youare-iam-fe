import {
  type ChangeEventHandler,
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

type ReturnType = [
  string,
  ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  string,
  Dispatch<SetStateAction<string>>,
];

type Validator = (value: string) => string;

export const validateAnswer: Validator = (answer: string) => {
  if (!answer.trim()) {
    return '답변을 입력해주세요';
  } else if (answer.length > 1000) {
    return '답변은 최대 1000자까지 입력 가능합니다';
  }

  return '';
};

const useInput = (
  initialValue: string,
  validator = validateAnswer
): ReturnType => {
  const [state, setState] = useState(initialValue);
  const [error, setError] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =
    useCallback(
      ({ target }) => {
        const { value } = target;
        setState(value);

        const error = validator(value);
        setError(error);
      },
      [validator]
    );

  return [state, onChange, error, setState];
};

export default useInput;
