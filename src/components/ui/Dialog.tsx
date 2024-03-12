import { useEffect, useRef } from 'react';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  children: React.ReactNode;
};

export default function Dialog({ isOpen, closeDialog, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    isOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
  });

  return (
    <>
      {isOpen && (
        <dialog ref={dialogRef} className="modal">
          <div className="modal-box w-80">{children}</div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeDialog}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}
