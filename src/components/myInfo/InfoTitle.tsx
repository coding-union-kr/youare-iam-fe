type Props = {
  children: React.ReactNode;
};

export default function InfoTitle({ children }: Props) {
  return <h2 className="mt-5 mb-3 text-lg font-bold">{children}</h2>;
}
