import Navbar from "~/komponen/Navbar";
import TicketCard from "./TicketCard";
import type { Route } from "./+types/HalamanBuatTiket";
import { useEffect, useState } from "react";
import HalamanLoading from "~/dasar/HalamanLoading";
import { useOutletContext, useNavigate } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import { dtoToKategori } from "~/modul/settings/kategori/daftar/converters";
import type { BuatTiketRequestDto } from "./dto/BuatTiketRequestDto";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Create Support Ticket" }];
}

export default function HalamanBuatTiket({ params }: Route.ComponentProps) {
  const idChat = params.idchat;
  const navigate = useNavigate();

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

  async function handleSubmit(payload: BuatTiketRequestDto) {
    try {
      const response = await konektorBackend.post("/api/tiket", payload);
      const data = await response.json();
      // Navigasi ke halaman detail tiket setelah berhasil dibuat
      navigate(`/tiket/${data.data.id}`);
    } catch (e: any) {
      setMasterError(e);
    }
  }

  return loading ? (
    <HalamanLoading />
  ) : (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-6 pb-8 pt-28">
        <div className="flex justify-center px-4">
          <TicketCard
            daftarKategori={daftarKategori}
            idChat={idChat}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}
