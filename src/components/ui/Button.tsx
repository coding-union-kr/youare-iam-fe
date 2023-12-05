import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant: 'primary' | 'secondary' | 'accent';
  size?: 'xs' | 'sm' | 'normal' | 'wide';
};

export default function Button({
  variant,
  size = 'normal',
  children,
  className,
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
    wide: 'btn-wide block w-10/12 mx-auto',
  };

  return (
    <button
      className={`btn ${colorVariants[variant]} ${sizeVariants[size]} no-animation ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
