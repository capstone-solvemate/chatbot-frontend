import type React from "react";

interface Props {
  children?: React.ReactNode;
}

export default function JudulOtentikasi({
  children,
}: Props): React.JSX.Element {
  return (
    <h1 className="text-center text-2xl font-semibold text-gray-900 mt-4">
      {children && children}
    </h1>
  );
}
