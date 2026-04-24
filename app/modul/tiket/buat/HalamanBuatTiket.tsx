import Navbar from "~/komponen/Navbar";
import TicketCard from "./TicketCard";
import type { Route } from "./+types/HalamanBuatTiket";
import { useEffect, useState } from "react";
import HalamanLoading from "~/dasar/HalamanLoading";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import { dtoToKategori } from "~/modul/settings/kategori/daftar/converters";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Create Support Ticket" }];
}

export default function HalamanBuatTiket() {
  const [loading, setLoading] = useState(true);
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();
  const [daftarKategori, setDaftarKategori] = useState<Kategori[]>([]);

  useEffect(() => {
    const getDaftarKategoriFn = async () => {
      try {
        const response = await konektorBackend.get("/api/categories");
        const dto: any[] = await response.json();
        const daftarKategoriBaru = dto.map((item) => dtoToKategori(item));
        setDaftarKategori(daftarKategoriBaru);
        setLoading(false);
      } catch (e: any) {
        setMasterError(e);
      }
    };
    getDaftarKategoriFn();
  }, []);

  return loading ? (
    <HalamanLoading />
  ) : (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-6 pb-8 pt-28">
        <div className="flex justify-center px-4">
          <TicketCard daftarKategori={daftarKategori} />
        </div>
      </div>
    </>
  );
}
