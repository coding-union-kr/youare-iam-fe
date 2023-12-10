import { ComponentProps, useRef, useEffect } from 'react';

type ModalProps = {
  modalInfo: {
    actionText: string;
    cancelText: string;
    bodyText: string;
    handleAction: () => void;
  };
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

export default function Modal({
  modalInfo,
  isModalOpen,
  setIsModalOpen,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleActionClick = () => {
    modalInfo.handleAction();
    handleClose();
  };

  useEffect(() => {
    isModalOpen ? modalRef.current?.showModal() : modalRef.current?.close();
  });

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <p className="py-4">{modalInfo.bodyText}</p>
          <div className="flex flex-row justify-between">
            <button className="btn w-28 btn-secondary" onClick={handleClose}>
              {modalInfo.cancelText}
            </button>
            <button
              className="btn w-28 btn-primary"
              onClick={handleActionClick}
            >
              {modalInfo.actionText}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
