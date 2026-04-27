import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export default function IkonExclamationTriangle({
  width = 24,
  height = 24,
  fill = "none",
  stroke = "currentColor",
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.7283 17.9976L13.7291 3.99914C13.5547 3.69138 13.3018 3.43539 12.9961 3.25729C12.6905 3.07919 12.3431 2.98535 11.9893 2.98535C11.6356 2.98535 11.2882 3.07919 10.9825 3.25729C10.6769 3.43539 10.4239 3.69138 10.2495 3.99914L2.25039 17.9976C2.07409 18.3029 1.98165 18.6495 1.98243 19.002C1.98321 19.3546 2.07719 19.7007 2.25483 20.0052C2.43248 20.3098 2.68749 20.5619 2.994 20.7362C3.30052 20.9104 3.64764 21.0005 4.0002 20.9973H19.9985C20.3493 20.9969 20.6939 20.9043 20.9976 20.7286C21.3014 20.5529 21.5535 20.3005 21.7288 19.9965C21.9041 19.6926 21.9963 19.3479 21.9962 18.997C21.9961 18.6461 21.9037 18.3015 21.7283 17.9976Z"
        stroke={stroke}
        strokeWidth={1.99978}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.998 8.99902V12.999"
        stroke={stroke}
        strokeWidth={1.99978}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.998 16.998H12.008"
        stroke={stroke}
        strokeWidth={1.99978}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
