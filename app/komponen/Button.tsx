interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Button({ children, leftIcon, ...props }: ButtonProps) {
  return (
    <button
      className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700 transition"
      {...props}
    >
      {leftIcon && leftIcon}
      {children && children}
    </button>
  );
}
