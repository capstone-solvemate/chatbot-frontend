import InputField from "~/dasar/ui/komponen/InputField";
import { Button, ButtonColor } from "~/komponen/Button";
import IkonTutup from "~/komponen/ikon/IkonTutup";
import * as yup from "yup";
import { useForm } from "@felte/react";
import { validator } from "@felte/validator-yup";

type Props = {
  isSharing: boolean;
  onBatal: () => void;
  onShare: (email: string) => Promise<void>;
};

const skemaValidasi = yup.object({
  share_email_recipient: yup
    .string()
    .required("This field is required")
    .email("This field value must be a valid email address"),
});

export default function PopupShare({ onBatal, onShare, isSharing }: Props) {
  const { form, errors } = useForm({
    onSubmit: async (data) => {
      await onShare(data["share_email_recipient"]);
    },
    extend: [
      validator({
        schema: skemaValidasi,
      }),
    ],
  });

  return (
    <form
      method="POST"
      ref={form}
      className="fixed top-0 left-0 w-full h-full bg-gray-800/70 backdrop-blur-sm z-50 print:hidden"
    >
      <div className="w-full mx-auto max-w-md my-8 bg-white p-6 rounded-md border-gray-300">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="font-semibold text-lg">Generate Summary Report</h3>
          <button onClick={onBatal} className="cursor-pointer p-2">
            <IkonTutup />
          </button>
        </div>

        <div className="text-sm py-4 mt-4 gap-1 flex flex-col rounded-md">
          <InputField
            label="Recipient Email"
            name="share_email_recipient"
            error={errors()["share_email_recipient"]?.[0]}
          />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button className="text-sm py-2! grow" type="submit">
            Send Email
          </Button>
        </div>
      </div>
    </form>
  );
}
