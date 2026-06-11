import { PesanChat } from "../../domain/PesanChat";
import type { Chat } from "../../domain/Chat";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import TicketAction from "./TicketAction";
import { useEffect, useRef } from "react";
import IkonBot from "~/komponen/ikon/IkonBot";

type Props = {
  loading: boolean;
  processing: boolean;
  chat: Chat | null;
  daftarPesanChat: PesanChat[];
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TampilanPesanChat({
  chat,
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
          Loading messages...
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto flex-1 px-8 py-6 space-y-6">
          <BotMessage
            text="Hello! I'm your AI assistant. I can help you with equipment issues, technical questions, and printing problems. How can I assist you today?"
            time={formatTime(chat?.tanggalDibuat ?? new Date())}
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

          {processing && (
            <div className="flex gap-3 items-start max-w-xl">
              <div className="w-10 h-10 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <span className="text-xs font-medium">
                  <IkonBot />
                </span>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500">
                <span className="flex gap-1 items-center">
                  <span className="animate-bounce [animation-delay:0ms]">
                    ·
                  </span>
                  <span className="animate-bounce [animation-delay:150ms]">
                    ·
                  </span>
                  <span className="animate-bounce [animation-delay:300ms]">
                    ·
                  </span>
                </span>
              </div>
            </div>
          )}

          {chat && chat.dialihkanKeTiket && (
            <TicketAction
              idChat={chat.id.toString()}
              dialihkanKeTiket={chat.dialihkanKeTiket}
            />
          )}
        </div>
      )}

      <div ref={bottomRef} />
    </>
  );
}
