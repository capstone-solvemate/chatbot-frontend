import type React from "react";
import IkonChevron from "./ikon/IkonChevron";

export default function Select({
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>): React.JSX.Element {
  return (
    <div className="relative">
      <IkonChevron className="h-5 text-gray-500 absolute inset-e-2 top-1/2 -translate-y-1/2" />
      <select
        className={`py-2 ps-3 pe-6 min-w-40 bg-gray-100 text-gray-900 rounded-md appearance-none text-sm font-medium ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
