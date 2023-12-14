import axios from 'axios';
import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import ListItem from '@/components/ui/ListItem';

const mockServerURL =
  'https://cc7831bd-6881-44ff-9534-f344d05bc5ad.mock.pstmn.io';
const path = '/api/v1/questions';
const apiEndpoint = `${mockServerURL}${path}`;

type Questions = {
  questions: Question[];
};

type Question = {
  questionId: number;
  question: string;
};

const Page: NextPageWithLayout<Questions> = ({ questions }) => {
  return (
    <div className="py-20">
      {questions.map((question) => (
        <div
          key={question.questionId}
          className="flex flex-col justify-center items-center"
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

export const getStaticProps = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    const questions = response.data;

    return { props: { questions } };
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return { props: { questions: [] } };
  }
};

export default Page;
