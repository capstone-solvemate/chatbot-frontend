// modul/tiket/detail/ConversationCard.tsx

import ConversationHeader from "./ConversationHeader";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import ResolveButton from "./ResolveButton";
import type { PesanTiket } from "../PesanTiket";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import type { PesanTiketResponseDto } from "../daftar/dto/TiketResponseDto";
import { dtoToPesanTiket } from "../daftar/dto/converters";

type Props = {
  idTiket: string;
  pesanTiket: PesanTiket[];
  onPesanTerkirim: (pesan: PesanTiket) => void;
};

export default function ConversationCard({
  idTiket,
  pesanTiket,
  onPesanTerkirim,
}: Props) {
  const [
    _a,
    stateOtentikasi,
    konektorBackend,
    _c,
    setMasterError,
  ]: ContextType = useOutletContext();

  async function handleKirim(teks: string) {
    try {
      const response = await konektorBackend.post(
        `/api/tiket/${idTiket}/pesan`,
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
      <ResolveButton />
    </div>
  );
}
