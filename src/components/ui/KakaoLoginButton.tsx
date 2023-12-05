import { type ComponentProps } from 'react';
import Button from './Button';
import KakaoIcon from '@/components/icons/KakaoIcon';

type ButtonProps = ComponentProps<'button'>;

export default function KakaoLoginButton({ ...props }: ButtonProps) {
  const kakaoStyle = `bg-[#FEE400] hover:bg-[#FEE400] border-[#FEE400] hover:border-[#FEE400] text-[#371C1D]`;
  return (
    <Button
      className={`${kakaoStyle} flex items-center justify-center`}
      size="wide"
      variant="primary"
      {...props}
    >
      <KakaoIcon className="w-6 h-6" />
      카카오 로그인
    </Button>
  );
}
