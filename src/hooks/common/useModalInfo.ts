import { useState } from 'react';

type ModalInfo = {
  actionText: string;
  cancelText: string;
  bodyText: string;
  handleAction: () => void;
};

type ReturnType = [ModalInfo, (modalInfo: ModalInfo) => void];

const useModalInfo = (): ReturnType => {
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    actionText: '',
    cancelText: '',
    bodyText: '',
    handleAction: () => {},
  });

  return [modalInfo, setModalInfo];
};

export default useModalInfo;
