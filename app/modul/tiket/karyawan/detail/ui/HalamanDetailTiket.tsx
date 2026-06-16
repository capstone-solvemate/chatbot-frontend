// modul/tiket/detail/HalamanDetailTiket.tsx

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import type { Route } from "./+types/HalamanDetailTiket";
import type { TiketDetailResponseDto } from "../../../daftar/dto/TiketResponseDto";
import { dtoToTiket, dtoToPesanTiket } from "../../../daftar/dto/converters";
import BackToTicketsLink from "./BackToTicketsLink";
import TicketDetailCard from "./TicketDetailCard";
import ConversationCard from "./ConversationCard";
import HalamanLoading from "~/dasar/HalamanLoading";
import type { Kategori } from "~/modul/settings/kategori/Kategori";
import { dtoToKategori } from "~/modul/settings/kategori/data/converters";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";
import type { Tiket } from "~/modul/tiket/Tiket";
import type { PesanTiket } from "~/modul/tiket/PesanTiket";
import { StatusTiket } from "~/modul/tiket/StatusTiket";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Detail Tiket" }];
}

export default function HalamanDetailTiket() {
  const { idtiket } = useParams<{ idtiket: string }>();
  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();

  const [tiket, setTiket] = useState<Tiket | null>(null);
  const [pesanTiket, setPesanTiket] = useState<PesanTiket[]>([]); // ← baru
  const [loading, setLoading] = useState(true);

  const refTombolResolve = useRef<HTMLButtonElement | null>(null);

  const mapKategori = useRef(new Map<number, Kategori>());
  function setDaftarKategori(data: Kategori[]) {
    mapKategori.current.clear();
    for (const kategori of data) {
      mapKategori.current.set(kategori.id, kategori);
    }
  }

  async function getDaftarKategori() {
    try {
      const response = await konektorBackend.get("/api/categories");
      const dto: any[] = await response.json();
      setDaftarKategori(dto.map((d) => dtoToKategori(d)));
    } catch (e: any) {
      setMasterError(e);
      throw e;
    }
  }

  async function getTiket() {
    try {
      const response = await konektorBackend.get(`/api/tiket/${idtiket}`);
      const body = (await response.json()) as {
        success: true;
        data: TiketDetailResponseDto; // ← pakai TiketDetailResponseDto
      };
      const tiketBaru = dtoToTiket(body.data);
      tiketBaru.kategori =
        mapKategori.current.get(tiketBaru.idKategori) || null;
      setTiket(tiketBaru);
      setPesanTiket(body.data.pesanTiket.map(dtoToPesanTiket)); // ← ekstrak pesan
    } catch (e: any) {
      setMasterError(e);
    } finally {
      setLoading(false);
    }
  }

  function handlePesanTerkirim(pesanBaru: PesanTiket) {
    setPesanTiket((prev) => [...prev, pesanBaru]);
  }

  function handleResolved() {
    setTiket((prev) =>
      prev ? { ...prev, status: StatusTiket.Resolved } : prev,
    );
  }

  useEffect(() => {
    getDaftarKategori().then(() => getTiket());
  }, [idtiket]);

  useEffect(() => {
    if (!loading && pesanTiket.length > 0) {
      if (refTombolResolve && refTombolResolve.current) {
        refTombolResolve.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [loading]);

  if (loading) return <HalamanLoading />;

  return (
    <main className="bg-white min-h-default">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <BackToTicketsLink />

        {tiket && (
          <>
            <TicketDetailCard tiket={tiket} />
            <ConversationCard
              ref={refTombolResolve}
              idChat={tiket.idChat}
              pesanTiket={pesanTiket}
              status={tiket.status}
              onPesanTerkirim={handlePesanTerkirim}
              onResolved={handleResolved}
            />
          </>
        )}
      </div>
    </main>
  );
}
