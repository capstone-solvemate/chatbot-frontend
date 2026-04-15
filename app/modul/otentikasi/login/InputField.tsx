import type React from "react";

type Props = {
  label: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
};

export default function InputField({ label, type, placeholder, icon }: Props) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>

      <div className="flex items-center border border-gray-300 rounded-lg p-3">
        <span className="text-gray-400">{icon && icon}</span>

        <input
          type={type}
          placeholder={placeholder}
          className="w-full outline-none ml-2"
        />
      </div>
    </div>
  );
}
