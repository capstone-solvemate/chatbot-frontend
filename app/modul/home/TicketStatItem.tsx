type TicketStatItemProps = {
  value: number;
  label: string;
  icon: React.ReactNode;
  color: "orange" | "blue" | "green";
  loading: boolean;
};

const colorMap = {
  orange: "bg-orange-100 text-orange-600",
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
};

export default function TicketStatItem({
  value,
  label,
  icon,
  color,
  loading,
}: TicketStatItemProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <div
        className={`w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full ${colorMap[color]}`}
      >
        {icon}
      </div>

      <div className="text-lg font-semibold text-gray-900">
        {loading ? "" : value}
      </div>

      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
