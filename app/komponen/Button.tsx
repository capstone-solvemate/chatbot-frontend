interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Button({
  children,
  leftIcon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700 transition " +
        className
      }
      {...props}
    >
      {leftIcon && leftIcon}
      {children && children}
    </button>
  );
}
