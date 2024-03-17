import { type Dispatch, useState, type SetStateAction } from 'react';

type ReturnType = [isOpen: boolean, toggle: () => void];

const useDialog = (): ReturnType => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return [isOpen, toggle];
};

export default useDialog;
