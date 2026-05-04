// modul/tiket/daftar/TicketFilter.tsx
import IkonFilter from "~/komponen/ikon/IkonFilter";
import FilterChip from "./FilterChip";
import type { FilterStatus } from "./HalamanDaftarTiket";
import { StatusTiket } from "../StatusTiket";

type Props = {
  active: FilterStatus;
  onSelect: (status: FilterStatus) => void;
};

const FILTERS: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: StatusTiket.Open },
  { label: "In Progress", value: StatusTiket.InProgress },
  { label: "Resolved", value: StatusTiket.Resolved },
];

export default function TicketFilter({ active, onSelect }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 shadow-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <IkonFilter />
        <span className="text-gray-700">Filter by status:</span>
      </div>

      <div className="flex gap-3 w-full sm:w-auto overflow-x-auto py-1">
        {FILTERS.map((f) => (
          <button key={f.value} onClick={() => onSelect(f.value)}>
            <FilterChip active={active === f.value}>{f.label}</FilterChip>
          </button>
        ))}
      </div>
    </div>
  );
}
