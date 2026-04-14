export default function TicketMeta() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between text-sm text-gray-500">
      <div className="flex items-start sm:items-center flex-col sm:flex-row sm:gap-1">
        <span>Created:</span>
        <span>Apr 2, 2026, 10:30:00 AM</span>
      </div>

      <div className="flex items-start sm:items-center flex-col sm:flex-row sm:gap-1">
        <span>Last updated:</span>
        <span>Apr 3, 2026, 2:20:00 PM</span>
      </div>
    </div>
  );
}
