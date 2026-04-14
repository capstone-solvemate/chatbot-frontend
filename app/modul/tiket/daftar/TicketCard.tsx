type Props = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "Open" | "In Progress" | "Resolved";
  created: string;
  updated: string;
};

export default function TicketCard({
  id,
  title,
  description,
  category,
  status,
  created,
  updated,
}: Props) {
  const statusStyle = {
    Open: "bg-red-100 text-red-700 border-red-200",
    "In Progress": "bg-orange-100 text-orange-700 border-orange-200",
    Resolved: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <button className="bg-white text-start border border-gray-200 rounded-xl p-6 shadow-sm cursor-pointer hover:border-blue-100 hover:shadow-md hover:shadow-neutral-400">
      <div className="flex items-center gap-3 mb-2">
        <h3 className="font-semibold text-lg text-gray-900">
          {id} - {title}
        </h3>

        <span
          className={`text-xs px-3 py-1 rounded-full border ${statusStyle[status]}`}
        >
          {status}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
          {category}
        </span>

        <span>{created}</span>
        <span>{updated}</span>
      </div>
    </button>
  );
}
