import type React from "react";
import Select from "~/komponen/Select";
import type { Kategori } from "~/modul/settings/kategori/Kategori";

type Props = {
  daftarKategori: Kategori[];
  value: number;
  onChange: (value: number) => void;
};

export default function PilihanKategori({
  daftarKategori,
  value,
  onChange,
}: Props): React.JSX.Element {
  return (
    <Select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      <option value={0}>All Categories</option>
      {daftarKategori.map((kategori) => (
        <option key={kategori.id} value={kategori.id}>
          {kategori.nama}
        </option>
      ))}
    </Select>
  );
}
