// modul/tiket/detail/ConversationCard.tsx

import ConversationHeader from "./ConversationHeader";
import MessageInput from "./MessageInput";
import ResolveButton from "./ResolveButton";
import { useStateOtentikasi } from "~/dasar/hooks/useStateOtentikasi";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";
import React from "react";
import type { PesanTiket } from "~/modul/tiket/PesanTiket";
import type { PesanTiketResponseDto } from "~/modul/tiket/daftar/dto/TiketResponseDto";
import { dtoToPesanTiket } from "~/modul/tiket/daftar/dto/converters";
import MessageItem from "./MessageItem";
import { StatusTiket } from "~/modul/tiket/StatusTiket";

type Props = {
  idChat: string;
  pesanTiket: PesanTiket[];
  status: StatusTiket;
  onPesanTerkirim: (pesan: PesanTiket) => void;
  onResolved: () => void;
};

const ConversationCard = React.forwardRef<HTMLButtonElement, Props>(
  ({ idChat, pesanTiket, status, onPesanTerkirim, onResolved }, ref) => {
    const stateOtentikasi = useStateOtentikasi();
    const konektorBackend = useKonektorBackend();
    const { setMasterError } = useMasterError();

    async function handleKirim(teks: string) {
      try {
        const response = await konektorBackend.post(
          `/api/tiket/${idChat}/pesan`,
          { pesan: teks },
        );
        const body = (await response.json()) as {
          success: true;
          data: PesanTiketResponseDto;
        };
        onPesanTerkirim(dtoToPesanTiket(body.data));
      } catch (e: any) {
        setMasterError(e);
      }
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
        <MessageInput onKirim={handleKirim} />
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
