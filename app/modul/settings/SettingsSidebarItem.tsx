import type React from "react";
import { Link } from "react-router";

type Props = {
  to: string;
  children?: React.ReactNode;
};

export default function SettingsSidebarItem({
  to,
  children,
}: Props): React.JSX.Element {
  return (
    <Link to={to} className="px-4 py-2">
      {children && children}
    </Link>
  );
}
