import type React from "react";
import type { Route } from "./+types/HalamanDaftarTiketAdmin";
import PageHeader from "./PageHeader";
import TabelTiket from "./TabelTiket";
import { useEffect, useRef, useState } from "react";
import HalamanLoading from "~/dasar/HalamanLoading";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import { dtoToKategori } from "~/modul/settings/kategori/data/converters";
import type { Tiket } from "~/modul/tiket/Tiket";
import type { GetTiketRequestDto } from "../../dto/GetTiketRequestDto";
import { dtoToTiket } from "../../daftar/dto/converters";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Ticket Management" }];
}

export default function HalamanDaftarTiketAdmin(): React.JSX.Element {
  const [loading, setLoading] = useState(true);
  const [daftarKategori, setDaftarKategori] = useState<Kategori[]>([]);
  const [tikets, setTikets] = useState<Tiket[]>([]);
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();

  // Filter state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<number>(0);
  const [filterKategori, setFilterKategori] = useState<number>(0);

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

  async function getDaftarTiket() {
    try {
      const reqData: GetTiketRequestDto = {
        status: filterStatus > 0 ? (filterStatus as 1 | 2 | 3) : null,
        idKategori: filterKategori > 0 ? filterKategori : null,
        kata: debouncedSearch.trim() ? debouncedSearch.trim() : null,
      };
      const response = await konektorBackend.get("/api/tiket", reqData);
      const data = await response.json();
      const tiketsBaru = data.data.map((dto: any) => {
        const tiket = dtoToTiket(dto);
        tiket.idPembuat = dto.idPembuat;
        tiket.namaPembuat = dto.namaPembuat;
        return tiket;
      });
      setTikets(tiketsBaru);
    } catch (e: any) {
      setMasterError(e);
    }
  }

  // Initial load — fetch kategori then tiket together
  useEffect(() => {
    getDaftarKategori().then(() => {
      getDaftarTiket().finally(() => {
        setLoading(false);
      });
    });
  }, []);

  // Re-fetch when status or category filter changes
  useEffect(() => {
    getDaftarTiket();
  }, [filterStatus, filterKategori]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Re-fetch when debounced search changes
  useEffect(() => {
    getDaftarTiket();
  }, [debouncedSearch]);

  return !loading ? (
    <main className="bg-gray-50 text-gray-800 px-6 py-6 min-h-default">
      <PageHeader />
      <TabelTiket
        daftarKategori={daftarKategori}
        tikets={tikets}
        search={search}
        onChangeSearch={setSearch}
        filterStatus={filterStatus}
        onChangeStatus={setFilterStatus}
        filterKategori={filterKategori}
        onChangeKategori={setFilterKategori}
      />
    </main>
  ) : (
    <HalamanLoading />
  );
}
