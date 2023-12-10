type ListItemProps = {
  question: string;
};

const ListItem = ({ question }: ListItemProps) => {
  return (
    <div className="flex flex-col justify-center border-2 border-[black] rounded-lg bg-secondary h-20 w-[80%] m-1 p-2">
      {question}
    </div>
  );
};

export default ListItem;
