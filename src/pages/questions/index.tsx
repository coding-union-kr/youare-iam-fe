import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import ListItem from '@/components/ui/ListItem';
import { useRouter } from 'next/router';
import { get, post } from '@/libs/api';

type Questions = {
  questions: Question[];
};

type Question = {
  questionId: number;
  question: string;
};

const Page: NextPageWithLayout<Questions> = ({ questions }) => {
  const router = useRouter();

  const handleItemClick = async (questionId: Question['questionId']) => {
    try {
      await post('/api/v1/questions', {
        questionId: questionId,
      });
      router.push('/chatroom');
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="py-20">
      {questions.map((question) => (
        <div
          key={question.questionId}
          className="flex flex-col justify-center items-center"
        >
          <ListItem
            question={question.question}
            onClick={() => handleItemClick(question.questionId)}
          />
        </div>
      ))}
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps = async () => {
  try {
    const response = await get('/api/v1/questions');
    const questions = response.data;
    console.log('questions', questions);
    return { props: { questions } };
  } catch (error) {
    console.error('Error fetching data questions:', (error as Error).message);
    return { props: { questions: [] } };
  }
};

export default Page;
