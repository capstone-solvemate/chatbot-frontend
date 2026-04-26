import type { Kategori } from "~/modul/settings/kategori/Kategori";
import FaqCategoryTab from "./FaqCategoryTab";

export interface Props {
  daftarKategori: Kategori[];
  filterKategori: Kategori | null;
  onSelectKategori: (kategori: Kategori | null) => void;
}

export default function FaqCategoryTabs({
  daftarKategori,
  filterKategori,
  onSelectKategori,
}: Props) {
  return (
    <div className="mb-6 flex gap-3 overflow-x-auto">
      <FaqCategoryTab
        kategori={null}
        active={filterKategori === null}
        onClick={() => onSelectKategori(null)}
      />

      {daftarKategori.map((kategori) => (
        <FaqCategoryTab
          kategori={kategori}
          active={filterKategori?.id === kategori.id}
          onClick={() => onSelectKategori(kategori)}
        />
      ))}
    </div>
  );
}
