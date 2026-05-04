import { NavLink } from "react-router";
import ChipStatusTiket from "../ChipStatusTiket";
import type { StatusTiket } from "../StatusTiket";
import ChipKategori from "../ChipKategori";
import type { Kategori } from "~/modul/settings/kategori/Kategori";

type Props = {
  id: string;
  title: string;
  description: string;
  category: Kategori | null;
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
  function force3Digits(data: string) {
    return data.padStart(3, "0");
  }

  return (
    <NavLink
      to={`/tiket/${id}`}
      className="bg-white text-start border border-gray-200 rounded-xl p-6 shadow-sm cursor-pointer hover:border-blue-100 hover:shadow-md hover:shadow-neutral-400"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 mb-6 sm:mb-2">
        <h3 className="font-semibold text-lg text-gray-900">
          #{force3Digits(id)} - {title}
        </h3>
        <ChipStatusTiket status={status} />
      </div>

      <p className="text-gray-600 mb-6 sm:mb-4">{description}</p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 text-sm text-gray-500">
        {category && <ChipKategori kategori={category} />}

        <span>{created}</span>
        <span>{updated}</span>
      </div>
    </NavLink>
  );
}
