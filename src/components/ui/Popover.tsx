import Dialog from './Dialog';

type Props = {
  isOpen: boolean;
  closePopover: () => void;
  children: React.ReactNode;
};
export default function Popover({ isOpen, closePopover, children }: Props) {
  return (
    <Dialog isOpen={isOpen} closeDialog={closePopover}>
      {children}
    </Dialog>
  );
}
