import type { Route } from "./+types/HalamanChat";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Chat } from "../domain/Chat";
import TampilanPesanChat from "./komponen/TampilanPesanChat";
import { useMasterError } from "~/dasar/hooks/useMasterError";
import { useEnvironment } from "~/dasar/hooks/useEnvironment";
import { useOutletContext } from "react-router";
import type { ContextHalamanChatbot } from "./ContextHalamanChatbot";
import { Environment } from "~/dasar/types/Environment";
import ChatInput from "./komponen/ChatInput";
import { ChatSendingState } from "./parameter/ChatSendingState";
import { PesanChat } from "../domain/PesanChat";
import type { ChatFormData } from "./parameter/ChatFormData";
import UserMessage from "./komponen/UserMessage";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Chat Support" }];
}

export default function HalamanChat() {
  const environment = useEnvironment();

  const { setMasterError } = useMasterError();

  const context = useOutletContext() as ContextHalamanChatbot;
  const [fetchingPesanChat, setFetchingPesanChat] = useState(true);

  const [chat, setChat] = useState<Chat | null>(null);
  const [fetchingChat, setFetchingChat] = useState(true);

  const [sendingState, setSendingState] = useState(ChatSendingState.Idle);
  const [error, setError] = useState<string | null>(null);

  const [pesanChatAkanDikirim, setPesanChatAkanDikirim] =
    useState<PesanChat | null>(null);

  const navigate = useNavigate();

  function handleChatCreated(chat: Chat) {
    // setDaftarChat((prev) => [chat, ...prev]);
    // navigate(`/chat/${chat.id}`);
  }

  // Dipanggil TampilanPesanChat saat WS menerima jawaban/error,
  // agar sedangDiproses di daftarChat ikut terupdate
  function handleChatUpdated(chatBaru: Chat) {
    // setDaftarChat((prev) =>
    //   prev.map((c) => (c.id === chatBaru.id ? chatBaru : c)),
    // );
  }

  function formatTime(date: Date): string {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function fetchPesanChat(idChat: bigint) {
    if (environment === Environment.Mock) {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      if (idChat > 100n) {
        context.onIdChatTidakDitemukan();
      }
      return;
    }
  }

  function onIdChanged() {
    if (context.idChat !== null) {
      fetchPesanChat(context.idChat);
    } else {
      setFetchingChat(false);
      setFetchingPesanChat(false);
    }
  }

  useEffect(() => {
    onIdChanged();
  }, [context.idChat]);

  async function handleSubmit(data: ChatFormData) {
    setPesanChatAkanDikirim(
      new PesanChat(0n, 0n, data.pesan, new Date(), false, false),
    );

    if (chat === null) {
      if (environment === Environment.Mock) {
        if (data.lampiran.length > 0) {
          setSendingState(ChatSendingState.ResizingImages);
          await new Promise<void>((resolve) => setTimeout(resolve, 1000));
        }
        setSendingState(ChatSendingState.CreatingWsConnection);
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));
        setSendingState(ChatSendingState.Sending);
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));
        setSendingState(ChatSendingState.Idle);
        return;
      }
    } else {
    }
  }

  return (
    <div className="grow pb-16">
      <TampilanPesanChat
        chat={null}
        sendingState={sendingState}
        expandSidebar={context.expandSidebar}
        onChatCreated={handleChatCreated}
        onChatUpdated={handleChatUpdated}
      />

      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1 px-8 py-6">
        <div>
          {pesanChatAkanDikirim && (
            <UserMessage
              text={pesanChatAkanDikirim.pesan}
              time={formatTime(pesanChatAkanDikirim.tanggalDibuat)}
            />
          )}
        </div>

        {sendingState !== ChatSendingState.Idle && (
          <div className="text-sm italic text-gray-600 text-end mt-2">
            {sendingState === ChatSendingState.ResizingImages &&
              "Resizing Images..."}

            {sendingState === ChatSendingState.CreatingWsConnection &&
              "Connecting to server..."}

            {sendingState === ChatSendingState.Sending &&
              "Uploading your message..."}
          </div>
        )}
      </div>

      <ChatInput
        expandSidebar={context.expandSidebar}
        onSubmit={handleSubmit}
        disabled={fetchingChat || sendingState !== ChatSendingState.Idle}
        dialihkanKeTiket={chat?.dialihkanKeTiket ?? false}
      />
    </div>
  );
}
