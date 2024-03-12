import Dialog from '../ui/Dialog';

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
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleActionClick = () => {
    modalInfo.handleAction();
    handleClose();
  };

  return (
    <Dialog isOpen={isModalOpen} closeDialog={handleClose}>
      <p
        className="py-4 text-center"
        dangerouslySetInnerHTML={{ __html: modalInfo.bodyText }}
      ></p>
      <div className="flex flex-row justify-between">
        <button className="btn w-28 btn-secondary" onClick={handleClose}>
          {modalInfo.cancelText}
        </button>
        <button className="btn w-28 btn-primary" onClick={handleActionClick}>
          {modalInfo.actionText}
        </button>
      </div>
    </Dialog>
  );
}
