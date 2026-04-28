import type React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function SubJudulOtentikasi({
  children,
}: Props): React.ReactNode {
  return (
    <p className="text-gray-500 mt-1 text-center">{children && children}</p>
  );
}
