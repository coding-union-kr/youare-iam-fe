import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
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

const Page: NextPageWithLayout = () => {
  return (
    <div>
      {dummyQuestionList.map((question) => (
        <div
          key={question.questionId}
          className="flex flex-col items-center justify-center"
        >
          <ListItem question={question.question} />
        </div>
      ))}
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
