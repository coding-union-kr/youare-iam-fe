import { ComponentProps, useRef } from 'react';

// Modal 컴포넌트 사용 예시
// <Modal width="w-80" actionText="답변 작성하러 가기" handleAction={이벤트핸들러} cancelText="되돌아가기">아직 답변을 등록하지 않았어요.</Modal>

type ModalProps = ComponentProps<'div'> & {
  actionText: string;
  cancelText: string;
  width: string;
  handleAction: () => void;
};

export default function Modal({
  width,
  actionText,
  cancelText,
  handleAction,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleModalClose = () => {
    modalRef.current?.close();
  };

  const handleModalOpen = () => {
    modalRef.current?.showModal();
  };

  return (
    <>
      <div className="w-full h-full bg-secondary" onClick={handleModalOpen}>
        🔒 질문
      </div>
      <dialog ref={modalRef} className="modal">
        <div className={`modal-box ${width}`}>
          <p className="py-4">{children}</p>
          <div className="flex flex-row justify-between">
            <button
              className="btn w-28 btn-secondary"
              onClick={handleModalClose}
            >
              {cancelText}
            </button>
            <button className="btn w-28 btn-primary" onClick={handleAction}>
              {actionText}
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
