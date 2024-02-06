import { useState, useEffect } from 'react';
import { type RecoilState, useRecoilState } from 'recoil';

export function useRecoilStateSSR<T>(
  recoilState: RecoilState<T>,
  defaultValue: T
) {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(recoilState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultValue : value, setValue] as const;
}
