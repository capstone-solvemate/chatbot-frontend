import type React from "react";
import { NavLink } from "react-router";

type Props = {
  children?: React.ReactNode;
  to: string;
  className?: string;
};

export default function LinkOtentikasi({
  children,
  to,
  className = "",
}: Props): React.JSX.Element {
  return (
    <NavLink
      to={to}
      className={`text-sm text-blue-600 hover:text-blue-800 mt-4 cursor-pointer ${className}`}
    >
      {children && children}
    </NavLink>
  );
}
