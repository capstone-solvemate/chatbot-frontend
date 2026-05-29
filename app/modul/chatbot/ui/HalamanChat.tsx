import type { Route } from "./+types/HalamanChat";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Chat } from "../domain/Chat";
import TampilanPesanChat from "./komponen/TampilanPesanChat";
import { useMasterError } from "~/dasar/hooks/useMasterError";
import { useEnvironment } from "~/dasar/hooks/useEnvironment";
import { useOutletContext } from "react-router";
import type { ContextHalamanChatbot } from "./ContextHalamanChatbot";
import { Environment } from "~/dasar/types/Environment";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Chat Support" }];
}

export default function HalamanChat() {
  const environment = useEnvironment();

  const { setMasterError } = useMasterError();

  const context = useOutletContext() as ContextHalamanChatbot;
  const [fetchingPesanChat, setFetchingPesanChat] = useState(true);

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
      if (idChat > 100n) {
        context.onIdChatTidakDitemukan();
      }
      return;
    }
  }

  function onPageMounted() {
    if (context.idChat !== null) {
      fetchPesanChat(context.idChat);
    } else {
      setFetchingPesanChat(false);
    }
  }

  useEffect(() => {
    onPageMounted();
  }, [context.idChat]);

  return (
    <TampilanPesanChat
      chat={null}
      expandSidebar={context.expandSidebar}
      onChatCreated={handleChatCreated}
      onChatUpdated={handleChatUpdated}
    />
  );
}
