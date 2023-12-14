import type { ComponentProps } from 'react';
import Button from './Button';
import KakaoIcon from '@/components/icons/KakaoIcon';
import Link from 'next/link';

type ButtonProps = ComponentProps<'button'>;

const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오 개발자 콘솔에서 발급받은 REST API 키
const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI; // 카카오로부터 인증 응답을 받을 서버의 URI

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

export default function KakaoLoginButton({ ...props }: ButtonProps) {
  const kakaoStyle = `bg-[#FEE400] hover:bg-[#FEE400] border-[#FEE400] hover:border-[#FEE400] text-[#371C1D]`;
  return (
    <Link href={KAKAO_AUTH_URL} className="w-full">
      <Button
        className={`${kakaoStyle} flex items-center justify-center`}
        size="wide"
        variant="primary"
        {...props}
      >
        <KakaoIcon className="w-6 h-6" />
        카카오 로그인
      </Button>
    </Link>
  );
}
