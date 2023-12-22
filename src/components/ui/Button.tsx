import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant: 'primary' | 'secondary' | 'accent';
  size?: 'xs' | 'sm' | 'normal' | 'wide';
};

export default function Button({
  variant,
  size = 'normal',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const colorVariants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
  };

  const sizeVariants = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    normal: 'btn-normal',
    wide: 'btn-wide block w-[90%] mx-auto text-base',
  };

  const disabledStyle = disabled
    ? 'bg-gray-light border-gray-light text-gray-dark'
    : '';

  return (
    <button
      className={`btn ${colorVariants[variant]} ${sizeVariants[size]} no-animation ${className} ${disabledStyle}`}
      {...props}
    >
      {children}
    </button>
  );
}
