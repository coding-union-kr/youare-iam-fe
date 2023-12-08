import BottomNavigation from '@/components/layout/BottomNavigation';
import QuestionBar from '@/components/ui/QuestionBar';

const dummyQuestions = [
  {
    isRegisterQuestion: false,
    selectQuestionId: 1,
    question: '상대방을 사랑하는 마음을 수치로 표현하면?',
    createdAt: 231223,
    answerCount: 1,
    isMyAnswer: false,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 2,
    question:
      '같이 해보고 싶은 버킷리스트가 있나요? 레이아웃체크를위한더미텍스트 레이아웃체크를위한더미텍스트',
    createdAt: 231225,
    answerCount: 1,
    isMyAnswer: true,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 3,
    question:
      '다툼이 생겼을 때 절대 안 했으면 하는 것이 있다면 무엇인가요? 레이아웃체크를위한더미텍스트 레이아웃체크를위한더미텍스트',
    createdAt: 231226,
    answerCount: 2,
    answer: [
      {
        memberId: 1,
        memberName: '이몽룡',
        answer: '소리지르기',
        createdAt: 231226,
      },
      {
        memberId: 2,
        memberName: '성춘향',
        answer: '잠수타기',
        createdAt: 231226,
      },
    ],
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question:
      '저를 만나는 이유가 뭔가요? 레이아웃체크를위한더미텍스트 레이아웃체크를위한더미텍스트',
    createdAt: 231227,
    answerCount: 0,
  },
];

type QuestionItemType = {
  selectQuestionId: number;
  question: string;
  createdAt: number;
  answerCount: number;
  isMyAnswer?: boolean;
  isRegisterQuestion: boolean;
  answers?: {
    memberId: number;
    memberName: string;
    answer: string;
    createdAt: number;
  }[];
};

export default function Page() {
  return (
    <>
      {dummyQuestions.map((questionItem: QuestionItemType, index: number) => {
        return <QuestionBar key={index} questionItem={questionItem} />;
      })}
      <BottomNavigation />
    </>
  );
}
