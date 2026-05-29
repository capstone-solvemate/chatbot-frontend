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

  async function handleSubmit() {
    if (chat === null) {
    } else {
    }
  }

  return (
    <div className="grow pb-16">
      <TampilanPesanChat
        chat={null}
        expandSidebar={context.expandSidebar}
        onChatCreated={handleChatCreated}
        onChatUpdated={handleChatUpdated}
      />

      <ChatInput
        expandSidebar={context.expandSidebar}
        onSend={handleSubmit}
        disabled={fetchingChat}
        dialihkanKeTiket={chat?.dialihkanKeTiket ?? false}
      />
    </div>
  );
}
