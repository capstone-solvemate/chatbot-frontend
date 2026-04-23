import type React from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextareaField from "./TextAreaField";
import UploadField from "./UploadField";
import FormActions from "./FormActions";

export default function TicketForm(): React.JSX.Element {
  return (
    <form className="space-y-5">
      <InputField
        label="Title"
        required
        placeholder="Brief description of your issue"
      />

      <SelectField label="Category" required />

      <TextareaField label="Description" required />

      <UploadField />

      <FormActions />
    </form>
  );
}
