import type { TableHTMLAttributes } from "react";
import type React from "react";

export default function TableAdmin({
  className,
  children,
  ...props
}: TableHTMLAttributes<HTMLTableElement>): React.JSX.Element {
  return (
    <table className={`w-full ${className}`} {...props}>
      {children}
    </table>
  );
}
