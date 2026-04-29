import type React from "react";

export default function TableColAdmin({
  children,
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>): React.JSX.Element {
  return (
    <td
      className={`px-6 py-3 not-last:border-b-2 border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}
