import { NavLink } from "react-router";
import ChipStatusTiket from "../ChipStatusTiket";
import type { StatusTiket } from "../StatusTiket";
import ChipKategori from "../ChipKategori";

type Props = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: StatusTiket;
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
  return (
    <NavLink
      to={`/tiket/${id.slice(1)}`}
      className="bg-white text-start border border-gray-200 rounded-xl p-6 shadow-sm cursor-pointer hover:border-blue-100 hover:shadow-md hover:shadow-neutral-400"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 mb-6 sm:mb-2">
        <h3 className="font-semibold text-lg text-gray-900">
          {id} - {title}
        </h3>

        <ChipStatusTiket status={status} />
      </div>

      <p className="text-gray-600 mb-6 sm:mb-4">{description}</p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 text-sm text-gray-500">
        <ChipKategori kategori={category} />

        <span>{created}</span>
        <span>{updated}</span>
      </div>
    </NavLink>
  );
}
