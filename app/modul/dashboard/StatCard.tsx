import type React from "react";

type Props = {
  label: string;
  value: string;
  subtitle: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
};

export default function StatCard({
  label,
  value,
  subtitle,
  isLoading = false,
  icon,
}: Props) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">
        {icon && icon}
        <span>{label}</span>
      </div>

      {isLoading ? (
        <div className="h-10 w-24 bg-gray-100 rounded-md animate-pulse" />
      ) : (
        <h3 className="text-4xl font-semibold text-gray-800">{value}</h3>
      )}

      <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
    </article>
  );
}
