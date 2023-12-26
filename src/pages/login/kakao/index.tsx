import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/kakao/callback?code=${code}`
        );

        localStorage.setItem(
          LOCAL_STORAGE_KEYS.TOKEN,
          res.headers['authorization']
        );

        const prevUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.PREV_URL);
        if (prevUrl === '/invite') {
          router.push('/chatroom');
        } else {
          router.push(prevUrl || '/onboarding');
        }
        // router.push(prevUrl || '/onboarding');
        localStorage.removeItem(LOCAL_STORAGE_KEYS.PREV_URL);
      } catch (err) {
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    if (code) {
      fetchToken();
    }
  }, [code, router]);

  return <div>{error && <p>{error}</p>}</div>;
}
