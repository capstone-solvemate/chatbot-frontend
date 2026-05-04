import type React from "react";
import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextareaField from "./TextAreaField";
import UploadField from "./UploadField";
import FormActions from "./FormActions";
import type { Kategori } from "~/modul/settings/kategori/Kategori";
import type { BuatTiketRequestDto } from "./dto/BuatTiketRequestDto";

interface Props {
  daftarKategori: Kategori[];
  idChat: string;
  onSubmit: (payload: BuatTiketRequestDto) => Promise<void>;
}

interface FieldErrors {
  judul?: string;
  deskripsi?: string;
  idKategori?: string;
}

export default function TicketForm({
  daftarKategori,
  idChat,
  onSubmit,
}: Props): React.JSX.Element {
  const [judul, setJudul] = useState("");
  const [idKategori, setIdKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setFieldErrors({});
    setSubmitting(true);

    try {
      await onSubmit({
        judul,
        deskripsi,
        idChat,
        idKategori: parseInt(idKategori),
      });
    } catch (e: any) {
      // Error 422: validasi field dari backend
      if (Array.isArray(e?.payload)) {
        const errors: FieldErrors = {};
        for (const item of e.payload) {
          errors[item.field as keyof FieldErrors] = item.message;
        }
        setFieldErrors(errors);
      } else {
        // Error lain (401, 403, network, dll) — lempar ke atas ke HalamanBuatTiket
        throw e;
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <InputField
        label="Title"
        required
        placeholder="Brief description of your issue"
        value={judul}
        onChange={setJudul}
        error={fieldErrors.judul}
      />

      <SelectField
        label="Category"
        required
        options={daftarKategori.map((kategori) => ({
          value: kategori.id.toString(),
          label: kategori.nama,
        }))}
        value={idKategori}
        onChange={setIdKategori}
        error={fieldErrors.idKategori}
      />

      <TextareaField
        label="Description"
        required
        value={deskripsi}
        onChange={setDeskripsi}
        error={fieldErrors.deskripsi}
      />

      <UploadField />

      <FormActions submitting={submitting} />
    </form>
  );
}
