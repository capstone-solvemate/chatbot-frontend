import { NavLink } from "react-router";

interface ButtonProps {
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  leftIcon,
  className,
  href,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClassName = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700 transition disabled:bg-blue-100 disabled:text-blue-50 disabled:cursor-default ${className}`;

  return (
    <>
      {href ? (
        <NavLink to={href} className={baseClassName + className}>
          {leftIcon && leftIcon}
          {children && children}
        </NavLink>
      ) : (
        <button
          onClick={onClick}
          className={baseClassName + className}
          type={type}
          disabled={disabled}
        >
          {leftIcon && leftIcon}
          {children && children}
        </button>
      )}
    </>
  );
}
