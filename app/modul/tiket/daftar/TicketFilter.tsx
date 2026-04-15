import IkonFilter from "~/komponen/ikon/IkonFilter";
import FilterChip from "./FilterChip";

export default function TicketFilter() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 shadow-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <IkonFilter />
        <span className="text-gray-700">Filter by status:</span>
      </div>

      <div className="flex gap-3 w-full sm:w-auto overflow-x-auto py-1">
        <FilterChip active>All</FilterChip>
        <FilterChip>Open</FilterChip>
        <FilterChip>In Progress</FilterChip>
        <FilterChip>Resolved</FilterChip>
      </div>
    </div>
  );
}
