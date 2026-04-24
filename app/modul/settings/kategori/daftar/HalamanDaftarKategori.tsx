import type React from "react";
import HeaderDaftarKategori from "./HeaderDaftarKategori";
import DaftarKategori from "./DaftarKategori";
import type { Route } from "./+types/HalamanDaftarKategori";
import { useEffect, useState } from "react";
import { Kategori } from "../Kategori";
import type { ContextType } from "~/dasar/ContextType";
import { useOutletContext } from "react-router";
import { dtoToKategori } from "./converters";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Kategori" }];
}

export default function HalamanDaftarKategori(): React.JSX.Element {
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();

  const [daftarKategori, setDaftarKategori] = useState<Kategori[]>([]);
  useEffect(() => {
    const fn = async () => {
      try {
        const response = await konektorBackend.get("/api/admin/categories");
        const dto: any[] = await response.json();
        const daftarKategoriBaru = dto.map((dtoItem) => dtoToKategori(dtoItem));
        setDaftarKategori(daftarKategoriBaru);
      } catch (e: any) {
        setMasterError(e);
      }
    };
    fn();
  }, []);

  return (
    <div
      className="max-w-5xl mx-auto px-6 py-8"
      style={{ minWidth: "calc(100vh - 4rem)" }}
    >
      <HeaderDaftarKategori />
      <DaftarKategori daftarKategori={daftarKategori} />
    </div>
  );
}
