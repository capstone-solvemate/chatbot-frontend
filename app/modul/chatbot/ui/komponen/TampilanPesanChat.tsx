import { PesanChat } from "../../domain/PesanChat";
import type { Chat } from "../../domain/Chat";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import TicketAction from "./TicketAction";
import { useEffect, useRef } from "react";
import TampilanProcessing from "./TampilanProcessing";
import SkeletonMessages from "./SkeletonMessages";

type Props = {
  loading: boolean;
  processing: boolean;
  idChat: bigint | null;
  daftarPesanChat: PesanChat[];
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TampilanPesanChat({
  idChat,
  daftarPesanChat,
  loading,
  processing,
}: Props) {
  let bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full max-w-3xl mx-auto px-8 py-6 text-sm text-gray-400 italic">
          <SkeletonMessages />
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto flex-1 px-8 py-6 space-y-6">
          <BotMessage
            text="Hello! I'm your AI assistant. I can help you with equipment issues, technical questions, and printing problems. How can I assist you today?"
            time={formatTime(new Date())}
          />
          {daftarPesanChat.map((pesanChat) =>
            pesanChat.chatAsisten ? (
              <BotMessage
                key={pesanChat.id}
                text={pesanChat.pesan}
                time={formatTime(pesanChat.tanggalDibuat)}
              />
            ) : (
              <UserMessage
                key={pesanChat.id}
                text={pesanChat.pesan}
                time={formatTime(pesanChat.tanggalDibuat)}
              />
            ),
          )}

          {processing && <TampilanProcessing />}

          {idChat && (
            <TicketAction idChat={idChat.toString()} dialihkanKeTiket={false} />
          )}
        </div>
      )}

      <div ref={bottomRef} />
    </>
  );
}
