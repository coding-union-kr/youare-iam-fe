import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';
import { setAccessToken, setAuthHeader } from '@/libs/token';
import { instance } from '@/libs/clientSideApi';
import useUserStatus from '@/hooks/queries/useUserStatus';
import { authState } from '@/store/auth';

export default function Login() {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { code } = router.query;
  const { userData } = useUserStatus(isAuthenticated);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/kakao/callback?code=${code}`
        );
        const accessToken = res.headers['authorization'].split(' ')[1];

        setAccessToken(accessToken);
        setAuthHeader(instance, accessToken);

        const prevUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.PREV_URL);
        setIsAuthenticated(true);
        router.push(prevUrl || '/chatroom');
        localStorage.removeItem(LOCAL_STORAGE_KEYS.PREV_URL);
      } catch (err) {
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    if (code) {
      fetchToken();
    }
  }, [code, router, setIsAuthenticated]);

  return <div>{error && <p>{error}</p>}</div>;
}
