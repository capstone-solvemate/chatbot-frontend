import type React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function CardOtentikasi({ children }: Props): React.JSX.Element {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      {children && children}
    </div>
  );
}
