import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    console.log(router.asPath);
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
        router.push(prevUrl || '/onboarding');
        localStorage.removeItem(LOCAL_STORAGE_KEYS.PREV_URL);
      } catch (err) {
        console.error(err);
        alert('An error occurred while logging in. Please try again.');
      }
    };

    if (code) {
      fetchToken();
    }
  }, [code, router]);

  return <div></div>;
}
