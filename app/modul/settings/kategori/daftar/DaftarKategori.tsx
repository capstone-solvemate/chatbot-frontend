import type { Kategori } from "../Kategori";
import CardKategori from "./CardKategori";

interface Props {
  daftarKategori: Kategori[];
}

export default function DaftarKategori({ daftarKategori }: Props) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      {daftarKategori.map((kategori) => (
        <CardKategori key={kategori.id} kategori={kategori} />
      ))}
    </div>
  );
}
