import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'xs' | 'sm' | 'normal' | 'wide';
  isLoading?: boolean;
};

export default function Button({
  variant,
  size = 'normal',
  children,
  className,
  disabled,
  isLoading,
  ...props
}: ButtonProps) {
  const colorVariants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost border-1 border-gray-light',
  };

  const sizeVariants = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    normal: 'btn-normal',
    wide: 'btn-wide block w-[90%] mx-auto text-base',
  };

  return (
    <button
      className={`btn no-animation flex align-center ${colorVariants[variant]} ${sizeVariants[size]}  ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {children}
      {isLoading && (
        <span className="loading loading-spinner text-gray-dark"></span>
      )}
    </button>
  );
}
