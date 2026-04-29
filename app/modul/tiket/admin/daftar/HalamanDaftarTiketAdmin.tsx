import type React from "react";
import type { Route } from "./+types/HalamanDaftarTiketAdmin";
import PageHeader from "./PageHeader";
import TabelTiket from "./TabelTiket";
import { useEffect, useState } from "react";
import HalamanLoading from "~/dasar/HalamanLoading";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import { dtoToKategori } from "~/modul/settings/kategori/daftar/converters";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Ticket Management" }];
}

export default function HalamanDaftarTiketAdmin(): React.JSX.Element {
  const [loading, setLoading] = useState(true);
  const [daftarKategori, setDaftarKategori] = useState<Kategori[]>([]);
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();

  async function getDaftarKategori() {
    try {
      const response = await konektorBackend.get("/api/admin/categories");
      const dto: any[] = await response.json();
      const daftarKategoriBaru = dto.map((dtoItem) => dtoToKategori(dtoItem));
      setDaftarKategori(daftarKategoriBaru);
    } catch (e: any) {
      setMasterError(e);
      throw e;
    }
  }

  useEffect(() => {
    getDaftarKategori().then(() => {
      // getDaftarTiket().finally(() => {
      setLoading(false);
      // });
    });
  }, []);

  return !loading ? (
    <main className="bg-gray-50 text-gray-800 px-6 py-6 min-h-default">
      <PageHeader />
      <TabelTiket daftarKategori={daftarKategori} />
    </main>
  ) : (
    <HalamanLoading />
  );
}
