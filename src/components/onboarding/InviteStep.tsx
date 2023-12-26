import { useRecoilState } from 'recoil';
import Button from '@/components/ui/Button';
import {
  initialOnboardingState,
  onboardingState,
} from '@/store/onboardingState';
import { useCreateInviteKey } from '@/hooks/feature/useCreateInviteKey';
import LockIcon from '../icons/LockIcon';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const TEMPLATE_ID = 102113;

export default function InviteStep() {
  const router = useRouter();
  const [onboardingData, setOnboardingData] = useRecoilState(onboardingState);
  const { mutate: createInviteKey } = useCreateInviteKey();

  const handleInvite = () => {
    createInviteKey(
      {
        questionId: onboardingData.selectedQuestion.questionId,
        answer: onboardingData.answer,
      },
      {
        onSuccess: ({ data }) => {
          console.log(data);

          window.Kakao.Share.sendCustom({
            templateId: TEMPLATE_ID,
            templateArgs: {
              question: onboardingData.selectedQuestion.question,
              invitedPersonName: data.invitedPersonName,
              linkKey: data.linkKey,
            },
          });
          router.push('/chatroom');
          setOnboardingData(initialOnboardingState);
        },
        onError: (error) => {
          throw error;
        },
      }
    );
  };

  return (
    <>
      <section className="w-full">
        <motion.div
          className="p-2 pl-4 font-neo rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0, duration: 1.5 }}
        >
          <LockIcon />
          <p className="pl-3">{onboardingData.selectedQuestion.question}</p>
        </motion.div>

        <motion.article
          className="p-5 mx-auto mt-10 text-center rounded-md bg-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          <h1 className="text-xl font-bold">
            이제 대화방에 첫 질문이 추가되었습니다!
          </h1>
          <div className="mt-5 text-gray-400">
            <p>초대링크를 전송하면 상대방이 당신의 질문에 답변할 수 있어요.</p>
            <p>
              두 사람의 답변이 완료되면 질문에 대한 서로의 답변을 확인할 수
              있어요.
            </p>
          </div>
        </motion.article>
      </section>
      <Button variant="primary" size="wide" onClick={handleInvite}>
        초대링크 전송하기
      </Button>
    </>
  );
}
