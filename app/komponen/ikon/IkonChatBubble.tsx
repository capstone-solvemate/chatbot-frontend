import React from "react";

export default function IkonChatBubble(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      {...props}
    >
      <path
        d="M6.58317 16.6669C8.17365 17.4827 10.0032 17.7037 11.7422 17.29C13.4812 16.8763 15.0153 15.8551 16.068 14.4104C17.1206 12.9656 17.6227 11.1925 17.4837 9.41034C17.3446 7.62821 16.5737 5.95434 15.3097 4.69036C14.0457 3.42638 12.3718 2.65541 10.5897 2.51638C8.80758 2.37735 7.0344 2.87941 5.58969 3.93207C4.14498 4.98474 3.12375 6.51879 2.71002 8.2578C2.2963 9.9968 2.51729 11.8264 3.33317 13.4169L1.6665 18.3335L6.58317 16.6669Z"
        stroke="currentColor"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
