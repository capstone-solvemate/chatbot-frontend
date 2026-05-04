// modul/tiket/detail/HalamanDetailTiket.tsx

import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import type { Route } from "./+types/HalamanDetailTiket";
import type { ContextType } from "~/dasar/ContextType";
import type { TiketResponseDto } from "../daftar/dto/TiketResponseDto";
import { dtoToTiket } from "../daftar/dto/converters";
import { Tiket } from "../Tiket";
import BackToTicketsLink from "./BackToTicketsLink";
import TicketDetailCard from "./TicketDetailCard";
import ConversationCard from "./ConversationCard";
import HalamanLoading from "~/dasar/HalamanLoading";
import Navbar from "~/komponen/Navbar";
import type { Kategori } from "~/modul/settings/kategori/Kategori";
import { dtoToKategori } from "~/modul/settings/kategori/daftar/converters";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Detail Tiket" }];
}

export default function HalamanDetailTiket() {
  const { idtiket } = useParams<{ idtiket: string }>();
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();

  const [tiket, setTiket] = useState<Tiket | null>(null);
  const [loading, setLoading] = useState(true);

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
      const daftarKategoriBaru = dto.map((dtoItem) => dtoToKategori(dtoItem));
      setDaftarKategori(daftarKategoriBaru);
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
        data: TiketResponseDto;
      };
      const tiket = dtoToTiket(body.data);
      tiket.kategori = mapKategori.current.get(tiket.idKategori) || null;
      setTiket(tiket);
    } catch (e: any) {
      setMasterError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDaftarKategori().then(() => getTiket());
  }, [idtiket]);

  if (loading) return <HalamanLoading />;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pb-8 pt-28 space-y-6">
        <BackToTicketsLink />

        {tiket && (
          <>
            <TicketDetailCard tiket={tiket} />
            <ConversationCard idChat={tiket.idChat} />
          </>
        )}
      </div>
    </div>
  );
}
