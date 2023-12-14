import Button from '../ui/Button';
import type { OnboardingStepPros } from './Intro';
import TextArea from '../ui/TextArea';
import useInput from '../hooks/common/useInput';
import ListItem from '../ui/ListItem';

export default function AnswerStep({ onNext }: OnboardingStepPros) {
  const [answer, onChange] = useInput('');

  const handleComplete = () => {
    //Todo: 답변 등록하기 기능 구현
    console.log(answer);

    onNext();
  };

  return (
    <>
      <ListItem question="" />
      <p>내가 먼저 답변을 작성해볼까요?</p>
      <TextArea value={answer} onChange={onChange} />
      <Button variant="primary" size="wide" onClick={handleComplete}>
        답변 등록하기
      </Button>
    </>
  );
}
