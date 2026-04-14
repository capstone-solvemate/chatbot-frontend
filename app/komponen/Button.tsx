import { NavLink } from "react-router";

interface ButtonProps {
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  className?: string;
}

export function Button({ children, leftIcon, className, href }: ButtonProps) {
  return (
    <>
      {href ? (
        <NavLink
          to={href}
          className={
            "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700 transition " +
            className
          }
        >
          {leftIcon && leftIcon}
          {children && children}
        </NavLink>
      ) : (
        <button
          className={
            "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700 transition " +
            className
          }
        >
          {leftIcon && leftIcon}
          {children && children}
        </button>
      )}
    </>
  );
}
