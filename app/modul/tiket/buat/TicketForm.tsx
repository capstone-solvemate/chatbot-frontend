import type React from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextareaField from "./TextAreaField";
import UploadField from "./UploadField";
import FormActions from "./FormActions";
import type { Kategori } from "~/modul/settings/kategori/Kategori";

interface Props {
  daftarKategori: Kategori[];
}

export default function TicketForm({
  daftarKategori,
}: Props): React.JSX.Element {
  return (
    <form className="space-y-5">
      <InputField
        label="Title"
        required
        placeholder="Brief description of your issue"
      />

      <SelectField
        label="Category"
        required
        options={daftarKategori.map((kategori) => ({
          value: kategori.id.toString(),
          label: kategori.nama,
        }))}
      />

      <TextareaField label="Description" required />

      <UploadField />

      <FormActions />
    </form>
  );
}
