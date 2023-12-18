import axios from 'axios';
import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import ListItem from '@/components/ui/ListItem';
import { useRouter } from 'next/router';

const mockServerURL = 'http://218.239.180.88:8080';
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
  const router = useRouter();

  const handleItemClick = async (questionId: Question['questionId']) => {
    // console.log(questionId);
    try {
      // POST 요청으로 questionId를 보내기
      const postResponse = await axios.post(apiEndpoint, {
        questionId: questionId,
      });

      // 응답으로 받은 selectedQuestionId를 가져오기
      const selectedQuestionId = postResponse.data.selectedQuestionId;
      // console.log(selectedQuestionId);

      const targetPath = '/chatroom';
      // selectedQuestionId가 있는 위치로 이동하기
      // 위치 만들기
      router.push({
        pathname: targetPath,
        // 답변 수정, 답변 등록 페이지에는 selectQuestionId가 들어가야 함.
        // 질문 선택 페이지에는 마지막 selectQuestionsId가 들어가야 함.
        // hash: '0',
      });
    } catch (error) {
      console.error('Error fetching data:', (error as Error).message);
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

export const getStaticProps = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    const questions = response.data;
    console.log('questions', questions);
    return { props: { questions } };
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return { props: { questions: [] } };
  }
};

export default Page;
