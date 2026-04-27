import { IkonCari } from "~/komponen/ikon/IkonCari";
import type { Kategori } from "~/modul/settings/kategori/Kategori";

interface Props {
  daftarKategori: Kategori[];
  filterKategori: Kategori | null;
  onSelectFilterKategori: (id: number) => void;
  search: string;
  onChangeSearch: (search: string) => void;
}

export default function FaqToolbar({
  daftarKategori,
  filterKategori,
  onSelectFilterKategori,
  search,
  onChangeSearch,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <IkonCari className="h-5 absolute text-gray-400 left-2 top-1/2 -translate-y-1/2" />
        <input
          value={search}
          onChange={(e) => onChangeSearch(e.target.value)}
          placeholder="Search FAQs..."
          className="w-56 rounded-md ps-9 pe-4 py-2 text-sm bg-gray-100 outline-none border border-gray-300 focus:border-gray-600 text-gray-900"
        />
      </div>

      <select
        value={filterKategori?.id ?? "0"}
        onChange={(e) =>
          onSelectFilterKategori(Number.parseInt(e.target.value))
        }
        className={`w-40 border rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-900 ${!filterKategori ? "border-gray-300 outline-none" : "border-orange-200 outline-1 outline-orange-200"}`}
      >
        <option value={0}>All Category</option>
        {daftarKategori.map((kategori) => (
          <option key={kategori.id} value={kategori.id}>
            {kategori.nama}
          </option>
        ))}
      </select>
    </div>
  );
}
