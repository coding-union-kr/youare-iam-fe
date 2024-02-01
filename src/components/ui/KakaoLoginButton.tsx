import type { ComponentProps } from 'react';
import Button from './Button';
import KakaoIcon from '@/components/icons/KakaoIcon';
import Link from 'next/link';
import { KAKAO_AUTH_URL } from '@/constants/kakaoAuth';

export const kakaoStyle = `bg-[#FEE400] hover:bg-[#FEE400] border-[#FEE400] hover:border-[#FEE400] text-[#371C1D]`;

type ButtonProps = ComponentProps<'button'>;

export default function KakaoLoginButton({ ...props }: ButtonProps) {
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
