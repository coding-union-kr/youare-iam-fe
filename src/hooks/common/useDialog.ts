import { type Dispatch, useState, type SetStateAction } from 'react';

type ReturnType = {
  isOpen: boolean;
  closeDialog: () => void;
  openDialog: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const useDialog = (): ReturnType => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return { isOpen, closeDialog, openDialog, setIsOpen };
};

export default useDialog;
