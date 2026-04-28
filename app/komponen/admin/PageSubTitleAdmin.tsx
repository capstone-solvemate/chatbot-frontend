import type React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function PageSubTitleAdmin({
  children,
}: Props): React.JSX.Element {
  return <p className="text-sm text-gray-500 mt-2">{children && children}</p>;
}
