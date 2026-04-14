import { type ReactNode } from "react";
import { NavLink } from "react-router";

interface NavItemProps {
  children: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  href?: string;
}

export default function NavItem({
  children,
  icon,
  active,
  href = "#",
}: NavItemProps) {
  return (
    <NavLink
      to={href}
      className={`
        flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition
        ${
          active
            ? "bg-blue-50 text-blue-600 stroke-blue-600"
            : "text-gray-600 hover:bg-gray-100 stroke-gray-600"
        }
      `}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </NavLink>
  );
}
