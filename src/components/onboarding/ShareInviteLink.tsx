import { CopyToClipboard } from 'react-copy-to-clipboard';
import { showToastSuccessMessage } from '@/util/toast';
import { BASE_URL } from '@/constants/baseUrl';
import Button from '../ui/Button';
import KakaoIcon from '../icons/KakaoIcon';
import { kakaoStyle } from '../ui/KakaoLoginButton';
import useInvitationInfo from '@/hooks/queries/useInvitationInfo';
import LockIcon from '../icons/LockIcon';
import NotificationCard from './NotificationCard';

const TEMPLATE_ID = 102113;

type Props = {
  linkKey: string;
};

export default function ShareInviteLink({ linkKey }: Props) {
  const { info, isError } = useInvitationInfo(linkKey);

  const shareInviteLink = () => {
    window.Kakao.Share.sendCustom({
      templateId: TEMPLATE_ID,
      templateArgs: {
        question: info.question,
        invitedPersonName: info.invitedPersonName,
        linkKey,
        domain: BASE_URL,
      },
    });
  };

  if (isError) {
    return <div>초대링크를 불러오는데 실패했습니다.</div>;
  }

  return (
    <section className="flex flex-col justify-between h-[80dvh] mt-4">
      <div className="p-2 pl-4 font-neo rounded-md border-solid border-2 border-[#4F4F4F] bg-[#E7E7E7] flex items-center">
        <LockIcon />
        <p className="pl-3">{info.question}</p>
      </div>

      <NotificationCard>
        <p className="text-lg font-semibold">초대 수락을 기다리고 있어요!</p>
        <div className="mt-5 text-gray-400">
          <p>
            아직 상대방이 <br />
            초대를 수락하지 않았습니다.
          </p>

          <p className="mt-3 font-semibold">아래의 초대링크를 전송해주세요.</p>
        </div>
      </NotificationCard>

      <div>
        <Button
          className={`${kakaoStyle} flex items-center justify-center mb-2`}
          variant="primary"
          size="wide"
          onClick={shareInviteLink}
        >
          <KakaoIcon className="w-6 h-6" />
          초대링크 전송하기
        </Button>
        <CopyToClipboard
          text={`${BASE_URL}/invite/${linkKey}`}
          onCopy={() =>
            showToastSuccessMessage(
              `${info.invitedPersonName}님의 초대링크가 복사되었습니다.`
            )
          }
        >
          <Button
            variant="ghost"
            size="wide"
            className="border-1 border-gray-light"
          >
            초대링크 복사하기
          </Button>
        </CopyToClipboard>
      </div>
    </section>
  );
}
