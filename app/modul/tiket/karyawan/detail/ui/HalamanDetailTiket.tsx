// modul/tiket/detail/HalamanDetailTiket.tsx

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import type { Route } from "./+types/HalamanDetailTiket";
import type {
  PesanTiketResponseDto,
  TiketDetailResponseDto,
} from "../../../daftar/dto/TiketResponseDto";
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
import DropHere from "./DropHere";
import { useNotifikasi } from "~/dasar/hooks/useNotifikasi";

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
  const [droppingFile, setDroppingFile] = useState(false);

  const refDaftarLampiran = useRef<File[]>([]);
  const [daftarLampiran, setDaftarLampiran] = useState<File[]>([]);
  const { notify } = useNotifikasi();

  const supportedMimeLampiran = ["image/png", "image/jpeg"];
  const MAX_SIZE_LAMPIRAN = 10 * 1024 * 1024; // 10 MB

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
    setDaftarLampiran([]);
  }

  function handleResolved() {
    setTiket((prev) =>
      prev ? { ...prev, status: StatusTiket.Resolved } : prev,
    );
  }

  // Drop files
  function verifikasiMimeLampiran(file: File): boolean {
    return supportedMimeLampiran.includes(file.type);
  }

  function tambahLampiran(files: File[]) {
    const daftarLampiranTerverifikasi: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const hasil = verifikasiMimeLampiran(file);
      if (!hasil) {
        notify(
          "Unsupported File",
          `File no ${i + 1} was ignored. Only PNG and JPEG files are supported.`,
        );
        continue;
      }

      if (file.size > MAX_SIZE_LAMPIRAN) {
        notify(
          "File Size Limit Exceeded",
          `File no ${i + 1} was ignored. The maximum allowed size is 10 MB per file. File size: ${Math.ceil(file.size / 1024 / 1024)} MB`,
        );
        continue;
      }

      daftarLampiranTerverifikasi.push(files[i]);
    }

    setDaftarLampiran((daftarLama) => {
      if (daftarLama.length === 5) {
        notify("Max Files Reached", `You can upload a maximum of 5 files.`);
        return daftarLama;
      }

      if (daftarLama.length + daftarLampiranTerverifikasi.length > 5) {
        const startIndexFileTerbuang =
          daftarLampiranTerverifikasi.length - daftarLama.length + 1;
        notify(
          "Max Files Reached",
          `Files no ${startIndexFileTerbuang}-${daftarLampiranTerverifikasi.length} ignored. Maximum uploads is 5 files.`,
        );
      }

      const daftarBaru = [...daftarLama];
      for (const lampiran of daftarLampiranTerverifikasi) {
        daftarBaru.push(lampiran);
        if (daftarBaru.length >= 5) {
          break;
        }
      }
      return daftarBaru;
    });
  }

  let dragCounter = 0;
  function dragHasFiles(e: DragEvent) {
    return e.dataTransfer?.types?.includes("Files");
  }

  function handleDragEnter(e: DragEvent) {
    e.preventDefault();
    if (!dragHasFiles(e)) return;

    dragCounter++;
    setDroppingFile(true);
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    if (!dragHasFiles(e)) return;

    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      setDroppingFile(false);
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();

    dragCounter = 0;
    setDroppingFile(false);

    const files = Array.from(e.dataTransfer!.files);
    tambahLampiran(files);
  }

  function handleHapusLampiran(index: number) {
    setDaftarLampiran((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleKirim(teks: string) {
    if (!tiket) return;

    try {
      const reqData = new FormData();
      for (const lampiran of daftarLampiran) {
        reqData.append("files", lampiran);
      }
      reqData.append("pesan", teks);
      const response = await konektorBackend.post(
        `/api/tiket/${tiket.idChat}/pesan`,
        reqData,
      );
      const body = (await response.json()) as {
        success: true;
        data: PesanTiketResponseDto;
      };
      handlePesanTerkirim(dtoToPesanTiket(body.data));
    } catch (e: any) {
      setMasterError(e);
    }
  }

  useEffect(() => {
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  useEffect(() => {
    refDaftarLampiran.current = daftarLampiran;
  }, [daftarLampiran]);

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
      {droppingFile && <DropHere />}

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <BackToTicketsLink />

        {tiket && (
          <>
            <TicketDetailCard tiket={tiket} />
            <ConversationCard
              daftarLampiran={daftarLampiran}
              ref={refTombolResolve}
              idChat={tiket.idChat}
              pesanTiket={pesanTiket}
              status={tiket.status}
              onResolved={handleResolved}
              onTambahLampiran={(files) => tambahLampiran(files)}
              onHapusLampiran={handleHapusLampiran}
              onKirim={handleKirim}
              supportedMimeLampiran={supportedMimeLampiran}
            />
          </>
        )}
      </div>
    </main>
  );
}
