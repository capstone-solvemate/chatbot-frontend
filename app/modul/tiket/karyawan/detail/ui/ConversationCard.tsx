// modul/tiket/detail/ConversationCard.tsx

import ConversationHeader from "./ConversationHeader";
import MessageInput from "./MessageInput";
import ResolveButton from "./ResolveButton";
import { useStateOtentikasi } from "~/dasar/hooks/useStateOtentikasi";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";
import React, { useEffect, useState } from "react";
import type { PesanTiket } from "~/modul/tiket/PesanTiket";
import MessageItem from "./MessageItem";
import { StatusTiket } from "~/modul/tiket/StatusTiket";
import IkonHapus from "~/komponen/ikon/IkonHapus";

type Props = {
  idChat: string;
  pesanTiket: PesanTiket[];
  status: StatusTiket;
  daftarLampiran: File[];
  onKirim: (pesan: string) => Promise<void>;
  onResolved: () => void;
  onTambahLampiran: (daftarLampiran: File[]) => void;
  onHapusLampiran: (index: number) => void;
  supportedMimeLampiran: string[];
};

const ConversationCard = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      idChat,
      pesanTiket,
      status,
      onKirim,
      onResolved,
      onTambahLampiran,
      daftarLampiran,
      onHapusLampiran,
      supportedMimeLampiran,
    },
    ref,
  ) => {
    const stateOtentikasi = useStateOtentikasi();
    const konektorBackend = useKonektorBackend();
    const { setMasterError } = useMasterError();

    const [previews, setPreviews] = useState<string[]>([]);

    useEffect(() => {
      const urls = daftarLampiran.map((file) => URL.createObjectURL(file));

      setPreviews(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [daftarLampiran]);

    function handleHapusLampiran(i: number) {
      if (!confirm(`Are you sure to delete attachment no ${i + 1}`)) return;

      onHapusLampiran(i);
    }

    async function handleResolve() {
      await konektorBackend.patch(`/api/tiket/${idChat}/status`, { status: 3 });
      onResolved();
    }

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <ConversationHeader />
        {pesanTiket.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No messages yet.
          </p>
        ) : (
          <div className="space-y-4">
            {pesanTiket.map((pesan) => (
              <MessageItem
                key={pesan.id}
                pesan={pesan}
                isOwn={pesan.idPembuat === stateOtentikasi.pengguna?.id}
              />
            ))}
          </div>
        )}
        <hr className="border-gray-200" />
        {previews.length > 0 && (
          <div className="flex items-center gap-5 mt-4 mb-2">
            {previews.map((preview, i) => (
              <div className="relative" key={i}>
                <div className="rounded-md overflow-hidden">
                  <img className="object-cover w-20 h-20" src={preview} />
                </div>
                <button
                  type="button"
                  className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer bg-red-100 hover:bg-red-200 transition-colors rounded-full"
                  onClick={() => handleHapusLampiran(i)}
                >
                  <IkonHapus className="w-3 h-3 text-red-700" />
                </button>
              </div>
            ))}
          </div>
        )}
        <MessageInput
          onKirim={onKirim}
          onTambahLampiran={onTambahLampiran}
          supportedMimeLampiran={supportedMimeLampiran}
        />
        <ResolveButton
          ref={ref}
          onResolve={handleResolve}
          isResolved={status === StatusTiket.Resolved}
        />
      </div>
    );
  },
);

export default ConversationCard;
