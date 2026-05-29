import type React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export default function IkonTutup(props: IconProps): React.JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.9971 3.99902L3.99902 11.9971"
        stroke="#0A0A0A"
        strokeWidth="1.33301"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.99902 3.99902L11.9971 11.9971"
        stroke="#0A0A0A"
        strokeWidth="1.33301"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
