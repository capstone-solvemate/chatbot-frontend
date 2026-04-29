import type React from "react";
import Select from "~/komponen/Select";
import type { Kategori } from "~/modul/settings/kategori/Kategori";

type Props = {
  daftarKategori: Kategori[];
};

export default function PilihanKategori({
  daftarKategori,
}: Props): React.JSX.Element {
  return (
    <Select>
      <option value={0}>All Categories</option>
      {daftarKategori.map((kategori) => (
        <option key={kategori.id} value={kategori.id}>
          {kategori.nama}
        </option>
      ))}
    </Select>
  );
}
