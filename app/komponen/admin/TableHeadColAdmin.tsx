import type React from "react";

type Props = {
  children: React.ReactNode;
};

export default function TableHeadColAdmin({
  children,
}: Props): React.JSX.Element {
  return (
    <th className="font-medium text-xs text-left px-6 py-3 tracking-wider border-b-2 border-gray-200 whitespace-nowrap">
      {children}
    </th>
  );
}
