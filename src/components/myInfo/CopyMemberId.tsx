import CopyToClipboard from 'react-copy-to-clipboard';
import Button from '../ui/Button';
import { showToastSuccessMessage } from '@/util/toast';
import CopyIcon from '../icons/CopyIcon';

type Props = {
  memberId: number;
};

export default function CopyMemberId({ memberId }: Props) {
  return (
    <>
      <CopyToClipboard
        text={`${memberId}`}
        onCopy={() =>
          showToastSuccessMessage('사용자 아이디가 복사되었습니다.')
        }
      >
        <Button variant="ghost" size="wide" className="text-gray-dark">
          사용자 아이디 복사
          <CopyIcon className="inline ml-1 w-7" />
        </Button>
      </CopyToClipboard>
    </>
  );
}
