import BottomNavigation from '@/components/layout/BottomNavigation';
import ListItem from '@/components/ui/ListItem';

const dummyQuestionList = [
  {
    questionId: 1,
    question: '같이 해보고 싶은 버킷리스트가 있나요?',
  },
  {
    questionId: 2,
    question: '다툼이 생겼을 때 절대 안 했으면 하는 것이 있다면 무엇인가요?',
  },
];

export default function Page() {
  return (
    <div>
      {dummyQuestionList.map((question) => (
        <div
          key={question.questionId}
          className="flex flex-col justify-center items-center"
        >
          <ListItem question={question.question} />
        </div>
      ))}
      <BottomNavigation />
    </div>
  );
}
