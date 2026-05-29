import IkonGambar from "~/komponen/ikon/IkonGambar";
import IkonKirim from "~/komponen/ikon/IkonKirim";
import { useState } from "react";
import { IkonTiket } from "~/komponen/ikon/IkonTiket";
import type { ChatFormData } from "../parameter/ChatFormData";
import { useForm } from "@felte/react";
import * as yup from "yup";
import { validator } from "@felte/validator-yup";

type Props = {
  expandSidebar: boolean;
  onSubmit: (data: ChatFormData) => Promise<void>;
  disabled: boolean;
  dialihkanKeTiket: boolean;
};

export default function ChatInput({
  expandSidebar,
  onSubmit,
  disabled,
  dialihkanKeTiket,
}: Props) {
  const skemaValidasi = yup.object({
    pesan: yup.string().required("this field is required"),
  });
  const { form, isSubmitting, isValid, reset } = useForm({
    extend: [validator({ schema: skemaValidasi })],
    onSubmit: async (data: any) => {
      const formData: ChatFormData = {
        pesan: (data.pesan as string).trim(),
        lampiran: [],
      };

      reset();

      await onSubmit(formData);
    },
  });

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.getElementById("form_chat_submit_btn")?.click();
    }
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
          <form method="POST" ref={form} className="flex w-full gap-3">
            <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-2 bg-white">
              <button
                type="button"
                className="cursor-pointer"
                disabled={disabled || isSubmitting()}
              >
                <IkonGambar />
              </button>

              <input
                name="pesan"
                type="text"
                onKeyDown={handleKeyDown}
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
          </form>
        )}
      </div>
    </div>
  );
}
