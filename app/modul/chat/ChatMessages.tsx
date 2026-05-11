import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import TicketAction from "./TicketAction";
import type { PesanChat } from "./PesanChat";
import type { Chat } from "./Chat";

type Props = {
  daftarPesanChat: PesanChat[];
  isSending: boolean;
  chat: Chat | null;
  showTicketAction: boolean;
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatMessages({
  daftarPesanChat,
  isSending,
  chat,
  showTicketAction,
}: Props) {
  return (
    <div className="w-full max-w-3xl mx-auto flex-1 px-8 py-6 space-y-6">
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

      {isSending && (
        <div className="flex gap-3 items-start max-w-xl">
          <div className="w-10 h-10 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <span className="text-xs font-medium">AI</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500">
            <span className="flex gap-1 items-center">
              <span className="animate-bounce [animation-delay:0ms]">·</span>
              <span className="animate-bounce [animation-delay:150ms]">·</span>
              <span className="animate-bounce [animation-delay:300ms]">·</span>
            </span>
          </div>
        </div>
      )}

      {chat && (chat.dialihkanKeTiket || showTicketAction) && (
        <TicketAction
          idChat={chat.id}
          dialihkanKeTiket={chat.dialihkanKeTiket}
        />
      )}
    </div>
  );
}
