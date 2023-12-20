import { type ChangeEventHandler, useCallback, useState } from 'react';

type ReturnType = [
  string,
  ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  string,
];

const useInput = (
  initialValue = '',
  validator = (value: string) => '',
  onChangeCallback = (value: string) => {}
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

        onChangeCallback(value);
      },
      [validator, onChangeCallback]
    );

  return [state, onChange, error];
};

export default useInput;
