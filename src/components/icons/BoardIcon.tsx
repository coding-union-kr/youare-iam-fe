import { NavIconProps, navIconColors } from './SelectIcon';

export default function Board({ color = 'default', ...props }: NavIconProps) {
  const svgColor = navIconColors[color];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 60 60"
      fill="none"
      {...props}
    >
      <path
        stroke={svgColor}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M38.75 11H45a5 5 0 0 1 5 5v32.5a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5V16a5 5 0 0 1 5-5h6.25"
      />
      <path
        stroke={svgColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M21.552 9.787A5 5 0 0 1 26.402 6h7.193a5 5 0 0 1 4.85 3.787L40 16H20l1.552-6.213Z"
      />
      <path
        stroke={svgColor}
        stroke-linecap="round"
        stroke-width="3"
        d="M22.5 31h15m-15 10h15"
      />
    </svg>
  );
}
