import IkonGambar from "~/komponen/ikon/IkonGambar";
import IkonKirim from "~/komponen/ikon/IkonKirim";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { IkonTiket } from "~/komponen/ikon/IkonTiket";
import type { ChatFormData } from "../parameter/ChatFormData";
import { useForm } from "@felte/react";
import * as yup from "yup";
import { validator } from "@felte/validator-yup";
import UploadImagePreview from "./UploadImagePreview";

type Props = {
  expandSidebar: boolean;
  onSubmit: (data: ChatFormData) => Promise<void>;
  disabled: boolean;
  dialihkanKeTiket: boolean;
};

const allowedFileMimes = ["image/jpeg", "image/png"];

export default function ChatInput({
  expandSidebar,
  onSubmit,
  disabled,
  dialihkanKeTiket,
}: Props) {
  const skemaValidasi = yup.object({
    pesan: yup.string().required("this field is required"),
  });
  const { form, errors, isSubmitting, isValid, reset, setTouched } = useForm({
    extend: [validator({ schema: skemaValidasi })],
    onSubmit: async (data: any) => {
      const formData: ChatFormData = {
        pesan: (data.pesan as string).trim(),
        lampiran: uploadFilesRef.current,
      };

      reset();
      setTimeout(() => setTouched({ pesan: false }), 0);
      hapusSeluruhUploadFile();

      await onSubmit(formData);
    },
  });

  const uploadFilesRef = useRef<File[]>([]);

  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  useEffect(() => {
    uploadFilesRef.current = uploadFiles;
  }, [uploadFiles]);

  const [previewFiles, setPreviewFiles] = useState<
    { id: string; url: string }[]
  >([]);

  function tambahUploadFiles(files: File[]) {
    setUploadFiles((prev) => [...prev, ...files]);
    setPreviewFiles((prev) => [
      ...prev,
      ...files.map((file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
      })),
    ]);
  }

  function hapusUploadFile(i: number) {
    if (!confirm("Are you sure to remove this image?")) {
      return;
    }
    setPreviewFiles((prev) => {
      URL.revokeObjectURL(prev[i].url);
      return prev.filter((_, index) => index !== i);
    });
    setUploadFiles((prev) => prev.filter((_, index) => index !== i));
  }

  function hapusSeluruhUploadFile() {
    for (const previewFile of previewFiles) {
      URL.revokeObjectURL(previewFile.url);
    }
    setPreviewFiles([]);
    setUploadFiles([]);
  }

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  function handlePilihFile() {
    inputFileRef.current?.click();
  }

  function handleFileDipilih(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);

    const acceptedFiles: File[] = [];
    for (const file of files) {
      if (allowedFileMimes.includes(file.type)) {
        acceptedFiles.push(file);
      } else {
        console.error(`File with mime ${file.type} disallowed`);
      }
    }

    tambahUploadFiles(acceptedFiles);

    e.target.value = "";
  }

  return (
    <div
      className={`fixed z-10 bottom-0 left-0 bg-gray-50 w-full ${expandSidebar ? "ps-64" : "ps-0"} transition-all ease-out`}
    >
      <div className="p-4 pt-0 flex items-center gap-3 w-full max-w-3xl mx-auto">
        {dialihkanKeTiket ? (
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-sm text-gray-400 select-none">
            <IkonTiket className="w-4 h-4 shrink-0" />
            <span>This chat is locked. Continue through your ticket.</span>
          </div>
        ) : (
          <form
            method="POST"
            ref={form}
            className="flex w-full flex-col"
            id="form_message"
          >
            {previewFiles.length > 0 && (
              <div className="flex mb-2 gap-4">
                {previewFiles.map((preview, i) => (
                  <UploadImagePreview
                    key={preview.id}
                    src={preview.url}
                    onDelete={() => hapusUploadFile(i)}
                  />
                ))}
              </div>
            )}
            <div className="flex gap-3 items-center">
              <div
                className={`flex-1 flex items-center border ${errors().pesan ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"} rounded-lg px-3 py-2 gap-2`}
              >
                <button
                  type="button"
                  className="cursor-pointer"
                  disabled={disabled || isSubmitting()}
                  onClick={handlePilihFile}
                >
                  <IkonGambar />
                </button>

                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  ref={inputFileRef}
                  className="hidden"
                  onChange={handleFileDipilih}
                />

                <input
                  name="pesan"
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 outline-none text-sm"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                id="form_chat_submit_btn"
                className={`w-10 h-10 cursor-pointer rounded-lg ${isValid() ? "bg-blue-600" : "bg-gray-500"} flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}
                disabled={disabled || isSubmitting()}
              >
                <IkonKirim className="w-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
