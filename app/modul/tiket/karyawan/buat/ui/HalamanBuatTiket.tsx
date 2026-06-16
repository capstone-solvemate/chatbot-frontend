import TicketCard from "./TicketCard";
import { useEffect, useState } from "react";
import HalamanLoading from "~/dasar/HalamanLoading";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import { dtoToKategori } from "~/modul/settings/kategori/data/converters";
import type { BuatTiketRequestDto } from "../../api/dto/BuatTiketRequestDto";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";
import { useNavigate } from "react-router";
import type { Route } from "../+types/HalamanBuatTiket";
import { useKonektorRestApi } from "~/dasar/hooks/useKonektorRestApi";
import { KonektorBackendTiketKaryawan } from "../../api/KonektorBackendTiketKaryawan";
import { HttpError } from "~/dasar/api/rest/KonektorRestApi";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Create Support Ticket" }];
}

export default function HalamanBuatTiket({ params }: Route.ComponentProps) {
  const idChat = params.idchat;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const konektorRestApi = useKonektorRestApi();
  const konektorBackendTiketKaryawan = new KonektorBackendTiketKaryawan(
    konektorRestApi,
  );

  const { setMasterError } = useMasterError();
  const [daftarKategori, setDaftarKategori] = useState<Kategori[]>([]);

  useEffect(() => {
    const getDaftarKategoriFn = async () => {
      try {
        const response = await konektorRestApi.get("/api/categories");
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
      await konektorBackendTiketKaryawan.buatTiket(payload);
      // Navigasi ke halaman detail tiket setelah berhasil dibuat
      navigate(`/tiket/${payload.idChat}`);
    } catch (e: any) {
      if (e instanceof HttpError && e.status === 409) {
        setMasterError(
          new Error("This chat has already been escalated to a ticket."),
        );
      } else {
        setMasterError(e);
      }
    }
  }

  return loading ? (
    <HalamanLoading />
  ) : (
    <main className="min-h-default">
      <div className="min-h-screen bg-gray-100 px-6 py-8">
        <div className="flex justify-center px-4">
          <TicketCard
            daftarKategori={daftarKategori}
            idChat={idChat}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
}
