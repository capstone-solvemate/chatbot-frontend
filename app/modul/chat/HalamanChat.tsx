import PageHeader from "./PageHeader";
import type { Route } from "./+types/HalamanChat";
import { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import type { Chat } from "./Chat";
import HalamanLoading from "~/dasar/HalamanLoading";
import { dtoToChat } from "./dto/converters";
import TampilanPesanChat from "./TampilanPesanChat";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";

const KEY_LS_EXPAND_SIDEBAR = "expand_sidebar_chat_karyawan";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Chat Support" }];
}

export default function HalamanChat() {
  const oldExpandSidebarConfig = localStorage.getItem(KEY_LS_EXPAND_SIDEBAR);
  const [expandSidebar, _setExpandSidebar] = useState(
    oldExpandSidebarConfig === "1",
  );

  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();

  const [loading, setLoading] = useState(true);
  const [daftarChat, setDaftarChat] = useState<Chat[]>([]);
  const [chatAktif, setChatAktif] = useState<Chat | null>(null);

  async function getDaftarChat() {
    try {
      const response = await konektorBackend.get("/api/chat");
      const dto: any[] = await response.json();
      setDaftarChat(dto.map((item) => dtoToChat(item)));
    } catch (e: any) {
      setMasterError(e);
      throw e;
    }
  }

  function toggleExpandSidebar() {
    _setExpandSidebar((oldValue) => {
      const newValue = !oldValue;
      localStorage.setItem(KEY_LS_EXPAND_SIDEBAR, newValue ? "1" : "0");
      return newValue;
    });
  }

  // Dipanggil oleh TampilanPesanChat saat chat baru berhasil dibuat
  function handleChatCreated(chat: Chat) {
    setChatAktif(chat);
    setDaftarChat((prev) => [chat, ...prev]);
  }

  useEffect(() => {
    getDaftarChat().finally(() => {
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <div className="min-h-default bg-gray-50">
      <div className="pb-6 pt-36">
        <PageHeader onToggleExpand={toggleExpandSidebar} />

        <div className="flex rounded-xl">
          <ChatSidebar
            daftarChat={daftarChat}
            expand={expandSidebar}
            chatAktifId={chatAktif?.id ?? null}
            onSelectChat={(chat) => setChatAktif(chat)}
            onNewChat={() => setChatAktif(null)}
          />
          <div
            className={`${expandSidebar ? "w-64" : "w-0"} shrink-0 transition-all ease-out`}
          />

          <TampilanPesanChat
            chat={chatAktif}
            expandSidebar={expandSidebar}
            onChatCreated={handleChatCreated}
          />
        </div>
      </div>
    </div>
  ) : (
    <HalamanLoading />
  );
}
