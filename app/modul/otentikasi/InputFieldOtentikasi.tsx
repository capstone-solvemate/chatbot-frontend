import type React from "react";

type Props = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  minLength?: number;
  className?: string;
};

export default function InputFieldOtentikasi({
  name,
  label,
  type,
  placeholder,
  icon,
  minLength,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>

      <div className="flex items-center border border-gray-300 rounded-lg p-3">
        <span className="text-gray-400">{icon && icon}</span>

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          minLength={minLength}
          className="w-full outline-none ml-2"
        />
      </div>
    </div>
  );
}
