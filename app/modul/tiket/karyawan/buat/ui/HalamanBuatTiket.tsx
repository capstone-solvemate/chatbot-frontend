import TicketCard from "./TicketCard";
import { useEffect, useRef, useState } from "react";
import HalamanLoading from "~/dasar/HalamanLoading";
import { Kategori } from "~/modul/settings/kategori/Kategori";
import { dtoToKategori } from "~/modul/settings/kategori/data/converters";
import type { BuatTiketRequestDto } from "../../api/dto/BuatTiketRequestDto";
import { useMasterError } from "~/dasar/hooks/useMasterError";
import { useNavigate } from "react-router";
import type { Route } from "./+types/HalamanBuatTiket";
import { useKonektorRestApi } from "~/dasar/hooks/useKonektorRestApi";
import { KonektorBackendTiketKaryawan } from "../../api/KonektorBackendTiketKaryawan";
import { HttpError } from "~/dasar/api/rest/KonektorRestApi";
import { useNotifikasi } from "~/dasar/hooks/useNotifikasi";

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

  const refDaftarLampiran = useRef<File[]>([]);
  const [daftarLampiran, setDaftarLampiran] = useState<File[]>([]);
  const [droppingFile, setDroppingFile] = useState(false);

  const { notify } = useNotifikasi();

  const supportedMimeLampiran = ["image/png", "image/jpeg"];
  const MAX_SIZE_LAMPIRAN = 10 * 1024 * 1024; // 10 MB

  let dragCounter = 0;

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

  useEffect(() => {
    refDaftarLampiran.current = daftarLampiran;
  }, [daftarLampiran]);

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

  async function handleSubmit(payload: BuatTiketRequestDto) {
    try {
      payload.daftarLampiran = refDaftarLampiran.current;
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
            droppingFile={droppingFile}
            daftarLampiran={daftarLampiran}
            onTambahLampiran={(files) => tambahLampiran(files)}
            onHapusLampiran={handleHapusLampiran}
            supportedMimeLampiran={supportedMimeLampiran}
          />
        </div>
      </div>
    </main>
  );
}
