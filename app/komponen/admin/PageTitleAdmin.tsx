import type React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function PageTitleAdmin({ children }: Props): React.JSX.Element {
  return (
    <h1 className="text-3xl font-semibold text-gray-900">
      {children && children}
    </h1>
  );
}
