type ListItemProps = {
  question: string;
  className?: string;
  onClick?: () => void;
};

const ListItem = ({ question, className, onClick }: ListItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col justify-center border-2 border-[black] rounded-lg bg-secondary h-20 w-[90%] m-1 p-2 ${className}`}
    >
      {question}
    </div>
  );
};

export default ListItem;
