import type React from "react";
import InputCari from "./InputCari";
import PilihanStatus from "./PilihanStatus";
import PilihanKategori from "./PilihanKategori";
import type { Kategori } from "~/modul/settings/kategori/Kategori";

type Props = {
  daftarKategori: Kategori[];
  search: string;
  onChangeSearch: (value: string) => void;
  filterStatus: number;
  onChangeStatus: (value: number) => void;
  filterKategori: number;
  onChangeKategori: (value: number) => void;
};

export default function FilterTiket({
  daftarKategori,
  search,
  onChangeSearch,
  filterStatus,
  onChangeStatus,
  filterKategori,
  onChangeKategori,
}: Props): React.JSX.Element {
  return (
    <div className="flex gap-2 justify-between p-6 items-center border-b border-gray-200">
      <h5 className="font-semibold text-lg">All Tickets</h5>
      <div className="flex gap-3 items-center">
        <InputCari value={search} onChange={onChangeSearch} />
        <PilihanStatus value={filterStatus} onChange={onChangeStatus} />
        <PilihanKategori
          daftarKategori={daftarKategori}
          value={filterKategori}
          onChange={onChangeKategori}
        />
      </div>
    </div>
  );
}
