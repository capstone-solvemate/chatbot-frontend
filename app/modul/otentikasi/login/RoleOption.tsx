import type React from "react";

interface Props {
  children?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export default function RoleOption({
  children,
  active = false,
  onClick,
}: Props): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-lg py-2 font-medium border-2 cursor-pointer ${
        active
          ? "border-blue-600 text-blue-700 bg-blue-50"
          : "border-gray-200 text-gray-600 bg-white"
      }`}
    >
      {children && children}
    </button>
  );
}
