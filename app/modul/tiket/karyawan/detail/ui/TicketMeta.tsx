type Props = {
  dibuatPada: Date;
  diperbaruiPada: Date;
};

const formatDate = (date: Date) =>
  date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export default function TicketMeta({ dibuatPada, diperbaruiPada }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between text-sm text-gray-500">
      <div className="flex items-start sm:items-center flex-col sm:flex-row sm:gap-1">
        <span>Created:</span>
        <span>{formatDate(dibuatPada)}</span>
      </div>
      <div className="flex items-start sm:items-center flex-col sm:flex-row sm:gap-1">
        <span>Last updated:</span>
        <span>{formatDate(diperbaruiPada)}</span>
      </div>
    </div>
  );
}
