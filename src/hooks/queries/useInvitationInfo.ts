import { useQuery } from '@tanstack/react-query';
import { get } from '@/libs/clientSideApi';
import { queryKeys } from '@/constants/queryKeys';

type InvitationInfo = {
  question: string;
  invitedPersonName: string;
};

const getInvitationInfo = async (linkKey: string) => {
  const res = await get<InvitationInfo>(
    `/api/v1/members/invite/info/${linkKey}`
  );
  return res.data;
};

export default function useInvitationInfo(linkKey: string) {
  const fallbackInfo = {
    question: '',
    invitedPersonName: '',
  };

  const {
    data: info = fallbackInfo,
    error,
    isLoading,
    isError,
  } = useQuery<InvitationInfo>({
    queryKey: queryKeys.invitationInfo,
    queryFn: () => getInvitationInfo(linkKey),
  });
  return { info, error, isLoading, isError };
}
