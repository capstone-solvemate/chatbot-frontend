import type React from "react";
import { useState } from "react";
import SelectField from "./SelectField";
import TextareaField from "./TextAreaField";
import UploadField from "./UploadField";
import FormActions from "./FormActions";
import type { Kategori } from "~/modul/settings/kategori/Kategori";
import type { BuatTiketRequestDto } from "./dto/BuatTiketRequestDto";
import { useForm } from "@felte/react";
import * as yup from "yup";
import { validator } from "@felte/validator-yup";
import InputField from "~/dasar/ui/komponen/InputField";

interface Props {
  daftarKategori: Kategori[];
  idChat: string;
  onSubmit: (payload: BuatTiketRequestDto) => Promise<void>;
}

const skemaValidasi = yup.object({
  judul: yup.string().required("This field is required"),
  kategori: yup.string().required("A category must be selected"),
  deskripsi: yup.string().required("This field is required"),
});

export default function TicketForm({
  daftarKategori,
  idChat,
  onSubmit,
}: Props): React.JSX.Element {
  const { form, errors, isSubmitting } = useForm({
    onSubmit: async (data) => {
      const payload: BuatTiketRequestDto = {
        judul: data.judul,
        deskripsi: data.deskripsi,
        idKategori: data.kategori,
        idChat: idChat,
      };
      await onSubmit(payload);
    },
    extend: [validator({ schema: skemaValidasi })],
  });

  return (
    <form ref={form} className="space-y-5" method="POST">
      <InputField
        label="Title"
        required
        placeholder="Brief description of your issue"
        name="judul"
        error={errors().judul?.[0]}
      />

      <SelectField
        label="Category"
        required
        options={daftarKategori.map((kategori) => ({
          value: kategori.id.toString(),
          label: kategori.nama,
        }))}
        name="kategori"
        error={errors().kategori?.[0]}
      />

      <TextareaField
        label="Description"
        required
        name="deskripsi"
        error={errors().deskripsi?.[0]}
      />

      <UploadField />

      <FormActions idChat={idChat} submitting={isSubmitting()} />
    </form>
  );
}
