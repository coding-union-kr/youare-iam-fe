import Button from '../ui/Button';

type ErrorFallbackProp = {
  resetErrorBoundary: (...args: any[]) => void;
};

const ErrorFallback = ({ resetErrorBoundary }: ErrorFallbackProp) => {
  return (
    <section>
      <div className="h-screen flex flex-col items-center pt-20">
        <div className="font-neo text-lg mb-4">에러가 발생했어요! </div>
        <Button
          variant="secondary"
          size="normal"
          onClick={resetErrorBoundary}
          font-neo
        >
          다시 시도하기
        </Button>
      </div>
    </section>
  );
};

export default ErrorFallback;
