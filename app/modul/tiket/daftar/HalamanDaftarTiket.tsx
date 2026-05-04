// modul/tiket/daftar/HalamanDaftarTiket.tsx
import type { Route } from "./+types/HalamanDaftarTiket";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import PageHeader from "./PageHeader";
import TicketFilter from "./TicketFilter";
import TicketList from "./TicketList";
import HalamanLoading from "~/dasar/HalamanLoading";
import { dtoToTiket } from "./dto/converters";
import type { Tiket } from "../Tiket";
import { StatusTiket } from "../StatusTiket";
import type { TiketResponseDto } from "./dto/TiketResponseDto";
import { dtoToKategori } from "~/modul/settings/kategori/daftar/converters";
import type { Kategori } from "~/modul/settings/kategori/Kategori";

export type FilterStatus = StatusTiket | "all";

export function meta({}: Route.MetaArgs) {
  return [{ title: "My Tickets" }];
}

export default function HalamanDaftarTiket() {
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();

  const [tikets, setTikets] = useState<Tiket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const mapKategori = useRef(new Map<number, Kategori>());
  const [daftarKategori, _setDaftarKategori] = useState<Kategori[]>([]);
  function setDaftarKategori(data: Kategori[]) {
    mapKategori.current.clear();
    for (const kategori of data) {
      mapKategori.current.set(kategori.id, kategori);
    }

    _setDaftarKategori(data);
  }

  async function getDaftarTiket() {
    try {
      const response = await konektorBackend.get("/api/tiket");
      const body = (await response.json()) as {
        success: boolean;
        data: TiketResponseDto[];
      };
      const daftarTiketBaru = body.data.map((dto) => {
        const tiket = dtoToTiket(dto);
        tiket.kategori = mapKategori.current.get(dto.idKategori) || null;
        return tiket;
      });
      setTikets(daftarTiketBaru);
    } catch (e: any) {
      setMasterError(e);
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

  useEffect(() => {
    getDaftarKategori().then(() =>
      getDaftarTiket().finally(() => setLoading(false)),
    );
  }, []);

  const tiketsTampil =
    filterStatus === "all"
      ? tikets
      : tikets.filter((t) => t.status === filterStatus);

  if (loading) return <HalamanLoading />;

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <PageHeader />
        <TicketFilter active={filterStatus} onSelect={setFilterStatus} />
        <TicketList tikets={tiketsTampil} />
      </div>
    </main>
  );
}
