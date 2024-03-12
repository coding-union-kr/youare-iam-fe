import Dialog from '../ui/Dialog';

export type ModalInfo = {
  actionText: string;
  cancelText: string;
  bodyText: string;
  handleAction: () => void;
};

type ModalProps = {
  modalInfo: ModalInfo;
  isModalOpen: boolean;
  closeModal: () => void;
};

export default function Modal({
  modalInfo,
  isModalOpen,
  closeModal,
}: ModalProps) {
  const handleActionClick = () => {
    modalInfo.handleAction();
    closeModal();
  };

  return (
    <Dialog isOpen={isModalOpen} closeDialog={closeModal}>
      <p
        className="py-4 text-center"
        dangerouslySetInnerHTML={{ __html: modalInfo.bodyText }}
      ></p>
      <div className="flex flex-row justify-between">
        <button className="btn w-28 btn-secondary" onClick={closeModal}>
          {modalInfo.cancelText}
        </button>
        <button className="btn w-28 btn-primary" onClick={handleActionClick}>
          {modalInfo.actionText}
        </button>
      </div>
    </Dialog>
  );
}
