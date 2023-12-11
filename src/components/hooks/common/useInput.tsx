import { type ChangeEventHandler, useCallback, useState } from 'react';

type ReturnType = [
  string,
  ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
];

const useInput = (initialValue = ''): ReturnType => {
  const [state, setState] = useState(initialValue);

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =
    useCallback(({ target }) => {
      const { value } = target;
      setState(value);
    }, []);

  return [state, onChange];
};

export default useInput;
