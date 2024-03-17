type ListItemProps = {
  question: string;
  className?: string;
};

const ListItem = ({ question, className }: ListItemProps) => {
  return (
    <div
      className={`flex flex-col justify-center border-2 border-[black] rounded-lg bg-secondary h-20 w-[90%] m-1 p-2 ${className}`}
    >
      {question}
    </div>
  );
};

export default ListItem;
