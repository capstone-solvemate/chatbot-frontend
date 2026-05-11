import type React from "react";

interface Props extends React.TdHTMLAttributes<HTMLTableCellElement> {
  wrap?: boolean;
}

export default function TableColAdmin({
  children,
  className = "",
  wrap = false,
  ...props
}: Props): React.JSX.Element {
  return (
    <td
      className={`px-6 py-3 border-b-2 border-gray-200 ${wrap ? "whitespace-normal" : "whitespace-nowrap"} ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}
