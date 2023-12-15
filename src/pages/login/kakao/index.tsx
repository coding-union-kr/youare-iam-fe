import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    console.log(code);
    const fetchToken = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/kakao/callback?code=${code}`
        );
        console.log(res);
        console.log(res.headers['authorization']);

        localStorage.setItem('jwt', res.headers['authorization']);
        // Todo: 다른 페이지로 리다이렉트하도록 하기 (ex: onboarding, main, 초대링크랜딩페이지)
        // router.push('/onboarding');
      } catch (err) {
        console.error(err);
        alert('An error occurred while logging in. Please try again.');
      }
    };

    if (code) {
      fetchToken();
    }
  }, [code, router]);

  return <div>redirecting...</div>;
}
