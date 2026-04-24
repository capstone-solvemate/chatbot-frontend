import { NavLink } from "react-router";

interface ButtonProps {
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  color?: ButtonColor;
}

export function Button({
  children,
  leftIcon,
  className,
  href,
  onClick,
  type = "button",
  disabled = false,
  color = ButtonColor.Blue,
}: ButtonProps) {
  function getColorClass(color: ButtonColor): string {
    switch (color) {
      case ButtonColor.Blue:
        return "bg-blue-600 enabled:hover:bg-blue-700 text-white disabled:bg-blue-100 disabled:text-blue-50";
      case ButtonColor.White:
        return "bg-white enabled:hover:bg-gray-200 text-black disabled:text-gray-100";
      case ButtonColor.Red:
        return "bg-rose-700 enabled:hover:bg-rose-800 text-white disabled:bg-rose-200 disabled:text-rose-100";
    }
  }
  const baseClassName = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg  px-6 py-3 font-medium shadow transition disabled:cursor-default ${getColorClass(color)} ${className}`;

  return (
    <>
      {href ? (
        <NavLink to={href} className={baseClassName + " " + className}>
          {leftIcon && leftIcon}
          {children && children}
        </NavLink>
      ) : (
        <button
          onClick={onClick}
          className={baseClassName + " " + className}
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

export enum ButtonColor {
  Blue,
  White,
  Red,
}
