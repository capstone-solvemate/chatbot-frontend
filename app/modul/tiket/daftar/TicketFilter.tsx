import IkonFilter from "~/komponen/IkonFilter";
import FilterChip from "./FilterChip";

export default function TicketFilter() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <IkonFilter />
        <span className="text-gray-700">Filter by status:</span>
      </div>

      <div className="flex gap-3">
        <FilterChip active>All</FilterChip>
        <FilterChip>Open</FilterChip>
        <FilterChip>In Progress</FilterChip>
        <FilterChip>Resolved</FilterChip>
      </div>
    </div>
  );
}
