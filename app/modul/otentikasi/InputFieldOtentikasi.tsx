import type React from "react";

type Props = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  minLength?: number;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export default function InputFieldOtentikasi({
  name,
  label,
  type,
  placeholder,
  icon,
  minLength,
  className = "",
  value,
  onChange,
  error,
}: Props) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>

      <div
        className={[
          "flex items-center border rounded-lg p-3 transition-colors",
          error ? "border-red-400 bg-red-50" : "border-gray-300",
        ].join(" ")}
      >
        <span className="text-gray-400">{icon && icon}</span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          minLength={minLength}
          value={value}
          onChange={onChange}
          className="w-full outline-none ml-2 bg-transparent"
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
