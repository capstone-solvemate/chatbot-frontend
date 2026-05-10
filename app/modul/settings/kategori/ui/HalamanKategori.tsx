import type React from "react";
import HeaderDaftarKategori from "./HeaderDaftarKategori";
import DaftarKategori from "./DaftarKategori";
import KategoriFormCard from "./KategoriFormCard";
import KategoriDeleteConfirmation from "./KategoriDeleteConfirmation";
import type { Route } from "./+types/HalamanKategori";
import { useEffect, useRef, useState } from "react";
import { Kategori } from "../Kategori";
import { dtoToKategori } from "../data/converters";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";
import { Button } from "~/komponen/Button";
import IkonTambah from "~/komponen/ikon/IkonTambah";
import HalamanLoading from "~/dasar/HalamanLoading";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Categories" }];
}

type FormState = {
  oldKategori: Kategori | null;
};

export default function HalamanDaftarKategori(): React.JSX.Element {
  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();

  const [daftarKategori, setDaftarKategori] = useState<Kategori[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state: null = hidden, { oldKategori: null } = new, { oldKategori: Kategori } = edit
  const [formState, setFormState] = useState<FormState | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Delete state
  const [kategoriAkanDihapus, setKategoriAkanDihapus] =
    useState<Kategori | null>(null);
  const [menghapus, setMenghapus] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  async function getDaftarKategori() {
    try {
      const response = await konektorBackend.get("/api/admin/categories");
      const dto: any[] = await response.json();
      setDaftarKategori(dto.map((dtoItem) => dtoToKategori(dtoItem)));
    } catch (e: any) {
      setMasterError(e);
    }
  }

  useEffect(() => {
    getDaftarKategori().finally(() => setLoading(false));
  }, []);

  // Scroll ke form saat muncul
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [formState]);

  function handleShowNewForm() {
    setFormState({ oldKategori: null });
  }

  function handleEdit(kategori: Kategori) {
    setFormState({ oldKategori: kategori });
  }

  function handleCloseForm() {
    setFormState(null);
  }

  async function handleSubmit(nama: string, oldKategori: Kategori | null) {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (oldKategori) {
        // Update
        await konektorBackend.put(`/api/admin/categories/${oldKategori.id}`, {
          nama,
        });
      } else {
        // Create
        await konektorBackend.post("/api/admin/categories", { nama });
      }
      await getDaftarKategori();
      setFormState(null);
    } catch (e: any) {
      setMasterError(e);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleKonfirmasiHapus() {
    if (!kategoriAkanDihapus || menghapus) return;
    setMenghapus(true);
    try {
      await konektorBackend.delete(
        `/api/admin/categories/${kategoriAkanDihapus.id}`,
      );
      await getDaftarKategori();
    } catch (e: any) {
      setMasterError(e);
    } finally {
      setMenghapus(false);
      setKategoriAkanDihapus(null);
    }
  }

  if (loading) return <HalamanLoading />;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <HeaderDaftarKategori />

      {formState ? (
        <div ref={formRef}>
          <KategoriFormCard
            oldKategori={formState.oldKategori}
            onClose={handleCloseForm}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </div>
      ) : (
        <Button
          className="mt-5 text-sm! ps-2! pe-3! py-2! gap-1!"
          leftIcon={<IkonTambah className="h-5" />}
          onClick={handleShowNewForm}
        >
          Add New Category
        </Button>
      )}

      <DaftarKategori
        daftarKategori={daftarKategori}
        onEdit={handleEdit}
        onHapus={(k) => setKategoriAkanDihapus(k)}
      />

      {kategoriAkanDihapus && (
        <KategoriDeleteConfirmation
          kategori={kategoriAkanDihapus}
          isDeleting={menghapus}
          onCancel={() => setKategoriAkanDihapus(null)}
          onConfirm={handleKonfirmasiHapus}
        />
      )}
    </div>
  );
}
